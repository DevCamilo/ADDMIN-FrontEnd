import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-generate-release',
  templateUrl: './generate-release.component.html',
  styleUrls: ['./generate-release.component.css']
})
export class GenerateReleaseComponent implements OnInit {
  editForm: FormGroup;
  editorContent: String;
  editorStyle = {
    height: '300px'
  }
  config = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'align': [] }],
      ['image', 'video', 'link']
    ]
  }
  constructor(private formBuilder: FormBuilder) { 
  }

  ngOnInit() {
    $(document).ready(function(){
      $('.modal').modal();
    });
    this.editForm = this.formBuilder.group({
      'editor': ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  onSubmit() {
    Swal.fire({
      title: 'Esta seguro de generar el comunicado',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
      console.log(this.editForm.value.editor);  
      this.ngOnInit();    
      }
    });
  }

}
