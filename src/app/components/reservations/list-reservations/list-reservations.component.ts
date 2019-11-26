import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventInput } from '@fullcalendar/core';
import { ReservationService } from '../../../providers/reservation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColorPickerService } from 'ngx-color-picker';

@Component({
  selector: 'app-list-reservations',
  templateUrl: './list-reservations.component.html',
  styleUrls: ['./list-reservations.component.css']
})
export class ListReservationsComponent implements OnInit {
  token = localStorage.getItem('token');
  calendarPlugins: any = [dayGridPlugin];
  calendarEvents: EventInput[];
  typeReservationForm: FormGroup;
  color1: string = '#03a9f4';

  constructor(private reservationAPI: ReservationService, private formBuilder: FormBuilder, private cpService: ColorPickerService) { }

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
            allDay: true
          };
          arrayReservations.push(obj);
        }
        this.calendarEvents = arrayReservations;
      } else {
        console.log('Fail');
      }
    });
  }

  onSubmit() {
    console.log(this.color1);

  }

  onEventLog(event: string, data: any): void { }

  

}
