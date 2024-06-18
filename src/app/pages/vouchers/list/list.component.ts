import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import Swal from 'sweetalert2';
import { IVoucher } from 'app/@core/interfaces/vouchers.interface';
import { VoucherService } from 'app/@core/services/apis/voucher.service';
import { SpinnerService } from '../../../@theme/components/spinner/spinner.service';
import {
  API_BASE_URL,
  API_ENDPOINT,
} from 'app/@core/config/api-endpoint.config';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @ViewChild('formElement') formElement: ElementRef;

  form: FormGroup;
  newVoucher: IVoucher = {
    voucher_code: '',
    discount_rate: 0,
    valid_from: '',
    valid_to: '',
    description: '',
  };

  isAddingNewVoucher: boolean = true;
  isEditing: boolean = false;

  vouchers: IVoucher[] = [];
  apiUrl = API_BASE_URL + API_ENDPOINT.vouchers;
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
    private voucherService: VoucherService,
    private themeService: NbThemeService,
    private spinner: SpinnerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.themeService.onThemeChange().subscribe((theme) => {
      this.currentTheme = theme.name;
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const currentPage = params['page'] || 1;
      this.loadVouchers(currentPage);
    });

    this.form = new FormGroup({
      voucher_code: new FormControl('', Validators.required),
      discount_rate: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
      valid_from: new FormControl('', [Validators.required, this.dateRangeValidator]),
      valid_to: new FormControl('', [
        Validators.required,
        this.validateEndDate.bind(this),
      ]),
      description: new FormControl(''),
    });
  }

  minValidDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  formatDate(value: string): string {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  dateRangeValidator(control: FormControl): ValidationErrors | null {
    const formGroup = control.parent;
    if (!formGroup) return null;

    const validFrom = formGroup.get('valid_from').value;
    const validTo = formGroup.get('valid_to').value;

    if (validFrom && validTo && new Date(validFrom) > new Date(validTo)) {
      return { dateRangeInvalid: true };
    }
    return null;
  }
  
  loadVouchers(page: number): void {
    this.spinner.show();
    this.voucherService
      .getAllVouchers(page, this.searchQuery)
      .subscribe((data) => {
        this.spinner.hide();
        this.vouchers = data.vouchers;
        this.currentPage = data.currentPage;
        this.totalPages = data.totalPages;

        const queryParams: any = { page: page };
        if (this.searchQuery && this.searchQuery.trim() !== '') {
          queryParams.search = this.searchQuery;
        }

        this.router.navigate([], {
          queryParams: queryParams,
          replaceUrl: true,
        });
      });
  }

  onSearch(): void {
    this.loadVouchers(this.currentPage);
  }

  addVoucher(): void {
    if (!this.form.valid) {
      this.toastrService.danger(
        'Vui lòng nhập đủ dữ liệu và kiểm tra lại các trường!',
        'Error'
      );
      return;
    }

    const voucherCode = this.form.get('voucher_code').value;

    this.voucherService.checkDuplicateVoucherCode(voucherCode).subscribe(
      (response) => {
        if (
          response.exists &&
          (this.isAddingNewVoucher ||
            (this.isEditing && voucherCode !== this.newVoucher.voucher_code))
        ) {
          this.form.get('voucher_code').setErrors({ duplicate: true });
          return;
        }

        let voucherData: IVoucher = {
          voucher_code: voucherCode,
          discount_rate: this.form.get('discount_rate').value,
          valid_from: this.form.get('valid_from').value,
          valid_to: this.form.get('valid_to').value,
          description: this.form.get('description').value,
        };

        this.spinner.show();

        if (this.isEditing && !this.isAddingNewVoucher) {
          const voucherId = this.newVoucher.id;
          this.voucherService.updateVoucher(voucherId, voucherData).subscribe(
            () => {
              this.toastrService.success('Cập nhật thành công!', 'Success');
              this.isEditing = false;
              this.spinner.hide();
              this.loadVouchers(this.currentPage);
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
              this.loadVouchers(1);
            },
            (error) => {
              this.toastrService.danger(
                'Đã xảy ra lỗi khi thêm voucher!',
                'Error'
              );
              console.error('Error adding voucher:', error);
              this.spinner.hide();
            }
          );
        }

        this.form.reset();
      },
      (error) => {
        this.toastrService.danger(
          'Đã xảy ra lỗi khi kiểm tra mã voucher!',
          'Error'
        );
        console.error('Error checking duplicate voucher:', error);
      }
    );
  }

  editVoucher(voucherId: number): void {
    if (this.isEditing) {
      return;
    }

    const voucherIndex = this.vouchers.findIndex(
      (voucher) => voucher.id === voucherId
    );
    if (voucherIndex !== -1) {
      this.newVoucher = { ...this.vouchers[voucherIndex] };

      this.form.patchValue({
        voucher_code: this.newVoucher.voucher_code,
        discount_rate: this.newVoucher.discount_rate,
        valid_from: this.formatDate(this.newVoucher.valid_from),
        valid_to: this.formatDate(this.newVoucher.valid_to),
        description: this.newVoucher.description,
      });
      this.isAddingNewVoucher = false;
      this.isEditing = true;
      this.toastrService.info('Sẵn sàng cập nhật!', 'Thông tin');
    }
    this.scrollFormIntoView();
  }

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
              this.loadVouchers(this.currentPage);
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

  resetForm(): void {
    this.isEditing = false;
    this.isAddingNewVoucher = false;
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

  formatCurrency(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ';
  }

  validateEndDate(control: FormControl): { [s: string]: boolean } {
    if (control.value) {
      const today = new Date();
      const endDate = new Date(control.value);
      if (endDate < today) {
        return { invalidDate: true };
      }
    }
    return null;
  }
}
