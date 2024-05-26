import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-echarts',
  template: `<div echarts [options]="chartOptions" class="echart"></div>`,
})
export class EchartsComponent {
  @Input() chartOptions: any;
}
