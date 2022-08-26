import { HeroService } from './../../../services/hero.service';
import { hero } from './../../../models/heros.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css'],
})
export class HeroListComponent implements OnInit {
  // Intelligence
  heroList: hero[];

  constructor(private api: HeroService) {}

  ngOnInit(): void {
    this.api.getAllHeros().subscribe({
      next: (data) => {
        this.heroList = data;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
}
