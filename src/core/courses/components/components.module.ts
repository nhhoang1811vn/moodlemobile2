// (C) Copyright 2015 Martin Dougiamas
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { CoreComponentsModule } from '@components/components.module';
import { CoreDirectivesModule } from '@directives/directives.module';
import { CorePipesModule } from '@pipes/pipes.module';
import { CoreCoursesCourseProgressComponent } from '../components/course-progress/course-progress';
import { CoreCoursesCourseListItemComponent } from '../components/course-list-item/course-list-item';
import { CoreCoursesCourseOptionsMenuComponent } from '../components/course-options-menu/course-options-menu';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
    declarations: [
        CoreCoursesCourseProgressComponent,
        CoreCoursesCourseListItemComponent,
        CoreCoursesCourseOptionsMenuComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        TranslateModule.forChild(),
        CoreComponentsModule,
        CoreDirectivesModule,
        CorePipesModule,
        IonicImageLoader
    ],
    providers: [
    ],
    exports: [
        CoreCoursesCourseProgressComponent,
        CoreCoursesCourseListItemComponent,
        CoreCoursesCourseOptionsMenuComponent
    ],
    entryComponents: [
        CoreCoursesCourseOptionsMenuComponent
    ]
})
export class CoreCoursesComponentsModule {}
