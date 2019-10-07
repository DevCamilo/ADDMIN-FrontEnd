import { Component, OnInit } from '@angular/core';
import * as data from '../../../assets/translate/languages.json';
declare var $: any;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('user'));
  language: any = localStorage.getItem('language');
  typeUser: any;
  content: any;
  constructor() { }

  ngOnInit() {
    this.language == 'es' ? this.content = data.es.sideNav : this.content = data.en.sideNav;
    $(document).ready(function () {
      $('.sidenav').sidenav();
      $('.collapsible').collapsible();
      $('.tooltipped').tooltip();
    });
    this.typeUser = this.user.typeUser;
  }

  clearLocal() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  translate(num) {
    if (num == 1) {
      this.content = data.en.sideNav;
      localStorage.setItem('language', 'en');
    } else {
      this.content = data.es.sideNav;
      localStorage.setItem('language', 'es');

    }
  }

}
