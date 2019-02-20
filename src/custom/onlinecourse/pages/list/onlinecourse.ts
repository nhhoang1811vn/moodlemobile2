import { Component, ViewChild, ViewChildren, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CoreCourseHelperProvider } from '@core/course/providers/helper';
import { CoreCoursesHelperProvider } from '@core/courses/providers/helper';
import { CoreTimeUtilsProvider } from '@providers/utils/time';


@IonicPage()
@Component({
  selector: 'page-onlinecourse',
  templateUrl: 'onlinecourse.html',
})
//This Page is copied from Course from Moodle
export class OnlineCoursePage implements OnInit{
    ngOnInit(): void {
        this.loadCourses(null);
    }
    loaded = false;
    public courses : any[] = [];

    constructor(private courseHelper: CoreCourseHelperProvider,
        private coursesHelper: CoreCoursesHelperProvider,
        private timeUtils: CoreTimeUtilsProvider
        ){

    }
    ionViewDidLoad() {}
    loadCourses(refresher: any): void {
        if (refresher!=null){
            refresher.complete();
        }
        this.loaded = false;
        const promises = [];
        promises.push(this.fetchContent());
        Promise.all(promises).finally(() => {            
            this.loaded = true;
        });
    }
    
    protected fetchContent(): Promise<any> {
        return this.coursesHelper.getUserCoursesWithOptions("fullname").then((courses) => {
            console.log("All course: " + courses.length);
            this.courses = this.getInprogressCourses(courses);
            console.log("Inprogress course: " + this.courses.length);
        });
    }
    protected getInprogressCourses(courses: any[]) : any[]{
        let inprogressCourses = [];
        const today = this.timeUtils.timestamp();
        courses.forEach((course) => {
            if (course.hidden) {
                //this.courses.hidden.push(course);
            } else  {
                //this.courses.all.push(course);

                if ((course.enddate && course.enddate < today) || course.completed) {
                    // Courses that have already ended.
                    //this.courses.past.push(course);
                } else if (course.startdate > today) {
                    // Courses that have not started yet.
                    //this.courses.future.push(course);
                } else {
                    // Courses still in progress.
                    inprogressCourses.push(course);
                }
            }
        });
        return inprogressCourses;
    }
    
}
