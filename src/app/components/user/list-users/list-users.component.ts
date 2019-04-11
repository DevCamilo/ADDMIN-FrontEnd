import { Component, OnInit, NgZone } from '@angular/core';
import { UserService } from '../../../providers/user.service';
import Swal from 'sweetalert2';
declare var $: any, M: any;

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})

export class ListUsersComponent implements OnInit {
  p: number = 1;
  flag: Number = 1;
  filterUser: any = "";
  listUser: any;
  updateUser: any;
  token = localStorage.getItem('token');

  constructor(private user: UserService, private zone: NgZone) {
    this.listUser = {};
    this.updateUser = {};
  }

  ngOnInit() {
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
    // console.log(this.updateUser);
    this.user.updateUserFunction(this.updateUser, this.token).subscribe((res: any) => {
      if (res.status) {
        Swal.fire(res.message, '', 'success');
      } else {
        Swal.fire(res.message, '', 'error');
      }
    });
  }

  setUser(user) {
    this.updateUser = user;
  }

}