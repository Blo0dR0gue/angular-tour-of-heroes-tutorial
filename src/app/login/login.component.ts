import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {username: '', password: ''};
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
  }

    login() {
      const { username, password } = this.credentials;

      this.authService.login(username, password).subscribe({
        next: data => {
          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveUser(data);
  
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;
        },
        error: data => {
          console.log(data);
          this.isLoginFailed = true;
        }
      });
  }

}
