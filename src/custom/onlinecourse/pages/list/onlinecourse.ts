import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CoreUtilsProvider } from '@providers/utils/utils';
import { AddonCourseCompletionProvider } from '@addon/coursecompletion/providers/coursecompletion';
import { CoreCourseOptionsDelegate } from '@core/course/providers/options-delegate';
import * as moment from 'moment';
import { CoreDomUtilsProvider } from '@providers/utils/dom';
import { CoreCourseHelperProvider } from '@core/course/providers/helper';
import { CoreCoursesHelperProvider } from '@core/courses/providers/helper';
import { CoreCoursesProvider } from '@core/courses/providers/courses';


@IonicPage()
@Component({
  selector: 'page-onlinecourse',
  templateUrl: 'onlinecourse.html',
})
//This Page is copied from Course from Moodle
export class OnlineCoursePage {
  courses = {
    selected: 'inprogress',
    loaded: false,
    filter: '',
    past: [],
    inprogress: [],
    future: []
};
protected courseIds = '';
protected prefetchIconsInitialized = false;
showFilter = false;
    
    filteredCourses: any[];
    prefetchCoursesData = {
      inprogress: {},
      past: {},
      future: {}
  };
  downloadAllCoursesEnabled: boolean;
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private coursesProvider: CoreCoursesProvider,
    private utils: CoreUtilsProvider,
    private courseCompletionProvider: AddonCourseCompletionProvider,
    private courseOptionsDelegate: CoreCourseOptionsDelegate,
    private domUtils: CoreDomUtilsProvider,
    private courseHelper: CoreCourseHelperProvider,
    private coursesHelper: CoreCoursesHelperProvider) {
  }
  ionViewDidLoad() {
    if (!this.courses.loaded) {
      this.fetchMyOverviewCourses().finally(() => {
          this.courses.loaded = true;
      });
  }
  }
/**
     * Refresh the data.
     *
     * @param {any} refresher Refresher.
     * @return {Promise<any>} Promise resolved when done.
     */
    refreshMyOverview(refresher: any): Promise<any> {
      const promises = [];
      promises.push(this.coursesProvider.invalidateUserCourses().finally(() => {
          // Invalidate course completion data.
          return this.coursesProvider.getUserCourses().then((courses) => {
              return this.utils.allPromises(courses.map((course) => {
                  return this.courseCompletionProvider.invalidateCourseCompletion(course.id);
               }));
          });
      }));

      promises.push(this.courseOptionsDelegate.clearAndInvalidateCoursesOptions());
      if (this.courseIds) {
          promises.push(this.coursesProvider.invalidateCoursesByField('ids', this.courseIds));
      }

      return this.utils.allPromises(promises).finally(() => {
        this.prefetchIconsInitialized = false;
        return this.fetchMyOverviewCourses();
      }).finally(() => {
          refresher.complete();
      });
  }
  /**
     * Fetch the courses for my overview.
     *
     * @return {Promise<any>} Promise resolved when done.
     */
    protected fetchMyOverviewCourses(): Promise<any> {
      return this.fetchUserCourses().then((courses) => {
          // Fetch course completion status.
          return Promise.all(courses.map((course) => {
              if (typeof course.enablecompletion != 'undefined' && course.enablecompletion == 0) {
                  // Completion is disabled for this course, there is no need to fetch the completion status.
                  return Promise.resolve(course);
              }

              return this.courseCompletionProvider.getCompletion(course.id).catch(() => {
                  // Ignore error, maybe course compleiton is disabled or user ha no permission.
              }).then((completion) => {
                  course.completed = completion && completion.completed;

                  return course;
              });
          }));
      }).then((courses) => {
          const today = moment().unix();

          this.courses.past = [];
          this.courses.inprogress = [];
          this.courses.future = [];

          courses.forEach((course) => {
              if ((course.enddate && course.enddate < today) || course.completed) {
                  // Courses that have already ended.
                  this.courses.past.push(course);
              } else if (course.startdate > today) {
                  // Courses that have not started yet.
                  this.courses.future.push(course);
              } else {
                  // Courses still in progress.
                  this.courses.inprogress.push(course);
              }
          });

          this.courses.filter = '';
          this.showFilter = false;
          this.filteredCourses = this.courses[this.courses.selected];

          this.initPrefetchCoursesIcons();
      }).catch((error) => {
          this.domUtils.showErrorModalDefault(error, 'Error getting my overview data.');
      });
  }
  /**
     * Fetch user courses.
     *
     * @return {Promise<any[]>} Promise resolved when done.
     */
    protected fetchUserCourses(): Promise<any[]> {
      return this.coursesProvider.getUserCourses().then((courses) => {
          const promises = [],
              courseIds = courses.map((course) => {
              return course.id;
          });

          if (this.coursesProvider.canGetAdminAndNavOptions()) {
              // Load course options of the course.
              promises.push(this.coursesProvider.getCoursesAdminAndNavOptions(courseIds).then((options) => {
                  courses.forEach((course) => {
                      course.navOptions = options.navOptions[course.id];
                      course.admOptions = options.admOptions[course.id];
                  });
              }));
          }

          this.courseIds = courseIds.join(',');

          promises.push(this.coursesHelper.loadCoursesExtraInfo(courses));

          return Promise.all(promises).then(() => {
              return courses.sort((a, b) => {
                  const compareA = a.fullname.toLowerCase(),
                      compareB = b.fullname.toLowerCase();

                  return compareA.localeCompare(compareB);
              });
          });
      });
  }
  /**
     * Initialize the prefetch icon for selected courses.
     */
    protected initPrefetchCoursesIcons(): void {
      if (this.prefetchIconsInitialized || !this.downloadAllCoursesEnabled) {
          // Already initialized.
          return;
      }

      this.prefetchIconsInitialized = true;

      Object.keys(this.prefetchCoursesData).forEach((filter) => {
          if (!this.courses[filter] || this.courses[filter].length < 2) {
              // Not enough courses.
              this.prefetchCoursesData[filter].icon = '';

              return;
          }

          this.courseHelper.determineCoursesStatus(this.courses[filter]).then((status) => {
              let icon = this.courseHelper.getCourseStatusIconAndTitleFromStatus(status).icon;
              if (icon == 'spinner') {
                  // It seems all courses are being downloaded, show a download button instead.
                  icon = 'cloud-download';
              }
              this.prefetchCoursesData[filter].icon = icon;
          });

      });
  }

}
