import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OnlineCoursePage } from './onlinecourse';
import { CoreComponentsModule } from '@components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { CoreDirectivesModule } from '@directives/directives.module';

import { CoreSiteHomeComponentsModule } from '@core/sitehome/components/components.module';
import { CoreCoursesComponentsModule } from '@core/courses/components/components.module';
//import { CustomComponentsModule } from 'custom/onlinecourse/components/components.module';
import {CustomComponentsModule} from '../../components/components.module';
import { IonicImageLoader } from 'ionic-image-loader';


@NgModule({
  declarations: [
    OnlineCoursePage  
    ],
  imports: [
    CoreComponentsModule,
    CoreDirectivesModule,
    CoreCoursesComponentsModule,
    CoreSiteHomeComponentsModule,
    CustomComponentsModule,
    IonicPageModule.forChild(OnlineCoursePage),
    TranslateModule.forChild(),
    IonicImageLoader
    
  ],
})
export class OnlineCoursePageModule {}
