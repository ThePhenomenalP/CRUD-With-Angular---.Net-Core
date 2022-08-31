import { Router } from '@angular/router';
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
  CurrentPage: any;
  deletedHeroId: string;
  deletedHeroName: string;
  deletedRow: string;
  Hero: hero;
  heroList: hero[];
  heroName: string;
  showModal: boolean = false;
  showModal2: boolean = false;
  sortingASC: boolean = false;
  NHD: hero = {
    id: 'z',
    name: '',
    category: '',
    type: '',
    initialMovementSpeed: '',
    isPopular: false,
    description: '',
  };

  constructor(private api: HeroService, private route: Router) {}

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

  reloadData(newHeroDetail: hero) {
    this.NHD = newHeroDetail;
  }

  deleteHero(id: string, name: string) {
    this.showModal2 = true;
    this.deletedHeroName = name;
    this.deletedHeroId = id;
  }

  sortResults(name, asc) {
    console.log(asc);
    this.heroList = this.heroList.sort((a, b) => {
      if (asc) {
        this.sortingASC = false;
        return a[name] > b[name] ? 1 : a[name] < b[name] ? -1 : 0;
      } else {
        this.sortingASC = true;
        return b[name] > a[name] ? 1 : b[name] < a[name] ? -1 : 0;
      }
    });
  }
  search() {
    this.api.searchForHero(this.heroName).subscribe({
      next: (response) => {
        this.heroList = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
