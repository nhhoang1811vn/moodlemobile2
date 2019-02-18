import { Component, ViewChild, ViewChildren } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CoreUtilsProvider } from '@providers/utils/utils';
import { AddonCourseCompletionProvider } from '@addon/coursecompletion/providers/coursecompletion';
import { CoreCourseOptionsDelegate } from '@core/course/providers/options-delegate';
import * as moment from 'moment';
import { CoreDomUtilsProvider } from '@providers/utils/dom';
import { CoreCourseHelperProvider } from '@core/course/providers/helper';
import { CoreCoursesHelperProvider } from '@core/courses/providers/helper';
import { CoreCoursesProvider } from '@core/courses/providers/courses';
import { CustomApi } from '@providers/custom-api/custom-api';
import { AddonBlockMyOverviewComponent } from '@addon/block/myoverview/components/myoverview/myoverview';
import { CoreCoursesDashboardProvider } from '@core/courses/providers/dashboard';


@IonicPage()
@Component({
  selector: 'page-onlinecourse',
  templateUrl: 'onlinecourse.html',
})
//This Page is copied from Course from Moodle
export class OnlineCoursePage {
    @ViewChild(AddonBlockMyOverviewComponent) addonBlockMyOverviewComponent: AddonBlockMyOverviewComponent
    loaded = true
    constructor(private dashboardProvider: CoreCoursesDashboardProvider){

    }
    ionViewDidLoad() {}
    refreshDashboard(refresher: any): void {
        const promises = [];

        promises.push(this.dashboardProvider.invalidateDashboardBlocks());

        // Invalidate the blocks.
        this.addonBlockMyOverviewComponent.invalidateContent().catch(() => {
            // Ignore errors.
        });
        

        Promise.all(promises).finally(() => {
            
                refresher.complete();
        });
    }
    
}
