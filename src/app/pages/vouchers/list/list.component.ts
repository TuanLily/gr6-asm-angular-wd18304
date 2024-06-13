import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

import { IVoucher } from 'app/@core/interfaces/vouchers.interface';
import { VoucherService } from 'app/@core/services/apis/voucher.service';
import { SpinnerService } from '../../../@theme/components/spinner/spinner.service';
import { API_BASE_URL, API_ENDPOINT } from 'app/@core/config/api-endpoint.config';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild('formElement') formElement: ElementRef;

  form: FormGroup;
  newVoucher: IVoucher = { voucher_code: '', discount_rate: 0, valid_from: '', valid_to: '', description: '' };

  // Biến để xác định trạng thái hiện tại: true = đang thêm mới, false = đang sửa
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
    this.themeService.onThemeChange()
      .subscribe(theme => {
        this.currentTheme = theme.name;
      });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const currentPage = params['page'] || 1;
      this.loadVouchers(currentPage);
    });

    this.form = new FormGroup({
      voucher_code: new FormControl('', Validators.required),
      discount_rate: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]), // Thêm Validators.max(100) ở đây
      valid_from: new FormControl('', Validators.required),
      valid_to: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  // *Định dạng ngày
  formatDate(value: string): string {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  // *Hàm load toàn bộ dữ liệu ra giao diện (bao gồm chức năng phân trang và tìm kiếm voucher theo từ khóa)
  loadVouchers(page: number): void {
    this.spinner.show();

    this.voucherService.getAllVouchers(page, this.searchQuery).subscribe(data => {
      this.spinner.hide();
      this.vouchers = data.vouchers;
      this.currentPage = data.currentPage;
      this.totalPages = data.totalPages;

      const queryParams: any = { page: page };

      // Nếu có từ khóa tìm kiếm, thêm ?search vào đường dẫn Url
      if (this.searchQuery && this.searchQuery.trim() !== '') {
        queryParams.search = this.searchQuery;
      }

      // Cập nhật tham số ?page và ?search lên URL nếu khác với giá trị trước đó
      this.router.navigate([], {
        queryParams: queryParams,
        replaceUrl: true
      });
    });
  }

  //* Hàm xử lý tìm kiếm voucher
  onSearch(): void {
    // Gọi hàm loadVouchers với trang hiện tại và từ khóa tìm kiếm
    this.loadVouchers(this.currentPage);
  }

  //* Hàm xử lý thêm mới hoặc cập nhật voucher
  addVoucher(): void {
    if (!this.form.valid) {
      this.toastrService.danger('Vui lòng nhập đủ dữ liệu và kiểm tra lại các trường!', 'Error');
      return;
    }

    let voucherData: IVoucher = {
      voucher_code: this.form.get('voucher_code').value,
      discount_rate: this.form.get('discount_rate').value,
      valid_from: this.form.get('valid_from').value,
      valid_to: this.form.get('valid_to').value,
      description: this.form.get('description').value
    };

    this.spinner.show();

    if (this.isEditing && !this.isAddingNewVoucher) {
      const voucherId = this.newVoucher.id;
      this.voucherService.updateVoucher(voucherId, voucherData).subscribe(
        () => {
          this.toastrService.success('Cập nhật thành công!', 'Success');
          this.isEditing = false;
          this.spinner.hide();
          this.loadVouchers(this.currentPage); // Cập nhật danh sách voucher sau khi chỉnh sửa
        },
        error => {
          this.toastrService.danger('Đã xảy ra lỗi khi cập nhật voucher!', 'Error');
          console.error('Error updating voucher:', error);
          this.spinner.hide();
        }
      );
    } else {
      this.voucherService.addVoucher(voucherData).subscribe(
        () => {
          this.toastrService.success('Thêm mới thành công!', 'Success');
          this.spinner.hide();
          this.loadVouchers(1); // Cập nhật danh sách voucher sau khi thêm mới
        },
        error => {
          this.toastrService.danger('Đã xảy ra lỗi khi thêm voucher!', 'Error');
          console.error('Error adding voucher:', error);
          this.spinner.hide();
        }
      );
    }

    this.form.reset();
  }

  //* Hàm xử lý dữ liệu đưa lên form đề cập nhật voucher
  editVoucher(voucherId: number): void {
    if (this.isEditing) {
      return;
    }

    const voucherIndex = this.vouchers.findIndex(voucher => voucher.id === voucherId);
    if (voucherIndex !== -1) {
      this.newVoucher = { ...this.vouchers[voucherIndex] };

      this.form.patchValue({
        voucher_code: this.newVoucher.voucher_code,
        discount_rate: this.newVoucher.discount_rate,
        valid_from: this.formatDate(this.newVoucher.valid_from),
        valid_to: this.formatDate(this.newVoucher.valid_to),
        description: this.newVoucher.description
      });
      this.isAddingNewVoucher = false;
      this.isEditing = true;
      this.toastrService.info('Sẵn sàng cập nhật!', 'Thông tin');
    }
    this.scrollFormIntoView();
  }

  //* Hàm xóa voucher
  deleteVoucher(voucherId: number): void {
    Swal.fire({
      title: 'Xác nhận xóa',
      text: 'Bạn có chắc chắn muốn xóa voucher này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy bỏ'
    }).then((result) => {
      if (result.isConfirmed) {
        this.voucherService.deleteVoucher(voucherId).subscribe(
          () => {
            const voucherIndex = this.vouchers.findIndex(voucher => voucher.id === voucherId);
            if (voucherIndex !== -1) {
              this.vouchers.splice(voucherIndex, 1);
              this.loadVouchers(this.currentPage);
              this.toastrService.success('Xóa thành công!', 'Success');
            }
          },
          error => {
            this.toastrService.danger('Đã xảy ra lỗi khi xóa voucher!', 'Error');
            console.error('Error deleting voucher:', error);
          }
        );
      }
    });
  }

  //* Hàm reset lại form
  resetForm(): void {
    this.isEditing = false;
    this.isAddingNewVoucher = false;
    this.form.reset();
    this.toastrService.success('Dữ liệu trên form đã được reset!', 'Thành công');
  }

  // *Hàm này thực hiện chức năng scroll trang khi click vào nút sửa voucher
  scrollFormIntoView() {
    if (this.formElement) {
      this.formElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  formatCurrency(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' đ';
  }
}
