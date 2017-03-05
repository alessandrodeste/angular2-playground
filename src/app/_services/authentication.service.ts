import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { ROOT_URL } from './config';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import 'rxjs/Rx';

@Injectable()
export class AuthenticationService {

  private _loggedUser: User;
  private _loggedUserObservable: Observable<any>;

  constructor(private http: Http) { }

  createAuthorizationHeader(headers: Headers) {
    headers.append('authorization', localStorage.getItem('token')); 
  }

  signin(email: string, password: string) {
    return this.http.post(ROOT_URL + '/auth/signin', JSON.stringify({ email: email, password: password }))
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let jresponse = response.json();
        if (jresponse && jresponse.token) {
          localStorage.setItem('token', jresponse.token);  
        }
      })
      .catch(this.handleError);
  }

  signup(email: string, password: string) {
    return this.http.post(ROOT_URL + '/auth/signup', JSON.stringify({ email: email, password: password }))
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let jresponse = response.json();
        if (jresponse && jresponse.token) {
          localStorage.setItem('token', jresponse.token);  
        }
      })
      .catch(this.handleError);
  }

  getLoggedUserInfo() {
     if(this._loggedUser) {
      // if _loggedUser is available just return it as Observable
      return Observable.of(this._loggedUser);
    } else if(this._loggedUserObservable) {
      // if this._loggedUserObservable is set then the request is in progress
      return this._loggedUserObservable;
    } else {

      let headers = new Headers();
      this.createAuthorizationHeader(headers);
      this._loggedUserObservable = this.http.get(ROOT_URL + '/auth/loggedin', {headers: headers})
        .map((response: Response) => {
          // login successful if there's a jwt token in the response
          let jresponse = response.json();
          
          if (jresponse && jresponse.user) {
            console.log(jresponse.user);
            localStorage.setItem('currentUser', jresponse.user);
          }
        })
        .catch(this.handleError)
        .share(); // TODO: check if is really needed
      return this._loggedUserObservable;
    }
  }

  logout() {    
    localStorage.removeItem('token');
    this._loggedUser = null;
    this._loggedUserObservable = null;
  }

  private handleError (error: any) {
    console.log(error);
    return Observable.throw(error);
  }
}