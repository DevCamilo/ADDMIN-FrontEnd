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
    });
  }

  translate(num: Number) {
    console.log(num);
    if (num == 1) {
      this.content = data.en.home;
    } else {
      this.content = data.es.home;
    }

  }

}
