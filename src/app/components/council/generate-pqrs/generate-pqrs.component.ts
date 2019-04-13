import { Component, OnInit } from '@angular/core';
import { PqrsService } from '../../../providers/pqrs.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-generate-pqrs',
  templateUrl: './generate-pqrs.component.html',
  styleUrls: ['./generate-pqrs.component.css']
})
export class GeneratePqrsComponent implements OnInit {
  token = localStorage.getItem('token');
  typePqrs = [];
  pqrsForm: FormGroup;

  constructor(private pqrs: PqrsService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.pqrsForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required]
    });
    this.pqrs.listTypePqrs(this.token).subscribe((res: any) => {
      if (res.status) {
        //console.log(res.data);
        // Se carga la clase de jQuery solo si la respuesta de la API fue correcta
        $(document).ready(function () {
          $('select').formSelect();
        });
        this.typePqrs = res.data;
      } else {
        Swal.fire(res.message, '', 'error');
      }
    });
  }

  onSubmit(){
    console.log(this.pqrsForm.value);
    
  }

}
