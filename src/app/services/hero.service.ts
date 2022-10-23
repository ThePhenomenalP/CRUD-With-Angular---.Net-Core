import { hero } from './../models/heros.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  baseUrl : string = "https://localhost:7279";
  constructor(private http: HttpClient) {}

  getAllHeros(): Observable<hero[]> {
    return this.http.get<hero[]>(this.baseUrl + '/api/Heros');
  }

  AddNewHero(newHero: FormData) {
    return this.http.post(this.baseUrl + '/api/Heros', newHero);
  }

  updateHero(id: string, newHeroDetails: FormData): Observable<hero> {
    return this.http.put<hero>(
      this.baseUrl + '/api/Heros/' + id,
      newHeroDetails
    );
  }

  deleteHero(id: string) {
    return this.http.delete(this.baseUrl + '/api/Heros/' + id);
  }

  searchForHero(heroName: string): Observable<hero[]> {
    return this.http.get<hero[]>(this.baseUrl + '/api/Heros/' + heroName);
  }

  uploadImage(Image: FormData) {
    return this.http.post(this.baseUrl + '/api/Heros/uploadImage', Image);
  }
}
