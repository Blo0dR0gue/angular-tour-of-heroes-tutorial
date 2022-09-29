import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtResponse } from '../models/jwtResponse';

const AUTH_API = 'http://localhost:8080/api/v1/auth/';
const REGISTER_API = 'http://localhost:8080/api/v1/register';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(
      AUTH_API + 'login',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      REGISTER_API,
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }
}
