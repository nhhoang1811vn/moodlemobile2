import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

@Injectable()
export class CustomApi {
  private baseUrl = "https://pnj-mysql.toplearning.vn"
  constructor(public http: Http) {
    
  }
  getCourse() :  Promise<any[]>{
    // var headers = new Headers();
    // headers.append('Access-Control-Allow-Origin' , '*');
    // headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    // headers.append('Accept','application/json');
    // headers.append('content-type','application/json');
    //  let options = new RequestOptions({ headers:headers,withCredentials: true});
    return new Promise(resolve => {
      this.http.get(`${this.baseUrl}/api/mobie/onlinecourse.php`)//, options)
      .subscribe(res => resolve(res.json()));
    });
  }

}
