import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OnlineCourseDetailPage } from './onlinecoursedetail';
import { CoreComponentsModule } from '@components/components.module';

@NgModule({
  declarations: [
    OnlineCourseDetailPage  
    ],
  imports: [
    CoreComponentsModule,
    IonicPageModule.forChild(OnlineCourseDetailPage)
  ],
})
export class OnlineCourseDetailPageModule {}
