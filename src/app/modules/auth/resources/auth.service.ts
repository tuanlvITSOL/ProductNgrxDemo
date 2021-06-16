import { Injectable } from '@angular/core';
import * as fromAuthModels from './auth';
import { of, Observable, BehaviorSubject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /********************************************************************************** */
  // This is a mock service, Don't use examples on this page in production code. Some APIs
  //  might be totally fake, and Some business logic usually handled on the server
  //   will be done on this page. This page is designed to give a back fake data.
  /********************************************************************************** */
  baseUrl = 'http://localhost:3000/users/';
  constructor(private http: HttpClient) {}
  login(username: string, password: string): Observable<any> { 
    return this.http.get(this.baseUrl + '?username=' + username).pipe(
      switchMap((users) => {
        const user = users[0];
        if (user) {
          return of(user);
        } else {
          return throwError('Unable to login');
        }
      })
    );
  }
}
