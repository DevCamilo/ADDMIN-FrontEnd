import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('user'));
  flag: number = 1;
  constructor() { }

  ngOnInit() {
    $(document).ready(function () {
      $('.sidenav').sidenav();
    });
    $(document).ready(function(){
      $('.collapsible').collapsible();
    });
  }

  clearLocal() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

}
