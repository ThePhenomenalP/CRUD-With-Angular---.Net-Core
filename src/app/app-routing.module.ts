import { AddHeroComponent } from './components/heros/add-hero/add-hero.component';
import { HeroListComponent } from './components/heros/hero-list/hero-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HeroListComponent },
  { path: 'heros', component: HeroListComponent },
  { path: 'addHero', component: AddHeroComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
