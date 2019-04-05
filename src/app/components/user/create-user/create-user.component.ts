import { Component, OnInit } from '@angular/core';
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

}
