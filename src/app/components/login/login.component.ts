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
  loading: boolean = false;

  constructor(private login: UserService, private router: Router) {
    this.user = {
      email: '',
      password: ''
    };
  }

  onSubmit() {
    this.loading = true;
    this.login.loginFunction(this.user).subscribe((res: any) => {
      //console.log(res)
      if (res.status == false) {
        var toastHTML = '<span>' + res.message + '</span>';
        this.loading = false;
        M.toast({ html: toastHTML });
      } else {
        this.loading = false;
        localStorage.setItem('token', res.token);
        localStorage.setItem('language', 'es');
        localStorage.setItem('user', JSON.stringify(res.data[0]));
        if (res.data[0].typeUser == 1) {
          this.loading = false;
          return this.router.navigate(['/dashboard']);
        } else {
          this.loading = false;
          return this.router.navigate(['/dashboard/list-release'])
        }
      }
    });

  }

  ngOnInit() {
  }

}
