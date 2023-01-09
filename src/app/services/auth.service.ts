import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Buffer } from 'buffer';
import { delay, map, Observable, of, Subscription } from 'rxjs';
import { JwtResponse } from '../models/jwtResponse';
import { SignUpResponse } from '../models/SignUpResponse';
import { TokenStorageService } from './token-storage.service';

const AUTH_API = 'http://localhost:8080/api/v1/auth/';
const REGISTER_API = 'http://localhost:8080/api/v1/register';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenSubscription = new Subscription();

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  public login(username: string, password: string): Observable<JwtResponse> {
    return this.http
      .post<JwtResponse>(
        AUTH_API + 'login',
        {
          username,
          password,
        },
        httpOptions
      )
      .pipe(
        map((data) => {
          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveUser(data);
          this.handleAutoLogoutOnExpire();
          if (data.authenticated) {
            this.router.navigate(['dashboard']);
          } else {
            this.router.navigate(['totp']);
          }
          return data;
        })
      );
  }

  public handleAutoLogoutOnExpire() {
    const token = this.tokenStorage.getToken();
    if (token == null) return;
    const jwtToken = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString('ascii')
    );
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now();
    this.tokenSubscription.unsubscribe();
    this.tokenSubscription = of(null)
      .pipe(delay(timeout))
      .subscribe((_) => {
        console.log('EXPIRED!');
        this.logout();
      });
  }

  public getUser() {
    return this.tokenStorage.getUser();
  }

  public isUserLoggedIn(): boolean {
    return this.getUser() != undefined && this.getUser().authenticated;
  }

  public register(
    username: string,
    email: string,
    password: string,
    using2FA: boolean
  ): Observable<SignUpResponse> {
    return this.http
      .post<SignUpResponse>(
        REGISTER_API,
        {
          username,
          email,
          password,
          using2FA,
        },
        httpOptions
      )
      .pipe(
        map((data) => {
          //TODO ?
          return data;
        })
      );
  }

  public logout() {
    this.tokenStorage.signOut();
    this.router.navigate(['login']);
  }

  public verify(credentials: any): Observable<JwtResponse> {
    return this.http
      .post<JwtResponse>(AUTH_API + 'verify', credentials.code, {
        headers: new HttpHeaders({ 'Content-Type': 'text/plain' }),
      })
      .pipe(
        map((data) => {
          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveUser(data);
          this.handleAutoLogoutOnExpire();
          this.router.navigate(['dashboard']);
          return data;
        })
      );
  }
}
