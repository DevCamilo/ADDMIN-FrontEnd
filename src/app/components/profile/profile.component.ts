import { Component, OnInit } from '@angular/core';
import { UserService } from '../../providers/user.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  token: String = localStorage.getItem('token');
  user: any = JSON.parse(localStorage.getItem('user'));
  userInfo: any;
  constructor(private userApi: UserService) {
    this.userInfo = {}
  }

  ngOnInit() {
    this.userApi.findUserById(this.user._id, this.token).subscribe((res: any) => {
      if (res.status) {
        //console.log(res.data);
        this.userInfo = {
          name: res.data.name,
          lastName: res.data.lastName,
          telephone: res.data.telephone,
          email: res.data.email,
          tower: res.data.tower,
          apto: res.data.apto
        }
      } else {
        Swal.fire(res.message, '', 'error');       
      }
    });
    $(document).ready(function () {
      $('.tabs').tabs();
      $('#tabs-swipe-demo').tabs({ 'swipeable': true });
      $(".tabs-content").css('height','1000px');
      $('.modal').modal();
    });
  }

  onSubmit(){
    const user = {
      _id: this.user._id,
      name: this.userInfo.name,
      lastName: this.userInfo.lastName,
      telephone: this.userInfo.telephone
    }
    user.telephone = user.telephone.toString();
    this.userApi.updateUserFunction(user, this.token).subscribe((res: any) => {
      if (res.status) {
        Swal.fire(res.message, '', 'success');
        this.ngOnInit();
        
      } else {
        Swal.fire(res.message, '', 'error');       
      }
    });
  }

}
