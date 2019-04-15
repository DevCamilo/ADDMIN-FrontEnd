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

  createPqrs(pqrs: Object, token: String){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(this.url + '/create-pqrs', pqrs, httpOptions);
  }

  groupPqrsByType(token: String){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get(this.url +  '/group-pqrs-by-type', httpOptions);
  }

  createTypePqrs(typePqrs: Object, token: String){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(this.url + '/create-type-pqrs', typePqrs, httpOptions);
  }

  updateTypePqrs(typePqrs: Object, token: String){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(this.url + '/update-type-pqrs', typePqrs, httpOptions);
  }

  updatePqrs(pqrs: Object, token: String){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(this.url + '/update-respone-pqrs', pqrs, httpOptions);
  }

}
