import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  loginFunction(user: object) {
    return this.http.post(this.url + '/login', JSON.stringify(user), httpOptions);
  }

  createUserFunction(user: object, token: String) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token
      })
    };
    return this.http.post(this.url + '/create-user', user, httpOptions);
  }

}
