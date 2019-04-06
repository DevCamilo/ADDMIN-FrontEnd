import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../providers/user.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  user: any;
  token = localStorage.getItem('token');

  constructor(private _user: UserService) {
    this.user = {
      name: "",
      lastName: "",
      telephone: "",
      tower: "",
      apto: "",
      typeUser: Number,
      email: "",
      password: ""
    }
  }

  ngOnInit() {
    $(document).ready(function () {
      $('select').formSelect();
    });
  }

  onSubmit() {
    this.user.typeUser = parseInt(this.user.typeUser)
    //console.log(this.user);
    this._user.createUserFunction(this.user, this.token).subscribe((res: any) => {
      //console.log(res);
      if (res.status) {
        Swal.fire(res.message, '', 'success');
        this.user = {
          name: "",
          lastName: "",
          telephone: "",
          tower: "",
          apto: "",
          typeUser: 0,
          email: "",
          password: ""
        }
      } else {
        Swal.fire(res.message, '', 'error');
      }
    });
  }

}
