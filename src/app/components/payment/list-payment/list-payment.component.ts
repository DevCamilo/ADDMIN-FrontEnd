import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../../providers/payment.service';
import { UserService } from '../../../providers/user.service';
declare var $: any;
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-payment',
  templateUrl: './list-payment.component.html',
  styleUrls: ['./list-payment.component.css']
})
export class ListPaymentComponent implements OnInit {
  p: Number = 1;
  filterPayment: any = "";
  token = localStorage.getItem('token');
  listPayments: any;
  loading: any = true;
  listPaymentesType = [];
  listUsers = [];
  updatePayment: any = {};
  constructor(private paymentAPI: PaymentService, private userAPI: UserService) {
    this.listPayments = [];
    this.updatePayment = {
      _id: "",
      id_user: "",
      id_type_payment: "",
      final_value: 0,
      discount_value: 0,
      original_value: 0
    }
  }

  ngOnInit() {
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
    this.paymentAPI.listAllPayment(this.token).subscribe((res: any) => {
      //console.log(res.data);
      this.listPayments = res.data;
      $(document).ready(function () {
        $('.modal').modal();
        $('#myTable').DataTable({
          bDestroy: true,
          bPaginate: false,
          bFilter: false,
          bInfo: false,
          dom: 'Bfrtip',
          buttons: [
            {
              //Botón para Excel
              extend: 'csv',
              footer: true,
              title: 'Pagos',
              filename: 'pagos_addmin_csv',
              //Aquí es donde generas el botón personalizado
              text: '<button class="waves-effect waves-light btn">CSV <i class="fas fa-file-csv"></i></button>'
            },
            {
              //Botón para Excel
              extend: 'excel',
              footer: true,
              title: 'Pagos',
              filename: 'pagos_addmin_excel',
              //Aquí es donde generas el botón personalizado
              text: '<button class="waves-effect waves-light btn">Excel <i class="fas fa-file-excel"></i></button>'
            },
            //Botón para PDF
            {
              extend: 'pdf',
              footer: true,
              title: 'Pagos',
              filename: 'pagos_addmin_pdf',
              text: '<button class="btn btn-danger">PDF <i class="fas fa-file-pdf"></i></button>'
            }
          ]
        });
      });
      this.loading = false;
    });
  }

  deletePayment(id) {
    Swal.fire({
      title: '¿Desea eliminar el pago?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.paymentAPI.deletePayment(this.token, id).subscribe((res: any) => {
          if (res.status) {
            Swal.fire(res.message, '', 'success');
            this.ngOnInit();
            $(document).ready(function () {
              $("#myTable").dataTable().fnDestroy();
            });
          } else {
            Swal.fire(res.message, '', 'error');
          }
        });
      }
    });
  }

  setPayment(obj) {
    console.log(obj);
    this.updatePayment._id = obj._id;
    this.updatePayment.id_user = obj.id_user._id;
    this.updatePayment.id_type_payment = obj.id_type_payment._id;
    this.updatePayment.original_value =  obj.original_value;
    this.updatePayment.discount_value = obj.discount_value;
    this.updatePayment.final_value = this.updatePayment.original_value - this.updatePayment.discount_value;
  }

  onSubmit() {
    console.log(this.updatePayment);
    this.paymentAPI.updatePayment(this.token, this.updatePayment).subscribe((res: any) => {
      if (res.status) {
        Swal.fire(res.message, '', 'success');
        this.updatePayment = {
          _id: "",
          id_user: "",
          id_type_payment: "",
          final_value: 0,
          discount_value: 0,
          original_value: 0
        };
        $(document).ready(function () {
          $(".modal").modal('close');
        });
      } else {
        Swal.fire(res.message, '', 'error');
      }
    });
  }
}


