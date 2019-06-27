import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generate-payment',
  templateUrl: './generate-payment.component.html',
  styleUrls: ['./generate-payment.component.css']
})
export class GeneratePaymentComponent implements OnInit {
  info: any;
  constructor() { 
    this.info = {
      nombre: '',
      apellido: '',
      torre: '',
      apto: '',
      email: '',
      pass: ''
    }
  }

  ngOnInit() {
  }

  validacion() {
    if (this.info.nombre == "" || this.info.apellido == "" || this.info.torre == "" || this.info.apto == "" || this.info.email == "") {
      Swal.fire({
        type: 'error',
        title: 'Oops!',
        text: 'Por favor completa el formulario',
      })
    } else {
      Swal.fire({
        type: 'success',
        title: 'Correcto!',
        text: 'Datos registrados con exito.',
      })
    }
  }

}
