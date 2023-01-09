// Time-based-one-time-password handler
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-totp',
  templateUrl: './totp.component.html',
  styleUrls: ['./totp.component.css']
})
export class TotpComponent implements OnInit {

  //TODO: verify scanned qr code

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  currentUser: any;
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.getUser().authenticated) {
      this.isLoggedIn = true;
      this.currentUser = this.authService.getUser();
    }
  }

  onSubmit(): void {
    this.authService.verify(this.form).subscribe({
      next: data => {
        //TODO
      },
      error: data => {
        this.isLoginFailed = true;
      }
    });
  }

}
