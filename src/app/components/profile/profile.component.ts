import { Component, OnInit } from '@angular/core';
import { UserService } from '../../providers/user.service';
import { PqrsService } from '../../providers/pqrs.service';
import { PaymentService } from '../../providers/payment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  pqrsInfo: Array<Object>;
  paymentInfo: any;
  p: Number[] = [];
  changePasswordForm: FormGroup;
  validSamePassword: Boolean = false;
  validNewPassword: Boolean = false;

  constructor(private userApi: UserService, private pqrsApi: PqrsService, private formBuilder: FormBuilder, private paymentApi: PaymentService) {
    this.userInfo = {};
    this.pqrsInfo;
    this.paymentInfo = [];
  }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      newPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      repeatPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
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
    this.pqrsApi.listPqrsByIdOrigin(this.user._id, this.token).subscribe((res: any) => {
      if (res.status) {
        this.pqrsInfo = res.data;
      } else {
        Swal.fire(res.message, '', 'error');
      }
    });
    this.paymentApi.listPaymentByUserId(this.token, this.user._id).subscribe((res: any) => {
      //console.log(res.data);
      this.paymentInfo = res.data;
    });
    $(document).ready(function () {
      $('.tabs').tabs();
      $('#tabs-swipe-demo').tabs({ 'swipeable': true });
      $('.modal').modal();
      $('.tooltipped').tooltip();
    });
  }

  onSubmitUser() {
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

  onSubmitPassword() {
    if (this.changePasswordForm.value.password == this.changePasswordForm.value.newPassword) {
      this.validNewPassword = true;
      this.validSamePassword = false;
    } else {
      if (this.changePasswordForm.value.newPassword == this.changePasswordForm.value.repeatPassword) {
        this.validSamePassword = false;
        this.validNewPassword = false;
        const password = {
          _id: this.user._id,
          password: this.changePasswordForm.value.password,
          newPassword: this.changePasswordForm.value.newPassword
        }
        this.userApi.changePassword(password, this.token).subscribe((res: any) => {
          if (res.status) {
            Swal.fire(res.message, '', 'success');
            this.ngOnInit();
          } else {
            Swal.fire(res.message, '', 'error');
          }
        })
      } else {
        this.validNewPassword = false;
        this.validSamePassword = true;
      }
    }
  }

}
