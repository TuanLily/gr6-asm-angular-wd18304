import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-echarts',
  template: `<div echarts [options]="chartOptions" class="echart"></div>`,
  styleUrls: ['./echarts.component.scss']
})
export class EchartsComponent {
  @Input() chartOptions: any;
}
