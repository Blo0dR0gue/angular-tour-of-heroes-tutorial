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
    using2FA: null
  };

  isSignUpSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  qrCodeImg = '';
  isUsing2FA = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  onSubmit(): void {
    const { username, email, password, using2FA } = this.form;

    this.authService.register(username, email, password, using2FA).subscribe({
      next: data => {
        if(data.using2FA){
          this.isUsing2FA = true;
          this.qrCodeImg = data.qrCodeImage;
        }
        this.isSignUpFailed = false;
        this.isSignUpSuccessful = true;
      },
      error: error => {
        this.isSignUpFailed = true;
        this.isSignUpSuccessful = false;
      }
    });
  }
}
