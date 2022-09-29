import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';

  constructor(private authService: AuthService){}

    //Lifecycle hook - Called after creating the component
    ngOnInit(): void {
      //Init auto logout handler, if page got reloaded.
      this.authService.handleAutoLogoutOnExpire();
    }

  isUserLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }

}
