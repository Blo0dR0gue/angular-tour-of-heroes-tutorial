import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private url = 'http://localhost:8080/api/v1/auth';

  credentials = {username: '', password: ''};

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

    login() {
      const headers = new HttpHeaders(this.credentials ? {
        authorization : 'Basic ' + btoa(this.credentials.username + ':' + this.credentials.password)
    } : {});
    this.http.get(this.url, {headers: headers}).subscribe(response => {
      console.log(response);
    })
  }

}
