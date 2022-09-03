import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { user } from 'src/app/models/users.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private api: AuthService,
    private route: Router,
    private cookie: CookieService
  ) {}
  alertText: string;
  showAlert: boolean = false;
  success: boolean;
  userDetails: user;
  signedIn: string;

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    //! Get Cookie Value
    this.signedIn = this.cookie.get('signedIn');
  }

  onSubmit() {
    this.userDetails = this.form.value;
    this.api.userExist(this.userDetails).subscribe({
      next: (response) => {
        if (response) {
          this.success = true;
          this.showAlert = true;
          this.alertText = 'Login successful';
          //! Set Cookie
          this.cookie.set('signedIn', 'true');
          setTimeout(() => {
            this.showAlert = false;
            this.api.signedIn$.next('true');
            this.route.navigate(['/heros']);
          }, 3000);
        } else {
          this.success = false;
          this.showAlert = true;
          this.alertText = 'Your username or password is wrong';
          //! Set Cookie
          this.cookie.set('signedIn', 'false');
          this.api.signedIn$.next('false');
          setTimeout(() => {
            this.showAlert = false;
          }, 5500);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
