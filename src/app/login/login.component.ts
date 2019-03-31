import { Component, OnInit } from '@angular/core';
declare var M:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  test(){
    var toastHTML = '<span>I am toast content</span><button class="btn-flat toast-action">Undo</button>';
    M.toast({html: toastHTML});
  }


  ngOnInit() {
  }

}
