import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  columnChartOptions: any;
  pieChartOptions: any;
  lineChartOptions: any;

  constructor() {
    this.columnChartOptions = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Biểu đồ cột 1',
          type: 'bar',
          data: [150, 230, 224, 218, 135, 147, 260]
        }
      ]
    };

    this.pieChartOptions = {
      series: [
        {
          name: 'Biểu đồ tròn',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 335, name: 'Mùa Xuân' },
            { value: 310, name: 'Mùa Hè' },
            { value: 234, name: 'Mùa Thu' },
            { value: 135, name: 'Mùa Đông' }
          ]
        }
      ]
    };

    this.lineChartOptions = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Biểu đồ đường',
          type: 'line',
          data: [150, 230, 224, 218, 135, 147, 260]
        }
      ]
    };
  }


  ngOnInit(): void { }

}
