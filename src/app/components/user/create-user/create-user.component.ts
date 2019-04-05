import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
declare var $:any;

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function () {
      $('select').formSelect();
    });
  }

  pushMe(){
    swal.fire(
      'Good job!',
      'You clicked the button!',
      'success'
    )
  }

}
