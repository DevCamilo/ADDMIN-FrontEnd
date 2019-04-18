import { Component, OnInit } from '@angular/core';
import { ReleaseService } from '../../../providers/release.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-list-releases',
  templateUrl: './list-releases.component.html',
  styleUrls: ['./list-releases.component.css']
})
export class ListReleasesComponent implements OnInit {
  token: String = localStorage.getItem('token');
  user: any = JSON.parse(localStorage.getItem('user'));
  releases: any;
  editReleaseForm: String;
  editRelease: any;
  editorStyle: any = {
    height: '300px'
  }
  config: any = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered' }, { 'align': [] }],
      ['image', 'video', 'link']
    ]
  }

  constructor(private release: ReleaseService) {
    this.editReleaseForm = '';
  }

  ngOnInit() {
    this.release.listAllReleases(this.token).subscribe((res: any) => {
      if (res.status) {
        this.releases = res.data;
        $(document).ready(function () {
          $('.modal').modal();
        });
      } else {
        Swal.fire(res.message, '', 'error');
      }
    });
  }

  setRelease(setRelease: any) {
    this.editReleaseForm = setRelease.content;
    this.editRelease = setRelease;
  }

  onSubmit() {
    const release = {
      content: this.editReleaseForm,
      sender: this.editRelease.sender._id,
      _id: this.editRelease._id,
    }
    this.release.updateRelease(release, this.token).subscribe((res: any) => {
      if (res.status) {
        Swal.fire(res.message, '', 'success');
        this.ngOnInit();
      } else {
        Swal.fire(res.message, '', 'error');
      }
    });
  }

  deteleRelease(id: String){
    Swal.fire({
      title: '¿Desea eliminar el comunicado?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.release.deleteRelease(id, this.token).subscribe((res: any) => {
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
