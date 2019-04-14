import { Component, OnInit } from '@angular/core';
import { PqrsService } from '../../../providers/pqrs.service';
declare var $: any;

@Component({
  selector: 'app-list-pqrs',
  templateUrl: './list-pqrs.component.html',
  styleUrls: ['./list-pqrs.component.css']
})
export class ListPqrsComponent implements OnInit {
  allData:any;
  p: Number[] = [];
  constructor(private pqrs: PqrsService) { }

  ngOnInit() {
    this.pqrs.groupPqrsByType().subscribe((res:any) => {
      if (res.status) {
        $(document).ready(function(){
          $('.collapsible').collapsible();
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
        
      }
    });
  }

}
