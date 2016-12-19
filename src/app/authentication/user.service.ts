import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from './authentication.service';
import { User } from './user';

@Injectable()
export class UserService {
  constructor(private http: Http, private authenticationService: AuthenticationService) { }

  getUsers(): Observable<User[]> {
    // add authorization header with jwt token
    let headers = new Headers({ 'Authorization': this.authenticationService.token });
  }
}