import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('user'));
  flag: number = 0;
  constructor() { }

  ngOnInit() {
    $(document).ready(function () {
      $('.sidenav').sidenav();
    });
  }

  clearLocal() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  test() {
    if (this.flag == 0) {
      $(document).ready(function () {
        $('.select').on('click', function () {
          $('.drop').show();
        });
      });
      this.flag = 1;
    } else {
      $(document).ready(function () {
        $('.select').on('click', function () {
          $('.drop').show();
        });
      });
      this.flag = 0;
    }
  }

}
