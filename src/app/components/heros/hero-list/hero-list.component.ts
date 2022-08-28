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
  showModal: boolean = false;
  Hero: hero;

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

  onClick(Id, n, c, t, i, is, d) {
    this.showModal = true;
    this.Hero = {
      id: Id,
      name: n,
      category: c,
      type: t,
      initialMovementSpeed: i,
      isPopular: is,
      description: d,
    };
  }
}
