import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('user'));
  typeUser: any;
  constructor() { }

  ngOnInit() {
    $(document).ready(function () {
      $('.sidenav').sidenav();
    });
    $(document).ready(function(){
      $('.collapsible').collapsible();
    });
    this.typeUser = this.user.typeUser;
  }

  clearLocal() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

}
