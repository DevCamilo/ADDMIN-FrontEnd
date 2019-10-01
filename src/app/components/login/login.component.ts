import { Component, OnInit } from '@angular/core';
import { UserService } from '../../providers/user.service';
import { Router } from '@angular/router';
declare var M: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any;

  constructor(private login: UserService, private router: Router) {
    this.user = {
      email: '',
      password: ''
    };
  }

  onSubmit() {
    this.login.loginFunction(this.user).subscribe((res: any) => {
      //console.log(res)
      if (res.status == false) {
        var toastHTML = '<span>' + res.message + '</span>';
        M.toast({ html: toastHTML });
      } else {
        localStorage.setItem('token', res.token);
        localStorage.setItem('language', 'es');
        localStorage.setItem('user', JSON.stringify(res.data[0]));
        if (res.data[0].typeUser == 1) {
          return this.router.navigate(['/dashboard']);
        } else {
          return this.router.navigate(['/dashboard/list-release'])
        }
      }
    });

  }

  ngOnInit() {
  }

}
