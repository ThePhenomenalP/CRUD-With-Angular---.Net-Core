import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroListComponent } from './components/heros/hero-list/hero-list.component';
import { AddHeroComponent } from './components/heros/add-hero/add-hero.component';

@NgModule({
  declarations: [AppComponent, HeroListComponent, AddHeroComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
