import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'FullStack.UI';
  signedIn: string;

  constructor(private cookie: CookieService, private api: AuthService) {}

  ngOnInit(): void {
    this.api.signedIn$.subscribe({
      next: (response) => {
        this.signedIn = response;
      },
    });
    this.signedIn = this.cookie.get('signedIn');
  }

  onLogout() {
    this.cookie.delete('signedIn');
    this.signedIn = 'false';
  }
}
