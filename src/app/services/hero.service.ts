import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { hero } from '../models/heros.model';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) {}

  getAllHeros(): Observable<hero[]> {
    return this.http.get<hero[]>(this.baseApiUrl + '/api/Heros');
  }
}
