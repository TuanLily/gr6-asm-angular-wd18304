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
  countCustomers: number;
  countEmployees: number;
  pieChartData: any[] = [];
  billStatusData: any[] = [];
  totalRevenuesData: any[] = [];


  themes = [
    { value: 'default', name: 'Light' },
    { value: 'dark', name: 'Dark' },
  ];

  currentTheme = 'default';

  constructor(
    private statisticsService: statisticsService,
    private themeService: NbThemeService
  ) { }

  ngOnInit(): void {
    this.initCharts();

    this.themeService.onThemeChange().subscribe((theme: any) => {
      this.currentTheme = theme.name;
      this.initCharts();
    });


    //* Hàm sử lý thống kê giá tiền sản phẩm theo hạng mức
    this.statisticsService.getProductPrices().subscribe((data) => {
      this.productPriceStats = data;
    });

    //* Hàm sử lý thống kê tổng số lượng sản phẩm
    this.statisticsService.getCountProducts().subscribe(
      (data) => {
        this.countProducts = data.count;
      },
      (error) => {
        console.error('Error fetching product count', error);
      }
    );

    //* Hàm sử lý thống số lượng đơn hàng theo trạng thái
    this.statisticsService.getBillStatus().subscribe((data) => {
      if (data && data.statusCounts) {
        const statusCounts = data.statusCounts;


        this.billStatusData = [
          { value: statusCounts["0"] || 0, name: 'Đang giao' },
          { value: statusCounts["1"] || 0, name: 'Đã giao' },
          { value: statusCounts["2"] || 0, name: 'Đã huỷ' },
        ];

        this.pieChartOptions = this.getPieChartOptions();
      } else {
        console.error('Data or statusCounts is null/undefined', data);
      }
    }, (error) => {
      console.error('Failed to load bill status', error);
    });

    //* Hàm sử lý thống kê số lượng sản phẩm theo danh mục
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


    //* Hàm sử lý thống kê tổng số lượng tài khoản khách hàng
    this.statisticsService.getCountCustomers().subscribe(
      (data) => {
        this.countCustomers = data.count;
      },
      (error) => {
        console.error('Error fetching customer count', error);
      }
    );

    //* Hàm sử lý thống kê tổng số lượng tài khoản nhân viên
    this.statisticsService.getCountEmployees().subscribe(
      (data) => {
        this.countEmployees = data.count;
      },
      (error) => {
        console.error('Error fetching employee count', error);
      }
    );

    //* Hàm sử lý thống kê doanh thu theo tháng
    this.statisticsService.getTotalRevenues().subscribe((data) => {
      if (data && data.monthlyRevenues) {
        this.totalRevenuesData = data.monthlyRevenues.map(item => ({
          value: item.total,
          name: item.month
        }));

        this.columnChartOptions = this.getColumnChartOptions();
      } else {
        console.error('Expected an array but got:', data);
      }
    }, (error) => {
      console.error('Failed to load total revenues', error);
    });

  }

  initCharts(): void {

    this.pieChartOptions = this.getPieChartOptions();
    this.pieChartOptions2 = this.getPieChartOptions2();
    this.columnChartOptions = this.getColumnChartOptions();

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
          data: this.billStatusData, // Sử dụng dữ liệu được truy xuất từ biến billStatusData
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

  getColumnChartOptions(): any {
    const textColor = this.currentTheme === 'dark' ? '#fff' : '#000';

    return {
      title: {
        text: 'Biểu đồ Doanh Thu Theo 12 Tháng',
        textStyle: {
          fontFamily: 'Open Sans, sans-serif',
          fontSize: 18,
          fontWeight: 'bold',
          color: textColor,
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
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
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: this.totalRevenuesData.map(item => item.name), // Dữ liệu trục x được truy xuất từ totalRevenuesData
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            color: textColor,
          },
          axisLine: {
            lineStyle: {
              color: textColor,
            },
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            color: textColor,
          },
          axisLine: {
            lineStyle: {
              color: textColor,
            },
          },
          splitLine: {
            lineStyle: {
              color: textColor,
            },
          },
        },
      ],
      series: [
        {
          name: 'Doanh Thu',
          type: 'bar',
          barWidth: '60%',
          data: this.totalRevenuesData.map(item => item.value), // Dữ liệu trục y được truy xuất từ totalRevenuesData
          itemStyle: {
            color: '#5470C6',
          },
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
