import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
    $(document).ready(function () {
      $('.sidenav').sidenav();
      $('.tooltipped').tooltip();
    });
  }

}
