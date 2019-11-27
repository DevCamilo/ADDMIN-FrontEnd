import { Component, OnInit } from '@angular/core';
import { EventInput } from '@fullcalendar/core';
import { ReservationService } from '../../../providers/reservation.service';
import { UserService } from '../../../providers/user.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-generate-reservation',
  templateUrl: './generate-reservation.component.html',
  styleUrls: ['./generate-reservation.component.css']
})
export class GenerateReservationComponent implements OnInit {
  token = localStorage.getItem('token');
  currentUser: any = JSON.parse(localStorage.getItem('user'));
  calendarPlugins: any = [dayGridPlugin];
  calendarEvents: EventInput[];
  listUsers = [];
  listTypeReservation = [];
  reservation: any;
  error: boolean = false;
  message: string = '';

  constructor(private reservationAPI: ReservationService, private userAPI: UserService) {
    this.reservation = {
      type_reservation: '',
      user: '',
      date_start: '',
      date_end: ''
    }
  }

  ngOnInit() {
    this.userAPI.listUsersFunction(this.token).subscribe((res: any) => {
      if (res.status) {
        $(document).ready(function () {
          $('select').formSelect();
        });
        this.listUsers = res.data;
      } else {
        Swal.fire(res.message, '', 'error');
      }
    });
    this.reservationAPI.listTypeReservation(this.token).subscribe((res: any) => {
      if (res.status) {
        $(document).ready(function () {
          $('select').formSelect();
          $('.datepicker').datepicker();
          $('.datepicker1').datepicker();
          $('.datepicker2').datepicker();
        });
        this.listTypeReservation = res.data;
      } else {
        Swal.fire(res.message, '', 'error');
      }
    });
    this.reservationAPI.listReservations(this.token).subscribe((res: any) => {
      let arrayReservations = [];
      if (res.status) {
        for (let i = 0; i < res.data.length; i++) {
          const obj = {
            title: res.data[i].type_reservation.name,
            start: res.data[i].date_start,
            end: res.data[i].date_end,
            color: res.data[i].type_reservation.color,
          };
          arrayReservations.push(obj);
        }
        this.calendarEvents = arrayReservations;
      } else {
        Swal.fire(res.message, '', 'error');
      }
    });
  }

  onSubmit() {
    this.error = false
    let date1 = $('.datepicker1').val();
    let date2 = $('.datepicker2').val();
    if (date1 != '' && date2 != '' && this.reservation.type_reservation != '' && this.reservation.user != '') {
      let dateObj1 = new Date(date1);
      let dateObj2 = new Date(date2);
      this.reservation.date_start = dateObj1.toISOString();
      this.reservation.date_end = dateObj2.toISOString().slice(0, -14);
      this.reservation.date_end += 'T23:59:59.000-05:00';
      if (dateObj1 >= new Date() && dateObj1 >= new Date()) {
        if (dateObj1 <= dateObj2 && dateObj1 <= dateObj2) {
          console.log('Fecha Valida');
          this.reservationAPI.createReservation(this.reservation, this.token).subscribe((res: any) => {
            if (res.status) {
              Swal.fire(res.message, '', 'success');
              $('.datepicker1').val('');
              $('.datepicker2').val('');
              this.reservation.user = '';
              this.reservation.type_reservation = '';
              this.ngOnInit();
            } else {
              Swal.fire(res.message, '', 'error');
            }
          });
        } else {
          this.error = true;
          this.message = 'La fecha final no puede ser menor a la fecha de inicio';
        }
      } else {
        this.error = true;
        this.message = 'La fecha de inicio no puede ser menor a la fecha actual';
      }
    } else {
      this.error = true;
      this.message = 'Faltan datos por enviar';
    }
  }

}
