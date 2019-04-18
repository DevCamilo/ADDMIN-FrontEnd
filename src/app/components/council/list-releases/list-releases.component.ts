import { Component, OnInit } from '@angular/core';
import { ReleaseService } from '../../../providers/release.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-releases',
  templateUrl: './list-releases.component.html',
  styleUrls: ['./list-releases.component.css']
})
export class ListReleasesComponent implements OnInit {
  token: String = localStorage.getItem('token');
  releases: any;
  constructor(private release: ReleaseService) {
   }

  ngOnInit() {
    this.release.listAllReleases(this.token).subscribe((res: any) => {
      if (res.status) {
        this.releases = res.data;        
      } else {
        Swal.fire(res.message, '', 'error');
      }
    });
  }

}
