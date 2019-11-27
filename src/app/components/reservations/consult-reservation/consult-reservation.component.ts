import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-consult-reservation',
  templateUrl: './consult-reservation.component.html',
  styleUrls: ['./consult-reservation.component.css']
})
export class ConsultReservationComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      console.log(params);
    });
  }

}
