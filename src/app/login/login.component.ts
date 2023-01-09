import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  credentials = { username: '', password: '' };
  isLoginFailed = false;
  errorMessage = 'Invalid credentials';
  roles: string[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigate(['dashboard']);
    }
  }

  login() {
    const { username, password } = this.credentials;

    this.authService.login(username, password).subscribe({
      next: (data) => {
        //TODO ?
      },
      error: (data) => {
        this.isLoginFailed = true;
      },
    });
  }
}
