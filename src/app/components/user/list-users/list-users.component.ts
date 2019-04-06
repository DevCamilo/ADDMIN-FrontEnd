import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../providers/user.service';
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  listUser: any;
  token = localStorage.getItem('token');

  constructor(private user: UserService) { }

  ngOnInit() {
    this.user.listUsersFunction(this.token).subscribe((res: any) => {
      //console.log(res);
      this.listUser = res.data;
    });
  }

}
