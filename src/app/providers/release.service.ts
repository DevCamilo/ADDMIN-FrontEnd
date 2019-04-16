import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReleaseService {
  url: String = 'http://localhost:3000'
  constructor(private http: HttpClient) { }

  listAllReleases(token: String) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get(this.url + '/list-all-releases', httpOptions);
  }
}
