import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  createPayment(token: String, payment: Object){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(this.url + '/create-payment', payment, httpOptions);
  }

  listAllPaymentType(token: String){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get(this.url + '/list-all-type-payment', httpOptions);
  }
}
