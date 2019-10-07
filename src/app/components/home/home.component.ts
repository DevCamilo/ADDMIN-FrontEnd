import { Component, OnInit, Input } from '@angular/core';
import * as data from '../../../assets/translate/languages.json';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content: any;
  @Input() info: any;
  constructor() {
    this.content = data.es.home;
  }

  ngOnInit() {
    $(document).ready(function () {
      $('.parallax').parallax();
      $('.sidenav').sidenav();
      $('.tooltipped').tooltip();
      $("#infoClick").click(function () {
        $('html,body').animate({
          scrollTop: $("#info").offset().top
        }, 2000);
      });
      $("#contactClick").click(function () {
        $('html,body').animate({
          scrollTop: $("#contact").offset().top
        }, 2000);
      });
      $("#infoClick2").click(function () {
        $('html,body').animate({
          scrollTop: $("#info").offset().top
        }, 2000);
      });
      $("#contactClick2").click(function () {
        $('html,body').animate({
          scrollTop: $("#contact").offset().top
        }, 2000);
      });
    });
  }

  translate(num: Number) {
    //console.log(num);
    num == 1 ? this.content = data.en.home : this.content = data.es.home;
  }

}
