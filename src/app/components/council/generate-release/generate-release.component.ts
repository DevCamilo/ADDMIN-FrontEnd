import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReleaseService } from '../../../providers/release.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-generate-release',
  templateUrl: './generate-release.component.html',
  styleUrls: ['./generate-release.component.css']
})
export class GenerateReleaseComponent implements OnInit {
  editForm: FormGroup;
  user: any = JSON.parse(localStorage.getItem('user'));
  token: String = localStorage.getItem('token');
  createRelease: any = {};
  editorStyle: any = {
    height: '300px'
  }
  config = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered' }, { 'align': [] }],
      ['image', 'video', 'link']
    ]
  }
  constructor(private formBuilder: FormBuilder, private release: ReleaseService) {
  }

  ngOnInit() {
    $(document).ready(function () {
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
        this.createRelease.content = this.editForm.value.editor.replace(/"/gi, "'"); // Remplaza todos los " por ' en la cadena de editor
        this.createRelease.sender = this.user._id;
        this.release.createRelease(this.createRelease, this.token).subscribe((res: any) => {
          if (res.status) {
            Swal.fire(res.message, '', 'success');
            this.ngOnInit();
          } else {
            Swal.fire(res.message, '', 'error');
          }
        });
      }
    });
  }

}
