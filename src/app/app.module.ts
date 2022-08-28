import { AlertHttpInterceptor } from './_interceptor/alert-http.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroListComponent } from './components/heros/hero-list/hero-list.component';
import { AddHeroComponent } from './components/heros/add-hero/add-hero.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeroFormComponent } from './components/heros/hero-form/hero-form.component';

@NgModule({
  declarations: [AppComponent, HeroListComponent, AddHeroComponent, HeroFormComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AlertHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
