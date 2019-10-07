import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from '../../../providers/payment.service';
import { UserService } from '../../../providers/user.service';
import * as data from '../../../../assets/translate/languages.json';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-generate-payment',
  templateUrl: './generate-payment.component.html',
  styleUrls: ['./generate-payment.component.css']
})
export class GeneratePaymentComponent implements OnInit {
  token = localStorage.getItem('token');
  currentUser: any = JSON.parse(localStorage.getItem('user'));
  language = localStorage.getItem('language');
  conten: any;
  listPaymentesType = [];
  listUsers = [];
  paymentForm: FormGroup;

  constructor(private paymentAPI: PaymentService, private userAPI: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.language == 'es' ? this.conten = data.es.generatePayment : this.conten = data.en.generatePayment;
    if (this.currentUser.typeUser == 1) {
      this.paymentForm = this.formBuilder.group({
        id_user: ['', Validators.required],
        id_type_payment: ['', Validators.required],
        final_value: [0, Validators.required],
        discount_value: [0, Validators.required],
        original_value: ['', Validators.required]
      });
    } else {
      this.paymentForm = this.formBuilder.group({
        id_user: [this.currentUser._id, Validators.required],
        id_type_payment: ['', Validators.required],
        final_value: [0, Validators.required],
        discount_value: [0, Validators.required],
        original_value: ['', Validators.required]
      });
    }
    this.paymentAPI.listAllPaymentType(this.token).subscribe((res: any) => {
      if (res.status) {
        $(document).ready(function () {
          $('select').formSelect();
        });
        this.listPaymentesType = res.data;
        this.userAPI.listUsersFunction(this.token).subscribe((res: any) => {
          if (res.status) {
            $(document).ready(function () {
              $('select').formSelect();
            });
            this.listUsers = res.data;
            //console.log(this.listUsers);
          } else {
            Swal.fire(res.message, '', 'error');
          }
        });
      } else {
        Swal.fire(res.message, '', 'error');
      }
    });

  }

  onSubmit() {
    this.paymentForm.value.final_value = this.paymentForm.value.original_value - this.paymentForm.value.discount_value;
    this.paymentAPI.createPayment(this.token, this.paymentForm.value).subscribe((res: any) => {
      if (res.status) {
        Swal.fire(res.message, '', 'success');
        this.paymentForm.reset();
      } else {
        Swal.fire(res.message, '', 'error');
      }
    });
    console.log(this.paymentForm.value);
  }

}