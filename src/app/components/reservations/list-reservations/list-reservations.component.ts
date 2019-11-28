import { Component, OnInit } from '@angular/core';
import { EventInput } from '@fullcalendar/core';
import { ReservationService } from '../../../providers/reservation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import dayGridPlugin from '@fullcalendar/daygrid';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-reservations',
  templateUrl: './list-reservations.component.html',
  styleUrls: ['./list-reservations.component.css']
})
export class ListReservationsComponent implements OnInit {
  token = localStorage.getItem('token');
  calendarPlugins: any = [dayGridPlugin];
  calendarEvents: EventInput[] = [{
    title: 'Test', start: '2019-11-25T21:31:03.000-05:00', end: '2019-11-27T21:31:03.000-05:00'
  }];
  typeReservationForm: FormGroup;
  color1: string = '#03a9f4';

  constructor(private reservationAPI: ReservationService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.typeReservationForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
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
            url: 'http://localhost:4200/#/dashboard/consult-reservation?id='+res.data[i]._id
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
    this.typeReservationForm.value.color = this.color1;
    this.reservationAPI.createTypeReservation(this.typeReservationForm.value, this.token).subscribe((res: any) => {
      if (res.status) {
        Swal.fire(res.message, '', 'success');
        this.typeReservationForm.reset();
      } else {
        Swal.fire(res.message, '', 'error');
      }
    });

  }

  onEventLog(event: string, data: any): void { }



}
