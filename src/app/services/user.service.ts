import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private _http : HttpClient) { }

  // /login
  public loginUserFromRemote(user: User): Observable<User> {
    console.log("login", user);
    return this._http.post<User>("http://localhost:8090/auth/login", user)
  };

  // /register
  public registerUserFromRemote(user: User): Observable<User> {
    console.log("register", user);
    return this._http.post<User>("http://localhost:8090/auth/register", user)
  };
}
