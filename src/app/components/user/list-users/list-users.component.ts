import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../providers/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})

export class ListUsersComponent implements OnInit {
  p: number = 1;
  filterUser: any = "";
  listUser: any;
  token = localStorage.getItem('token');

  constructor(private user: UserService) { 
    this.listUser = [];
  }

  ngOnInit() {
    this.user.listUsersFunction(this.token).subscribe((res: any) => {
      //console.log(res);
      this.listUser = res.data;
    });
  }

  deleteUser(id: String) {
    Swal.fire({
      title: '¿Está seguro que desea eliminar el usuario?',
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
    })

  }

}
