import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../providers/user.service';
import * as data from '../../../../assets/translate/languages.json';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})

export class ListUsersComponent implements OnInit {
  p:  Number = 1;
  filterUser: any = "";
  listUser: any;
  updateUser: any;
  token = localStorage.getItem('token');
  language = localStorage.getItem('language');
  content: any;

  constructor(private user: UserService) {
    this.listUser = {};
    this.updateUser = {};
  }

  ngOnInit() {
    if (this.language == 'es') {
      this.content = data.es.listUsers;
    } else {
      this.content = data.en.listUsers;
    }
    $(document).ready(function () {
      $('.modal').modal();
      $('select').formSelect();
    });
    this.user.listUsersFunction(this.token).subscribe((res: any) => {
      //console.log(res);
      if (res.status) {
        this.listUser = res.data;
      } else {
        Swal.fire(res.message, '', 'error');
      }
    });
  }

  deleteUser(id: String) {
    Swal.fire({
      title: '¿Desea eliminar el usuario?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.user.deleteUserFunction(id, this.token).subscribe((res: any) => {
          if (res.status) {
            Swal.fire(res.message, '', 'success');
            this.ngOnInit();
          } else {
            Swal.fire(res.message, '', 'error');
          }
        });
      }
    });
  }

  onSubmit() {
    console.log(this.updateUser);
    this.user.updateUserFunction(this.updateUser, this.token).subscribe((res: any) => {
      if (res.status) {
        Swal.fire(res.message, '', 'success');
      } else {
        Swal.fire(res.message, '', 'error');
      }
    });
  }

  setUser(user: Object) {
    this.updateUser = user;
  }

}
