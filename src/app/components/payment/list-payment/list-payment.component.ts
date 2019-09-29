import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../../providers/payment.service';

@Component({
  selector: 'app-list-payment',
  templateUrl: './list-payment.component.html',
  styleUrls: ['./list-payment.component.css']
})
export class ListPaymentComponent implements OnInit {
  p:  Number = 1;
  filterPayment: any = "";
  token = localStorage.getItem('token');
  listPayments: any;
  constructor(private paymentAPI: PaymentService) { 
    this.listPayments = [];
  }

  ngOnInit() {
    this.paymentAPI.listAllPayment(this.token).subscribe((res: any) => {
      console.log(res.data);
      this.listPayments = res.data;
    });
  }

}
