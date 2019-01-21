import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-onlinecourse-detail',
  templateUrl: 'onlinecoursedetail.html',
})


export class OnlineCourseDetailPage {
  course: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {    
    this.course = this.navParams.data;
  }
  ionViewDidLoad() {
  }
}
