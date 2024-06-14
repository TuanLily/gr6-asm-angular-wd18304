import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { IProductPrices } from 'app/@core/interfaces/statistic.interface';
import { statisticsService } from 'app/@core/services/apis/statistic.service';
@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  columnChartOptions: any;
  pieChartOptions: any;
  lineChartOptions: any;

  productPriceStats: IProductPrices;
  countProducts: number;


  themes = [
    { value: 'default', name: 'Light' },
    { value: 'dark', name: 'Dark' },
  ];

  currentTheme = 'default';


  constructor(
    private statisticsService: statisticsService,
    private themeService: NbThemeService,


  ) {
    this.themeService.onThemeChange()
      .subscribe(theme => {
        this.currentTheme = theme.name;
      });

    this.columnChartOptions = {
      title: {
        text: 'Biểu đồ'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    };

    this.pieChartOptions = {
      title: {
        text: 'Biểu đồ'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    };

    this.lineChartOptions = {
      title: {
        text: 'Biểu đồ'
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Biểu đồ đường',
          type: 'line',
          data: [150, 230, 224, 218, 135, 147, 260],
        },
      ],
    };
  }

  ngOnInit(): void {
    this.statisticsService.getProductPrices().subscribe(data => {
      this.productPriceStats = data;
    });

    this.statisticsService.getCountProducts().subscribe(
      (data) => {
        this.countProducts = data.count;
      },
      (error) => {
        console.error('Error fetching product count', error);
      }
    );
    
  }

  // *Định dạng tiền tệ
  formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  }
}
