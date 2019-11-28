import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ReservationService } from '../../../providers/reservation.service';
import { UserService } from '../../../providers/user.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-consult-reservation',
  templateUrl: './consult-reservation.component.html',
  styleUrls: ['./consult-reservation.component.css']
})
export class ConsultReservationComponent implements OnInit {
  token: String = localStorage.getItem('token');
  reservation: any;
  extraInfo: any;
  listUsers: any;
  listTypeReservation: any;
  loading: boolean = true;

  constructor(private activatedRoute: ActivatedRoute, private reservationAPI: ReservationService, private userAPI: UserService) {
    this.reservation = {
      type_reservation: '',
      user: '',
      date_start: '',
      date_end: ''
    }
    this.extraInfo = {
      name: '',
      lastName: '',
      type_reservation: ''
    }
  }

  ngOnInit() {
    this.userAPI.listUsersFunction(this.token).subscribe((res: any) => {
      if (res.status) {
        this.listUsers = res.data;
      } else {
        Swal.fire(res.message, '', 'error');
      }
    });
    this.reservationAPI.listTypeReservation(this.token).subscribe((res: any) => {
      this.loading = false;
      if (res.status) {
        $(document).ready(function () {
          $('select').formSelect();
          $('.datepicker1').datepicker();
          $('.datepicker2').datepicker();
        });
        this.listTypeReservation = res.data;
      } else {
        Swal.fire(res.message, '', 'error');
      }
    });
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.reservationAPI.listReservationById(params.id, this.token).subscribe((res: any) => {
        if (res.status) {
          this.reservation.user = res.data.user._id;
          this.reservation.type_reservation = res.data.type_reservation._id;
          this.reservation.date_start = res.data.date_start;
          this.reservation.date_end = res.data.date_end;
          this.extraInfo.name = res.data.user.name;
          this.extraInfo.lastName = res.data.user.lastName,
          this.extraInfo.type_reservation = res.data.type_reservation.name;
          $('.datepicker1').val(res.data.date_start);
          $('.datepicker2').val(res.data.date_end);
        } else {
          console.log(res.message);
        }
      });
    });
  }

  onSubmit() {

  }

}
