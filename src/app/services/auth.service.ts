import { BehaviorSubject, Observable, tap } from 'rxjs';
import { user } from 'src/app/models/users.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = environment.baseApiUrl;
  public signedIn$ = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {}

  userExist(userDetails: user): Observable<boolean> {
    return this.http
      .post<boolean>(this.baseUrl + '/api/auth', userDetails)
      .pipe(
        tap((response: boolean) => {
          this.signedIn$.next(response);
        })
      );
  }
}
