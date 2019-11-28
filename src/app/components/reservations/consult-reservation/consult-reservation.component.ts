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
  error: boolean = false;
  message: string = '';
  loading: boolean = true;
  id: string;

  constructor(private activatedRoute: ActivatedRoute,
    private reservationAPI: ReservationService,
    private userAPI: UserService,
    private router: Router) {
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
      this.id = params.id;
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

  edit() {
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
          // this.reservationAPI.createReservation(this.reservation, this.token).subscribe((res: any) => {
          //   if (res.status) {
          //     Swal.fire(res.message, '', 'success');
          //     $('.datepicker1').val('');
          //     $('.datepicker2').val('');
          //     this.reservation.user = '';
          //     this.reservation.type_reservation = '';
          //     this.ngOnInit();
          //   } else {
          //     Swal.fire(res.message, '', 'error');
          //   }
          // });
        } else {
          this.error = true;
          this.message = 'La fecha final no puede ser menor a la fecha de inicio';
        }
      } else {
        this.error = true;
        this.message = 'La fecha de inicio no puede ser menor o igual a la fecha actual';
      }
    } else {
      this.error = true;
      this.message = 'Faltan datos por enviar';
    }
  }

  delete() {
    Swal.fire({
      title: '¿Desea eliminar la reserva?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.reservationAPI.deleteReservation(this.id, this.token).subscribe((res: any) => {
          if (res.status) {
            this.router.navigate(['dashboard/list-reservation']);
            Swal.fire(res.message, '', 'success');
          } else {
            Swal.fire(res.message, '', 'error');
          }
        });
      }
    });
  }

}
