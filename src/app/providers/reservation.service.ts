import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  url: String = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  createReservation(reserv: Object, token: String) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(this.url + '/create-reservation', reserv, httpOptions);
  }

  listReservations(token: String){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get(this.url + '/list-reservations', httpOptions);
  }
}
