import { LoginPage } from './../../pages/login/login';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import {RequestOptions } from '@angular/http';
import { Http, Headers } from '@angular/http';
//import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthServiceProvider {
  
  public tname : any;
  constructor(public http: HttpClient ) {  }
  //apiUrl = 'https://bos-sd.com/';
  //apiUrl = 'https://212.237.28.169/';
   apiUrl = 'https://dreamsapp.net/';

//====================================Register=====================================//
postData(credentials) {
      return new Promise((resolve, reject) => {
        let headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin' , '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        this.http.post(this.apiUrl+'api/register',credentials, {headers: headers})
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
}


//====================================Login=====================================//
Login(credentials){
  return new Promise((resolve, reject) => {
    let headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    this.http.post(this.apiUrl+'api/login',credentials, {headers: headers})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

//====================================Dreams=====================================//
Dreams(token){
  return new Promise((resolve, reject) => {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token});
    this.http.get(this.apiUrl+'api/dreams', {headers: headers})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

DreamsCount(token){
  return new Promise((resolve, reject) => {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token});
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
     headers.append("Accept", 'application/json');
     headers.append('Content-Type', 'application/json' );
    this.http.get(this.apiUrl+'api/dreamscount', {headers: headers})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

Solved(token){
  return new Promise((resolve, reject) => {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token});
    this.http.get(this.apiUrl+'api/dreams/solved', {headers: headers})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

Pending(token){
  return new Promise((resolve, reject) => {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token});
    this.http.get(this.apiUrl+'api/dreams/pending ', {headers: headers})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

nonPayed(token){
  return new Promise((resolve, reject) => {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token});
    this.http.get(this.apiUrl+'api/dreams/nonpayed ', {headers: headers})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

AddDream(token,credentials){
  return new Promise((resolve, reject) => {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token});
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    this.http.post(this.apiUrl+'api/dreams',credentials, {headers: headers})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

Dream_info(token,credentials){
  return new Promise((resolve, reject) => {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token});
    this.http.get(this.apiUrl+'api/dreams/view?id='+ credentials, {headers: headers})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

//====================================Articles=====================================//
Articles(token){
  return new Promise((resolve, reject) => {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token});
    this.http.get(this.apiUrl+'api/blogs', {headers: headers})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

ArticlesCount(token){
  return new Promise((resolve, reject) => {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token});
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
     headers.append("Accept", 'application/json');
    //  headers.append('Content-Type', 'application/json' );
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );
    this.http.get(this.apiUrl+'api/blogscount', {headers: headers})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

//====================================Packages=====================================//
Packages(token){
  return new Promise((resolve, reject) => {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token});
    this.http.get(this.apiUrl+'api/packages', {headers: headers})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

Package_info(token,credentials){
  return new Promise((resolve, reject) => {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token});
    this.http.get(this.apiUrl+'api/packages/view?id='+ credentials, {headers: headers})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

//====================================UserDetails=====================================//
UserDetails(token){
  return new Promise((resolve, reject) => {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token});
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
     headers.append("Accept", 'application/json');
    //  headers.append('Content-Type', 'application/json' );
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );
    this.http.get(this.apiUrl+'api/user', {headers: headers})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

UserEdite(token,credentials){
  return new Promise((resolve, reject) => {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token});
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    this.http.patch(this.apiUrl+'api/user',credentials, {headers: headers})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

//====================================I-Dreams=====================================//
I_Solved(token){
  return new Promise((resolve, reject) => {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token});
    this.http.get(this.apiUrl+'api/interpret/solved', {headers: headers})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

I_Pending(token){
  return new Promise((resolve, reject) => {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token});
    this.http.get(this.apiUrl+'api/interpret/pending ', {headers: headers})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

I_All(token){
  return new Promise((resolve, reject) => {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token});
    this.http.get(this.apiUrl+'api/interpret/all ', {headers: headers})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

//====================================Reply=====================================//

Reply(token,credentials){
  return new Promise((resolve, reject) => {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token});
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    this.http.post(this.apiUrl+'api/interpret/reply',credentials, {headers: headers})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}


//====================================Return=====================================//
Return(token,credentials){
  return new Promise((resolve, reject) => {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token});
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PATCH');
     headers.append("Accept", 'application/json');
     headers.append('Content-Type', 'application/json' );
    this.http.patch(this.apiUrl+'api/interpret/return',credentials, {headers: headers})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

//====================================I_Stats=====================================//
stats(token){
  return new Promise((resolve, reject) => {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token});
    this.http.get(this.apiUrl+'api/interpret/stats', {headers: headers})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

//====================================Payment========================================//
tapPay(token,credentials){
  return new Promise((resolve, reject) => {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token});
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    this.http.post(this.apiUrl+'api/tapayment?id='+ credentials, {headers: headers})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

payPal(token,credentials){
  return new Promise((resolve, reject) => {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token});
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    this.http.post(this.apiUrl+'api/create-payment?id='+ credentials, {headers: headers})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

//====================================Contact=====================================//
Contact(token,credentials){
  return new Promise((resolve, reject) => {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token});
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    this.http.post(this.apiUrl+'api/contact',credentials, {headers: headers})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

//====================================Exit=====================================//
Exit(token){
  return new Promise((resolve, reject) => {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token});
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
     headers.append("Accept", 'application/json');
     headers.append('Content-Type', 'application/json' );
    this.http.get(this.apiUrl+'api/logout', {headers: headers})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

}
