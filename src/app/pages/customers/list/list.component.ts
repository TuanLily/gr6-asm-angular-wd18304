import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ICustomer } from 'app/@core/interfaces/customers.interface';
import { CustomerService } from 'app/@core/services/apis/customer.service';
import { SpinnerService } from 'app/@theme/components/spinner/spinner.service';
import { API_BASE_URL, API_ENDPOINT } from 'app/@core/config/api-endpoint.config';

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

  loadCustomers(page: number): void {
    this.spinner.show();
    this.customerService.getAllCustomers(page, this.searchQuery).subscribe(data => {
      this.spinner.hide();
      this.customers = data.customers;
      this.currentPage = data.currentPage;
      this.totalPages = data.totalPages;

      const queryParams: any = { page: page };
      if (this.searchQuery && this.searchQuery.trim() !== '') {
        queryParams.search = this.searchQuery;
      }
      this.router.navigate([], { queryParams: queryParams, replaceUrl: true });
    });
  }

  onSearch(): void {
    this.loadCustomers(this.currentPage);
  }

  addCustomer(): void {
    if (!this.form.valid) {
      this.toastrService.danger('Vui lòng nhập đủ dữ liệu và kiểm tra lại các trường!', 'Error');
      return;
    }

    const customerData: ICustomer = {
      name: this.form.get('name').value,
      username: this.form.get('username').value,
      email: this.form.get('email').value,
      tel: this.form.get('tel').value,
      address: this.form.get('address').value,
    };

    if (!this.isAddingNewCustomer) {
      this.customerService.updateCustomer(this.newCustomer.id,customerData).subscribe(() => {
        this.toastrService.success('Cập nhật thành công!', 'Success');
        this.isEditing = false;
        this.spinner.hide();
        this.loadCustomers(this.currentPage);
      }, error => {
        this.toastrService.danger('Đã xảy ra lỗi khi cập nhật khách hàng!', 'Error');
        this.spinner.hide();
      });
    } else {
      this.customerService.addCustomer(customerData).subscribe(() => {
        this.toastrService.success('Thêm mới thành công!', 'Success');
        this.spinner.hide();
        this.loadCustomers(1);
      }, error => {
        this.toastrService.danger('Đã xảy ra lỗi khi thêm khách hàng!', 'Error');
        this.spinner.hide();
      });
    }

    this.form.reset();
  }

  editCustomer(customerId: number): void {
    if (this.isEditing) return;

    const customerIndex = this.customers.findIndex(customer => customer.id === customerId);
    if (customerIndex !== -1) {
      this.newCustomer = { ...this.customers[customerIndex] };
      this.form.patchValue(this.newCustomer);
      this.isAddingNewCustomer = false;
      this.isEditing = true;
    }
    this.scrollFormIntoView();
  }

  deleteCustomer(customerId: number): void {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy bỏ',
    }).then(result => {
      if (result.isConfirmed) {
        this.customerService.deleteCustomer(customerId).subscribe(() => {
          const customerIndex = this.customers.findIndex(customer => customer.id === customerId);
          if (customerIndex !== -1) {
            this.customers.splice(customerIndex, 1);
            this.loadCustomers(this.currentPage);
            this.toastrService.success('Xóa thành công!', 'Success');
          }
        }, error => {
          this.toastrService.danger('Đã xảy ra lỗi khi xóa khách hàng!', 'Error');
        });
      }
    });
  }

 //* Hàm reset lại form
  Reset(): void {
        this.isEditing = false;
        this.isAddingNewCustomer = true; // Chuyển về trạng thái thêm mới
        this.form.reset();
        this.form.get('customer_id')?.enable();
        this.toastrService.success('Dữ liệu trên form đã được reset!', 'Thành công');
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
