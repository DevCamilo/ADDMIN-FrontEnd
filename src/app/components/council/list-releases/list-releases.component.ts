import { Component, OnInit } from '@angular/core';
import { ReleaseService } from '../../../providers/release.service';
@Component({
  selector: 'app-list-releases',
  templateUrl: './list-releases.component.html',
  styleUrls: ['./list-releases.component.css']
})
export class ListReleasesComponent implements OnInit {
  token: String = localStorage.getItem('token');
  test: any;
  constructor(private release: ReleaseService) { }

  ngOnInit() {
    this.release.listAllReleases(this.token).subscribe((res: any) => {
      if (res.status) {
        console.log(res);
        this.test = res.data[0].content;
        console.log(this.test);
        
      } else {
        
      }
    });
  }

}
