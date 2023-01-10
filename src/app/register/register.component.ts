import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
    using2FA: null,
    code: null,
  };

  isSignUpSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  qrCodeImg: string | null = null;
  isUsing2FA = false;
  secret: string | null = null;
  use2FASignUp = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  onSubmit(): void {
    const { username, email, password, using2FA } = this.form;

    this.authService.register(username, email, password, using2FA).subscribe({
      next: (data) => {
        this.isSignUpFailed = true;
        if (data.using2FA) {
          this.secret = data.secret;
          this.isUsing2FA = true;
          this.qrCodeImg = data.qrCodeImage;
          this.use2FASignUp = true;
        } else {
          if (data.signupDone) {
            this.isSignUpSuccessful = true;
          }else {
            this.isSignUpFailed = true;
          }
        }
      },
      error: (error) => {
        this.isSignUpFailed = true;
        this.isSignUpSuccessful = false;
        console.log(error.error.message);//TODO: Display errors to user
      },
    });
  }

  onSubmit2FA(): void {
    const { username, email, password, using2FA, code } = this.form;

    this.authService
      .register(username, email, password, using2FA, code, this.secret)
      .subscribe({
        next: (data) => {
          if (data.signupDone) {
            this.isSignUpSuccessful = true;
            this.isSignUpFailed = true;
          }
        },
        error: (error) => {
          this.isSignUpFailed = true;
          this.isSignUpSuccessful = false;
        },
      });
  }
}
