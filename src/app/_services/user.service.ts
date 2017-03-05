import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ROOT_URL } from './config';
import { User } from '../_models/user';

@Injectable()
export class UserService {
  constructor(private http: Http) { }

  getAll() {
    return this.http.get(ROOT_URL + '/api/secured/users', this.jwt()).map((response: Response) => response.json());
  }

  getById(id: number) {
    return this.http.get(ROOT_URL + '/api/secured/users/' + id, this.jwt()).map((response: Response) => response.json());
  }

  create(user: User) {
    return this.http.post(ROOT_URL + '/api/secured/users', user, this.jwt()).map((response: Response) => response.json());
  }

  update(user: User) {
    return this.http.put(ROOT_URL + '/api/secured/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
  }

  delete(id: number) {
    return this.http.delete(ROOT_URL + '/api/secured/users/' + id, this.jwt()).map((response: Response) => response.json());
  }

  private jwt() {
    let headers = new Headers();
    headers.append('authorization', localStorage.getItem('token')); 
    return new RequestOptions({ headers: headers });
  }
}