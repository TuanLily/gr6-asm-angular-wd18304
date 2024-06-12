import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatorModule } from 'app/@theme/components/paginator/paginator.module';
import Swal from 'sweetalert2';
import { ICustomer } from 'app/@core/interfaces/customers.interface';
import { CustomerService } from 'app/@core/services/apis/customer.service';
import { SpinnerService } from '../../../@theme/components/spinner/spinner.service';
import { API_BASE_URL, API_ENDPOINT, } from 'app/@core/config/api-endpoint.config';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @ViewChild('formElement') formElement: ElementRef;

  form: FormGroup;
  newCustomer: ICustomer = {
    name: '',
    username: '',
    tel: '',
    email: '',
    address: '',
  };

  // Biến để xác định trạng thái hiện tại: true = đang thêm mới, false = đang sửa
  isAddingNewCustomer: boolean = true;
  isEditing: boolean = false;

  customers: ICustomer[] = [];

  apiUrl = API_BASE_URL + API_ENDPOINT.customers;
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
    private customerService: CustomerService,
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
      this.loadCustomers(currentPage);
    });


    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      username: new FormControl('', [Validators.required, Validators.minLength(6)]),
      tel: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(11),
        this.numericValidator
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', Validators.required),
    });
  }


  numericValidator(control: FormControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (value && !/^[0-9]*$/.test(value)) {
      return { 'numeric': true };
    }
    return null;
  }



  //* Hàm load toàn bộ dự liệu ra giao diện
  loadCustomers(page: number): void {
    this.spinner.show();

    this.customerService.getAllCustomers(page, this.searchQuery).subscribe((data) => {


      this.spinner.hide();
      this.customers = data.customers;
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

  //* Hàm xử lý tìm kiếm sản phẩm
  onSearch(): void {
    // Gọi hàm loadCustomers với trang hiện tại và từ khóa tìm kiếm
    this.loadCustomers(this.currentPage);
  }

  //* Hàm xử lý thêm mới hoặc cập nhật khách hàng
  addCustomer(): void {
    if (!this.form.valid) {
      this.toastrService.danger('Vui lòng nhập đủ dữ liệu và kiểm tra lại các trường!',
        'Error'
      );
      return;
    }

    // Kiểm tra xem giá sale có lớn hơn hoặc bằng giá gốc không

    let customerData: ICustomer;

    customerData = {
      name: this.form.get('name').value,
      username: this.form.get('username').value,
      email: this.form.get('email').value,
      tel: this.form.get('tel').value,
      address: this.form.get('address').value,
    };

    if (this.isEditing === true && !this.isAddingNewCustomer) {
      // Nếu đang trong chế độ sửa, cập nhật thông tin cho khách hàng được chọn
      const customerId = this.newCustomer.id;
      this.customerService.updateCustomer(customerId, customerData).subscribe(
        () => {
          this.toastrService.success('Cập nhật thành công!', 'Success');
          this.isEditing = false;
          this.spinner.hide();
          this.loadCustomers(this.currentPage);
        },
        (error) => {
          this.toastrService.danger(
            'Đã xảy ra lỗi khi cập nhật khách hàng!',
            'Error'
          );
          console.error('Error updating customer:', error);
          this.spinner.hide();
        }
      );
    } else {
      // Nếu không đang trong chế độ sửa, thêm khách hàng mới vào danh sách
      this.customerService.addCustomer(customerData).subscribe(
        () => {
          this.toastrService.success('Thêm mới thành công!', 'Success');
          this.spinner.hide();
          this.loadCustomers(1);
        },
        (error) => {
          this.toastrService.danger(
            'Đã xảy ra lỗi khi thêm khách hàng!',
            'Error'
          );
          console.error('Error adding customer:', error);
          this.spinner.hide();
        }
      );
    }

    this.form.reset();
  }

  //* Hàm xử lý dữ liệu đưa lên form đề cập nhật khách hàng
  editCustomer(customerId: number): void {
    if (this.isEditing) {
      return;
    }

    const customerIndex = this.customers.findIndex(
      customer => customer.id === customerId
    );
    if (customerIndex !== -1) {
      this.newCustomer = { ...this.customers[customerIndex] };

      this.form.patchValue({
        name: this.newCustomer.name,
        username: this.newCustomer.username,
        email: this.newCustomer.email,
        tel: this.newCustomer.tel,
        address: this.newCustomer.address,
      });
      this.isAddingNewCustomer = false;
      this.isEditing = true;
      this.toastrService.info('Sẵn sàng cập nhật!', 'Thông tin');
    }
    this.scrollFormIntoView();
  }

  //* Hàm xóa khách hàng
  deleteCustomer(customerId: number): void {
    Swal.fire({
      title: 'Xác nhận xóa',
      text: 'Bạn có chắc chắn muốn xóa khách hàng này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy bỏ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerService.deleteCustomer(customerId).subscribe(
          () => {
            const customerIndex = this.customers.findIndex(
              (customer) => customer.id === customerId
            );
            if (customerIndex !== -1) {
              this.customers.splice(customerIndex, 1);
              this.loadCustomers(this.currentPage);
              this.toastrService.success('Xóa thành công!', 'Success');
            }
          },
          (error) => {
            this.toastrService.danger(
              'Đã xảy ra lỗi khi xóa khách hàng!',
              'Error'
            );
            console.error('Error deleting customer:', error);
          }
        );
      }
    });
  }

  //* Hàm reset lại form
  Reset(): void {
    this.isEditing = false;
    this.isAddingNewCustomer = false;
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
