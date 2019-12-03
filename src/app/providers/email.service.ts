import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  url: String = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  sendWelcomeEmail(data: Object, token: String) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(this.url + '/welcome-email', data, httpOptions);
  }

}
