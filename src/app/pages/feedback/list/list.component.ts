import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { IFeedback } from 'app/@core/interfaces/feedback.interface';
import { FeedbackService } from 'app/@core/services/apis/feedback.service';
import { SpinnerService } from "../../../@theme/components/spinner/spinner.service";
import { CustomerService } from 'app/@core/services/apis/customer.service';
import { ICustomer } from 'app/@core/interfaces/customers.interface';

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
  customerData: ICustomer[] = [];

  constructor(
    private toastrService: NbToastrService,
    private feedbackService: FeedbackService,
    private customerService: CustomerService,
    private spinner: SpinnerService) { }

  ngOnInit(): void {
    this.loadFeedbacks();
    this.initForm();
    this.loadCustomer();

  }

  initForm(): void {
    this.form = new FormGroup({
      content: new FormControl('', Validators.required),
      customer_id: new FormControl('', Validators.required),
    });
  }

  //* Hàm load toàn bộ dữ liệu ra giao diện
  loadFeedbacks(): void {
    this.feedbackService.getAllFeedbacks().subscribe(feedbacks => {
      this.feedbacks = feedbacks;
    });
  }
  loadCustomer(): void {
    this.customerService.getAllCustomers().subscribe(customer => {
      this.customerData = customer;
    });
  }


  getCustomerNameById(customerId: number): string {
    const customer = this.customerData.find(c => c.id === customerId);
    return customer ? customer.name : 'Unknown Customer';
  }
  //* Hàm xử lý thêm mới hoặc cập nhật đánh giá
  addFeedback(): void {
    if (!this.form.valid) {
      this.toastrService.danger('Vui lòng nhập đủ dữ liệu và kiểm tra lại các trường!', 'Error');
      return;
    }

    let feedbackData: IFeedback = {
      content: this.form.get('content').value,
    };

    if (this.isEditing && !this.isAddingNewFeedback) {
      // Nếu đang trong chế độ sửa, cập nhật thông tin cho đánh giá được chọn
      const feedbackId = this.newFeedback.id;
      this.feedbackService.updateFeedback(feedbackId, feedbackData).subscribe(
        () => {
          this.toastrService.success('Cập nhật thành công!', 'Success');
          this.isEditing = false;
          this.loadFeedbacks();
        },
        error => {
          this.toastrService.danger('Đã xảy ra lỗi khi cập nhật đánh giá!', 'Error');
          console.error('Error updating feedback:', error);
        }
      );
    } else {
      // Nếu không đang trong chế độ sửa, thêm đánh giá mới vào danh sách
      this.feedbackService.addFeedback(feedbackData).subscribe(
        () => {
          this.toastrService.success('Thêm mới thành công!', 'Success');
          this.loadFeedbacks();
        },
        error => {
          this.toastrService.danger('Đã xảy ra lỗi khi thêm đánh giá!', 'Error');
          console.error('Error adding feedback:', error);
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
        create_date: this.newFeedback.create_date,
        customer_id: this.newFeedback.customer_id,
      });
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

  //* Hàm reset lại form
  Reset(): void {
    this.isEditing = false;
    this.isAddingNewFeedback = true; // Chuyển về trạng thái thêm mới
    this.form.reset();
    this.toastrService.success('Dữ liệu trên form đã được reset!', 'Thành công');
  }

  scrollFormIntoView(): void {
    if (this.formElement) {
      this.formElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
