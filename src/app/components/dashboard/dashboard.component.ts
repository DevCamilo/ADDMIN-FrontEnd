import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../providers/stats.service';
import { ChartType, ChartDataSets, ChartOptions } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';
//import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  counts: any;

  chartLabels: Label[];
  chartData: MultiDataSet = [];
  chartType: ChartType = 'doughnut';
  chartColors: Color[] = [
    {
      backgroundColor: ["rgba(255,99,132,0.6)", "rgba(54,162,235,0.6)", "rgba(255,206,86,0.6)", "rgba(231,233,237,0.6)"],
      borderColor: ["rgba(255,99,132,1)", "rgba(54,162,235,0.6)", "rgba(255,206,86,0.6)", "rgba(231,233,237,0.6)"],
      hoverBackgroundColor: ["rgba(255,99,132,0.8)", "rgba(54,162,235,0.8)", "rgba(255,206,86,0.8)", "rgba(231,233,237,0.8)"],
      hoverBorderColor: ["rgba(255,99,132,1)", "rgba(54,162,235,1)", "rgba(255,206,86,1)", "rgba(231,233,237,1)"]
    }
  ];

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{}], yAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 10,
        }
      }]
    }
  };
  barChartLabels: Label[] = ['Mayo'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  //barChartPlugins = [pluginDataLabels];

  barChartData: ChartDataSets[] = [
    { data: [0], label: '' }
  ];

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
    this.stats.countPqrs().subscribe((res: any) => {
      if (res.status) {
        let arrayCount = new Array;
        let arrayName = new Array;
        let arrayDataSet = new Array;
        for (let i = 0; i < res.data.length; i++) {
          arrayCount.push(res.data[i].count);
          arrayName.push(res.data[i]._id.name);
          arrayDataSet.push({ data: [res.data[i].count], label: res.data[i]._id.name });
        }
        this.chartLabels = arrayName;
        this.chartData = arrayCount;
        this.barChartData = arrayDataSet;
      } else {
        Swal.fire(res.message, '', 'error');
      }
    });
  }
}
