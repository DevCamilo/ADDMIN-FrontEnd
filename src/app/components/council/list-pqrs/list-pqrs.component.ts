import { Component, OnInit } from '@angular/core';
import { PqrsService } from '../../../providers/pqrs.service';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-list-pqrs',
  templateUrl: './list-pqrs.component.html',
  styleUrls: ['./list-pqrs.component.css']
})
export class ListPqrsComponent implements OnInit {
  allData: any;
  token: String = localStorage.getItem('token');
  updateType: any;
  p: Number[] = [];
  createTypePqrsForm: FormGroup;
  constructor(private pqrs: PqrsService, private formBuilder: FormBuilder) { 
    this.updateType = {}
  }

  ngOnInit() {
    this.createTypePqrsForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    })
    this.pqrs.groupPqrsByType().subscribe((res: any) => {
      if (res.status) {
        $(document).ready(function () {
          $('.modal').modal();
        });
        this.allData = res.data;
        // Reasigna los usuarios dentro de info para poder leerlos mas facil en el ngFor
        for (let i = 0; i < this.allData.length; i++) {
          for (let i2 = 0; i2 < this.allData[i].info.length; i2++) {
            this.allData[i].info[i2].user = res.data[i].users[i2];
          }
        }
        //console.log(this.allData);
      } else {
        Swal.fire(res.message, '', 'error');
      }
    });
  }

  createTypePqrs() {
    this.pqrs.createTypePqrs(this.createTypePqrsForm.value, this.token).subscribe((res: any) => {
      if (res.status) {
        Swal.fire(res.message, '', 'success');
        this.createTypePqrsForm.reset();
      } else {
        Swal.fire(res.message, '', 'error');
      }
    });
  }

  setTypePqrs(user: Object){
    this.updateType = user;
  }

  updateTypePqrs(){
    this.pqrs.updateTypePqrs(this.updateType, this.token).subscribe((res: any) =>{
      if (res.status) {        
        Swal.fire(res.message, '', 'success');        
      } else {
        Swal.fire(res.message, '', 'error');        
      }
    });
  }
}
