import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  url: String = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  countModel(){
    return this.http.get(this.url + '/show-counts');
  }
}
