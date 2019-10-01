import { Component, OnInit } from '@angular/core';
import { PqrsService } from '../../../providers/pqrs.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as data from '../../../../assets/translate/languages.json';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-generate-pqrs',
  templateUrl: './generate-pqrs.component.html',
  styleUrls: ['./generate-pqrs.component.css']
})
export class GeneratePqrsComponent implements OnInit {
  token = localStorage.getItem('token');
  user: any =  JSON.parse(localStorage.getItem('user'));
  language: any = localStorage.getItem('language');
  content: any;
  typePqrs = [];
  pqrsForm: FormGroup;

  constructor(private pqrs: PqrsService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    if (this.language == 'es') {
      this.content = data.es.generatePqrs;
    } else {
      this.content = data.en.generatePqrs;
    }
    this.pqrsForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      id_origin: [this.user._id, Validators.nullValidator]
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

  onSubmit() {
    this.pqrsForm.value.id_origin = this.user._id;
    //console.log(this.pqrsForm.value);
    this.pqrs.createPqrs(this.pqrsForm.value, this.token).subscribe((res: any) =>{
      if (res.status) {
        Swal.fire(res.message, '', 'success');
        this.pqrsForm.reset();
        this.pqrsForm.value.type = '';
      } else {
        Swal.fire(res.message, '', 'error');        
      }
    });
  }

}
