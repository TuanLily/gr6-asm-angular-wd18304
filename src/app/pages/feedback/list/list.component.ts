import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NbThemeService,NbToastrService } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { IFeedback } from 'app/@core/interfaces/feedback.interface';
import { FeedbackService } from 'app/@core/services/apis/feedback.service';
import { SpinnerService } from "../../../@theme/components/spinner/spinner.service";
import { CustomerService } from 'app/@core/services/apis/customer.service';
import { ICustomer } from 'app/@core/interfaces/customers.interface';
import {
  API_BASE_URL,
  API_ENDPOINT,
} from 'app/@core/config/api-endpoint.config';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild('formElement') formElement: ElementRef;

  form: FormGroup;
  newFeedback: any = { content: '', customer_id: '', create_date: '' };

  // Biến để xác định trạng thái hiện tại: true = đang thêm mới, false = đang sửa
  isAddingNewFeedback: boolean = true;
  isEditing: boolean = false;

  feedbacks: IFeedback[] = [];

  customerData: any[] = [];

  apiUrl = API_BASE_URL + API_ENDPOINT.feedback;
  currentPage: number = 1;
  totalPages: number;
  searchQuery: string = '';

  themes = [
    { value: 'default', name: 'Light' },
    { value: 'dark', name: 'Dark' },
  ];

  currentTheme = 'default';


  constructor(
    private toastrService: NbToastrService,
    private feedbackService: FeedbackService,
    private customerService: CustomerService,
    private themeService: NbThemeService,
    private spinner: SpinnerService,
    private router: Router,
    private route: ActivatedRoute) {
      this.themeService.onThemeChange()
      .subscribe(theme => {
        this.currentTheme = theme.name;
      });
    }

  ngOnInit(): void {
    this.loadCustomers();
    this.route.queryParams.subscribe(params => {
      const currentPage = params['page'] || 1;
      this.loadFeedbacks(currentPage);

    });
    this.form = new FormGroup({
      content: new FormControl('', Validators.required),
      customer_id: new FormControl('', Validators.required),
    });
  }

  //* Hàm load toàn bộ dữ liệu ra giao diện
  loadFeedbacks(page: number): void {
    this.spinner.show();

    this.feedbackService.getAllFeedbacks(page, this.searchQuery).subscribe(data => {
      // console.log(data);

      this.spinner.hide();
      this.feedbacks = data.feedback;
      this.currentPage = data.currentPage;
      this.totalPages = data.totalPages;

      const queryParams: any = { page: page };

      if (this.searchQuery && this.searchQuery.trim() !== '') {
        queryParams.search = this.searchQuery;
      }

      this.router.navigate([], {
        queryParams: queryParams,
        replaceUrl: true
      });
    });


  }


  loadCustomers(page: number = 1, search: string = ''): void {
    this.customerService.getAllCustomers(page, search).subscribe(
      (data: any) => {
        console.log(data);
        this.customerData = data.customers;
      },
      error => {
        console.error('Error loading customers:', error);
        this.toastrService.danger('Đã xảy ra lỗi khi tải khách hàng!', 'Error');
      }
    );
  }



  onSearch(): void {
    // Gọi hàm loadfeedbacks với trang hiện tại và từ khóa tìm kiếm
    this.loadFeedbacks(this.currentPage);
  }
  //* Hàm xử lý thêm mới hoặc cập nhật đánh giá
  addFeedback(): void {
    if (!this.form.valid) {
      this.toastrService.danger('Vui lòng nhập đủ dữ liệu và kiểm tra lại các trường!', 'Error');
      return;
    }

    let feedbackData: IFeedback = {
      content: this.form.get('content').value,
      customer_id: this.form.get('customer_id').value,
    };

    if (this.isEditing && !this.isAddingNewFeedback) {
    // Nếu đang trong chế độ sửa, cập nhật thông tin cho đánh giá được chọn
    const feedbackId = this.newFeedback.id;
    console.log(feedbackId);

    this.feedbackService.updateFeedback(feedbackId, feedbackData).subscribe(
      () => {
        this.toastrService.success('Cập nhật thành công!', 'Success');
        this.isEditing = false;
        this.spinner.hide();
        this.loadFeedbacks(this.currentPage);
      },
      error => {
        this.toastrService.danger('Đã xảy ra lỗi khi cập nhật đánh giá!', 'Error');
        console.error('Error updating feedback:', error);
        this.spinner.hide();
      }
    );
  }
    else {
      // Nếu không đang trong chế độ sửa, thêm đánh giá mới vào danh sách
      this.feedbackService.addFeedback(feedbackData).subscribe(
        () => {
          this.toastrService.success('Thêm mới thành công!', 'Success');
          this.spinner.hide();
          this.loadFeedbacks(1);
        },
        error => {
          this.toastrService.danger('Đã xảy ra lỗi khi thêm đánh giá!', 'Error');
          console.error('Error adding feedback:', error);
          this.spinner.hide();
        }
      );
    }
    this.form.reset();
  }

  //* Hàm xử lý dữ liệu đưa lên form để cập nhật đánh giá
  editFeedback(feedbackId: number): void {
    if (this.isEditing) {
      return;
    }

    const feedbackIndex = this.feedbacks.findIndex(feedback => feedback.id === feedbackId);
    if (feedbackIndex !== -1) {
      this.newFeedback = { ...this.feedbacks[feedbackIndex] };

      this.form.patchValue({
        content: this.newFeedback.content,
        customer_id: this.newFeedback.customer_id,
      });
      this.form.get('customer_id')?.disable(); // Disable customer_id khi ở chế độ chỉnh sửa
      this.isAddingNewFeedback = false;
      this.isEditing = true;
      this.toastrService.info('Sẵn sàng cập nhật!', 'Thông tin');
    }
    this.scrollFormIntoView();
  }


  //* Hàm xóa đánh giá
  deleteFeedback(feedbackId: number): void {
    Swal.fire({
      title: 'Xác nhận xóa',
      text: 'Bạn có chắc chắn muốn xóa đánh giá này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy bỏ'
    }).then((result) => {
      if (result.isConfirmed) {
        this.feedbackService.deleteFeedback(feedbackId).subscribe(
          () => {
            const feedbackIndex = this.feedbacks.findIndex(feedback => feedback.id === feedbackId);
            if (feedbackIndex !== -1) {
              this.feedbacks.splice(feedbackIndex, 1);
              this.toastrService.success('Xóa thành công!', 'Success');
            }
          },
          error => {
            this.toastrService.danger('Đã xảy ra lỗi khi xóa đánh giá!', 'Error');
            console.error('Error deleting feedback:', error);
          }
        );
      }
    });
  }

  Reset(): void {
    this.isEditing = false;
    this.isAddingNewFeedback = true; // Chuyển về trạng thái thêm mới
    this.form.reset();
    this.form.get('customer_id')?.enable();
    this.toastrService.success('Dữ liệu trên form đã được reset!', 'Thành công');
  }

  scrollFormIntoView(): void {
    if (this.formElement) {
      this.formElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
