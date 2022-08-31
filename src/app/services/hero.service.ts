import { hero } from './../models/heros.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) {}

  getAllHeros(): Observable<hero[]> {
    return this.http.get<hero[]>(this.baseApiUrl + '/api/Heros');
  }

  AddNewHero(newHero: hero) {
    return this.http.post(this.baseApiUrl + '/api/Heros', newHero);
  }

  updateHero(newHeroDetails: hero): Observable<hero> {
    return this.http.put<hero>(this.baseApiUrl + '/api/Heros', newHeroDetails);
  }

  deleteHero(id: string) {
    return this.http.delete(this.baseApiUrl + '/api/Heros/' + id);
  }

  searchForHero(heroName: string): Observable<hero[]> {
    return this.http.get<hero[]>(this.baseApiUrl + '/api/Heros/' + heroName);
  }
}
