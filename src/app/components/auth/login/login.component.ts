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
  constructor(private api: AuthService, private route: Router) {}
  alertText: string;
  showAlert: boolean = false;
  success: boolean;
  userDetails: user;
  signedIn: boolean;

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.api.signedIn$.subscribe({
      next: (response) => {
        this.signedIn = response;
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSubmit() {
    this.userDetails = this.form.value;
    this.api.userExist(this.userDetails).subscribe({
      next: (response) => {
        if (response) {
          this.success = true;
          this.showAlert = true;
          this.alertText = 'Login successful';
          setTimeout(() => {
            this.showAlert = false;
          }, 2700);
          setTimeout(() => {
            this.route.navigate(['/heros']);
          }, 3000);
        } else {
          this.success = false;
          this.showAlert = true;
          this.alertText = 'Your username or password is wrong';
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
