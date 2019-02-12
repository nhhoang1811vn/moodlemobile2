import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { CoreConfigConstants } from '../../configconstants';

@Injectable()
export class CustomApi {
  private baseUrl = "https://pnj-mysql.toplearning.vn"
  private FIELD_SESSION = "session";
  private FIELD_SESSION_KEY = "session_key";
  private FIELD_COURSE_IDS = "courseid";

  constructor(public http: Http) {
    
  }
  getCourse() :  Promise<any[]>{
    return new Promise(resolve => {
      this.http.get(`${this.baseUrl}/api/mobie/onlinecourse.php`)
      .subscribe(res => resolve(res.json()));
    });
  }
  getImagesByCourseIds(courseIds : any[]) : Promise<any[]>{
    var url = this.baseUrl + "/api/mobie/json.php?act=getCourseImage"
    let body = new FormData();
    body.append(this.FIELD_SESSION, CoreConfigConstants.apisession);
    body.append(this.FIELD_SESSION_KEY, CoreConfigConstants.apisessionkey);
    body.append(this.FIELD_COURSE_IDS, JSON.stringify(courseIds));

    return new Promise(resolve => {
      this.http.post(url, body).subscribe(res => resolve(res.json()))
    })
  }

}
