import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { IVoucher } from 'app/@core/interfaces/vouchers.interface';
import { VoucherService } from 'app/@core/services/apis/voucher.service';
import { SpinnerService } from '../../../@theme/components/spinner/spinner.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @ViewChild('formElement') formElement: ElementRef;
  form: FormGroup;
  newVoucher: any = {
    voucher_code: '',
    discount_rate: '',
    valid_from: '',
    valid_to: '',
    description: '',
  };

  // Biến để xác định trạng thái hiFện tại: true = đang thêm mới, false = đang sửa
  isAddingNewVoucher: boolean = true;
  isEditing: boolean = false;

  vouchers: IVoucher[] = [];

  constructor(
    private toastrService: NbToastrService,
    private voucherService: VoucherService,
    private spinner: SpinnerService
  ) {}

  ngOnInit(): void {
    this.loadVouchers();
    this.form = new FormGroup({
      voucher_code: new FormControl('', Validators.required),
      discount_rate: new FormControl('', [
        Validators.required,
        Validators.min(0),
      ]),
      valid_from: new FormControl('', Validators.required),
      valid_to: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  //* Hàm load toàn bộ dự liệu ra giao diện
  loadVouchers(): void {
    this.voucherService.getAllVouchers().subscribe(
      (vouchers) => {
        console.log('Dữ liệu trả về từ API:', vouchers); // Thêm dòng này
        this.vouchers = vouchers;
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu vouchers:', error);
      }
    );
  }

  //* Hàm xử lý thêm mới hoặc cập nhật voucher
  addVoucher(): void {
    if (!this.form.valid) {
      this.toastrService.danger(
        'Vui lòng nhập đủ dữ liệu và kiểm tra lại các trường!',
        'Error'
      );
      return;
    }

    const voucher_code = this.form.get('voucher_code').value;
    const discount_rate = this.form.get('discount_rate').value;
    const valid_from = this.form.get('valid_from').value;
    const valid_to = this.form.get('valid_to').value;
    const description = this.form.get('description').value;

    let voucherData: IVoucher = {
      voucher_code: voucher_code,
      discount_rate: discount_rate,
      valid_from: valid_from,
      valid_to: valid_to,
      description: description,
    };

    this.spinner.show();

    if (this.isEditing && !this.isAddingNewVoucher) {
      const voucherId = this.newVoucher.id;
      this.voucherService.updateVoucher(voucherId, voucherData).subscribe(
        () => {
          this.toastrService.success('Cập nhật thành công!', 'Success');
          this.isEditing = false;
          this.spinner.hide();
          this.loadVouchers();
        },
        (error) => {
          this.toastrService.danger(
            'Đã xảy ra lỗi khi cập nhật voucher!',
            'Error'
          );
          console.error('Error updating voucher:', error);
          this.spinner.hide();
        }
      );
    } else {
      this.voucherService.addVoucher(voucherData).subscribe(
        () => {
          this.toastrService.success('Thêm mới thành công!', 'Success');
          this.spinner.hide();
          this.loadVouchers();
        },
        (error) => {
          this.toastrService.danger('Đã xảy ra lỗi khi thêm voucher!', 'Error');
          console.error('Error adding voucher:', error);
          this.spinner.hide();
        }
      );
    }
    this.form.reset();
  }

  //* Hàm xử lý dữ liệu đưa lên form để cập nhật voucher
  editVoucher(voucherId: number): void {
    if (this.isEditing) {
      return;
    }

    const voucherIndex = this.vouchers.findIndex(
      (voucher) => voucher.id === voucherId
    );
    if (voucherIndex !== -1) {
      this.newVoucher = { ...this.vouchers[voucherIndex] };

      const validFrom = this.formatDate(this.newVoucher.valid_from);
      const validTo = this.formatDate(this.newVoucher.valid_to);

      this.form.patchValue({
        voucher_code: this.newVoucher.voucher_code,
        discount_rate: this.newVoucher.discount_rate,
        valid_from: validFrom,
        valid_to: validTo,
        description: this.newVoucher.description,
      });
      this.isAddingNewVoucher = false;
      this.isEditing = true;
      this.toastrService.info('Sẵn sàng cập nhật!', 'Thông tin');
    }
    this.scrollFormIntoView();
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  //* Hàm xóa voucher
  deleteVoucher(voucherId: number): void {
    Swal.fire({
      title: 'Xác nhận xóa',
      text: 'Bạn có chắc chắn muốn xóa voucher này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy bỏ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.voucherService.deleteVoucher(voucherId).subscribe(
          () => {
            const voucherIndex = this.vouchers.findIndex(
              (voucher) => voucher.id === voucherId
            );
            if (voucherIndex !== -1) {
              this.vouchers.splice(voucherIndex, 1);
              this.toastrService.success('Xóa thành công!', 'Success');
            }
          },
          (error) => {
            this.toastrService.danger(
              'Đã xảy ra lỗi khi xóa voucher!',
              'Error'
            );
            console.error('Error deleting voucher:', error);
          }
        );
      }
    });
  }

  //* Hàm reset lại form
  resetForm(): void {
    this.isEditing = false;
    this.isAddingNewVoucher = true;
    this.form.reset();
    this.toastrService.success(
      'Dữ liệu trên form đã được reset!',
      'Thành công'
    );
  }

  scrollFormIntoView() {
    if (this.formElement) {
      this.formElement.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }
}
