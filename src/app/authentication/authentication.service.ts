import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
  public token: string;
  private loginUrl: string = 'http://localhost:3000/login';

  constructor(private http: Http) {
    // set token if saved in local storage
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(username: string, password: string): Observable<boolean> {
    let requestBody = JSON.stringify({
      username: username,
      password: password
    });
    let options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
    console.log(requestBody);
    return this.http.post(this.loginUrl, requestBody, options)
      .map((res: Response) => {
        // login successful if there's a jwt token in the response
        let token = res.json() && res.json().token;
        if (token) {
          // set token property
          this.token = token;
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
          return true;
        } else {
          return false;
        }
      });
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }

}