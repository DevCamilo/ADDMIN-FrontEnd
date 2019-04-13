import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PqrsService {
  url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  listTypePqrs(token: String){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get(this.url + '/list-all-type-pqrs', httpOptions);
  }
}
