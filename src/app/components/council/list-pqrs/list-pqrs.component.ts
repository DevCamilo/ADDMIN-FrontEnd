import { Component, OnInit } from '@angular/core';
import { PqrsService } from '../../../providers/pqrs.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  user: any =  JSON.parse(localStorage.getItem('user'));
  updateType: any;
  updatePqrsInfo: any;
  p: Number[] = [];
  createTypePqrsForm: FormGroup;
  constructor(private pqrs: PqrsService, private formBuilder: FormBuilder) { 
    this.updateType = {};
    this.updatePqrsInfo = {
      response: '',
      user: {
        name: ''
      }
    };
  }

  ngOnInit() {
    $(document).ready(function () {
      $('.modal').modal();
    });
    this.createTypePqrsForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.pqrs.groupPqrsByType(this.token).subscribe((res: any) => {
      if (res.status) {
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

  setTypePqrs(typePqrs: Object){
    this.updateType = typePqrs;
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

  setPqrs(pqrs: Object){
    this.updatePqrsInfo = pqrs;
    this.updatePqrsInfo.id_attendant = this.user._id
  }

  updatePqrs(){
    var finalData = {
      response: this.updatePqrsInfo.response,
      id_attendant: this.updatePqrsInfo.id_attendant,
      id: this.updatePqrsInfo._id
    }
    console.log(finalData);
    
    this.pqrs.updatePqrs(finalData, this.token).subscribe((res:any) =>{
      if (res.status) {
        Swal.fire(res.message, '', 'success');
        this.updatePqrsInfo.response = '';
        this.ngOnInit();                
      } else {
        Swal.fire(res.message, '', 'error');                
      }
    });
  }

}
