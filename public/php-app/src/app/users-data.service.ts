import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { LoginToken } from './login/login.component';

import {Register} from './register/register.component';

@Injectable({
  providedIn: 'root',
})
export class UsersDataService {
  constructor(private http: HttpClient) {}

  private baseUrl: string = 'http://localhost:4343/api';

  public registerUser(user: Register): Observable<Register> {
    const url: string = this.baseUrl + '/users';
    return this.http.post<Register>(url, user);
  }

  public login(user: Register): Observable<LoginToken> {
    const url: string = this.baseUrl + '/users/login';

    return this.http.post<LoginToken>(url, user);
  }
}
