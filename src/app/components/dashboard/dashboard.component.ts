import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../providers/stats.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  counts: any;
  user: any = JSON.parse(localStorage.getItem('user'));
  constructor(private stats: StatsService) {
    this.counts = [];
  }

  ngOnInit() {
    this.stats.countModel().subscribe((res: any) => {
      if (res.status) {
        this.counts = res.data
      } else {
        Swal.fire(res.message, '', 'error');
      }
    });
  }

}
