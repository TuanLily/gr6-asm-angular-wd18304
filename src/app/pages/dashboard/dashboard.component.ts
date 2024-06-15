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
  areaChartOptions: any;
  pieChartOptions2: any;

  productPriceStats: IProductPrices;
  countProducts: number;
  pieChartData: any[] = [];

  themes = [
    { value: 'default', name: 'Light' },
    { value: 'dark', name: 'Dark' },
  ];

  currentTheme = 'default';

  constructor(
    private statisticsService: statisticsService,
    private themeService: NbThemeService
  ) {
    this.lineChartOptions = {
      title: {
        text: 'Biểu đồ',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
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
          smooth: true,
        },
      ],
    };

    this.areaChartOptions = {
      title: {
        text: 'Thống kê Doanh thu',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [
          'Tháng 1',
          'Tháng 2',
          'Tháng 3',
          'Tháng 4',
          'Tháng 5',
          'Tháng 6',
          'Tháng 7',
          'Tháng 8',
          'Tháng 9',
          'Tháng 10',
          'Tháng 11',
          'Tháng 12',
        ],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Doanh thu',
          type: 'line',
          stack: 'Tổng',
          areaStyle: {},
          data: [
            820, 932, 901, 934, 1290, 1330, 1320, 1410, 1500, 1600, 1700, 1800,
          ],
        },
      ],
    };

  }

  ngOnInit(): void {
    this.statisticsService.getProductPrices().subscribe((data) => {
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

    this.statisticsService.getBillStatus().subscribe((data) => {
      const statusCounts = data.statusCounts;

      const chartData = [
        { value: statusCounts['0'] || 0, name: 'Đang giao' },
        { value: statusCounts['1'] || 0, name: 'Đã giao' },
        { value: statusCounts['2'] || 0, name: 'Đã huỷ' },
      ];

      this.pieChartOptions.series[0].data = chartData;
    });

    this.statisticsService.getCountCateProducts().subscribe((data) => {
      if (data && Array.isArray(data.data)) {
        this.pieChartData = data.data.map((item) => ({
          value: item.product_count,
          name: item.name
        }));
      } else {
        console.error('Expected an array but got:', data);
      }
  
      this.pieChartOptions2 = this.getPieChartOptions2();
    });

    this.themeService.onThemeChange().subscribe((theme: any) => {
      this.currentTheme = theme.name;
      this.initCharts();
    });

    this.initCharts();
  }
  
  initCharts(): void {
    
    this.pieChartOptions = this.getPieChartOptions();
    this.pieChartOptions2 = this.getPieChartOptions2();

  }

  getPieChartOptions(): any {
    const textColor = this.currentTheme === 'dark' ? '#fff' : '#000';

    return {
      title: {
        text: 'Biểu đồ Tình Trạng Đơn Hàng',
        textStyle: {
          fontFamily: 'Open Sans, sans-serif',
          fontSize: 18,
          fontWeight: 'bold',
          color: textColor,
        },
      },
      tooltip: {
        trigger: 'item',
        textStyle: {
          fontFamily: 'Open Sans, sans-serif',
          fontSize: 12,
        },
      },
      legend: {
        top: '5%',
        left: 'center',
        textStyle: {
          fontFamily: 'Open Sans, sans-serif',
          fontSize: 12,
          color: textColor,
        },
      },
      series: [
        {
          name: 'Tình Trạng Đơn Hàng',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold',
              color: textColor,
            },
          },
          labelLine: {
            show: false,
          },
          data: this.pieChartOptions ? this.pieChartOptions.series[0].data : [],
        },
      ],
    };
  }

  getPieChartOptions2(): any {
    const textColor = this.currentTheme === 'dark' ? '#fff' : '#000';

    return {
      title: {
        text: 'Thống Kê Số Lượng Sản Phẩm Theo Danh Mục',
        textStyle: {
          fontFamily: 'Open Sans, sans-serif',
          fontSize: 18,
          fontWeight: 'bold',
          color: textColor,
        },
      },
      tooltip: {
        trigger: 'item',
        textStyle: {
          fontFamily: 'Open Sans, sans-serif',
          fontSize: 12,
        },
      },
      legend: {
        top: '5%',
        left: 'center',
        textStyle: {
          fontFamily: 'Open Sans, sans-serif',
          fontSize: 12,
          color: textColor,
        },
      },
      series: [
        {
          name: 'Lượng Sản Phẩm Theo Danh Mục',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold',
              color: textColor,
            },
          },
          labelLine: {
            show: false,
          },
          data: this.pieChartData,
        },
      ],
    };
  }


  // *Định dạng tiền tệ
  formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  }
}
