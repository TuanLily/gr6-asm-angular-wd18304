import {Component, ViewEncapsulation, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {ApiService} from "../../../@core/services/common";
import {finalize, Observable} from "rxjs";
import {SpinnerService} from "../spinner/spinner.service";

@Component({
  selector: 'ngx-paginator',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  @Input() apiUrl: string;
  @Input() current_page: number;
  @Input() last_page: number;
  @Output() dataList: EventEmitter<number> = new EventEmitter();  // Emit the page number
  indexPage: number = 1;
  hasPreviousPage: boolean = true;
  hasNextPage: boolean = false;

  constructor(
    private apiService: ApiService,
    private spinner: SpinnerService,
  ) { }

  ngOnInit() {
    this.indexPage = this.current_page;
  }

  goFirstPage() {
    this.indexPage = 1;
    this.updatePage();
  }

  goLastPage() {
    this.indexPage = this.last_page;
    this.updatePage();
  }

  goPreviousPage() {
    if (this.indexPage > 1) {
      this.indexPage--;
      this.updatePage();
    }
  }

  goNextPage() {
    if (this.indexPage < this.last_page) {
      this.indexPage++;
      this.updatePage();
    }
  }

  updatePage() {
    this.spinner.show();
    this.apiService.get(`${this.apiUrl}?page=${this.indexPage}`).pipe(
      finalize(() => {
        this.spinner.hide();
      })
    ).subscribe({
      next: data => {
        this.dataList.emit(this.indexPage);  // Emit the page number
      },
      error: error => {
        console.error(error);
      }
    });
  }
}