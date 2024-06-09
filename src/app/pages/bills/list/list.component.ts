import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

import { IBill } from 'app/@core/interfaces/bills.interface';
import { BillService } from 'app/@core/services/apis/bill.service';
import { SpinnerService } from 'app/@theme/components/spinner/spinner.service';
import { API_BASE_URL, API_ENDPOINT } from 'app/@core/config/api-endpoint.config';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild('formElement') formElement: ElementRef;

  form: FormGroup;
  newBill: IBill = { product_id: '', qty: 0, total: 0, customer_name: '', employee_id: '', voucher_id: '' };

  isAddingNewBill: boolean = true;
  isEditing: boolean = false;

  bills: IBill[] = [];
  products: any[] = [];
  employees: any[] = [];

  apiUrl = API_BASE_URL + API_ENDPOINT.bills;
  currentPage: number = 1;
  totalPages: number;
  searchQuery: string = '';

  constructor(
    private toastrService: NbToastrService,
    private billService: BillService,
    private spinner: SpinnerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const currentPage = params['page'] || 1;
      this.loadBills(currentPage);
    });

    this.form = new FormGroup({
      product_id: new FormControl('', Validators.required),
      qty: new FormControl('', [Validators.required, Validators.min(1)]),
      total: new FormControl('', Validators.required),
      customer_name: new FormControl('', Validators.required),
      employee_id: new FormControl('', Validators.required),
      voucher_id: new FormControl('')
    });

    this.loadProducts();
    this.loadEmployees();
  }

  loadProducts(): void {
    this.billService.getAllProducts().subscribe(
      (data: any) => {
        console.log(data);
        this.products = data.products;

        // if (Array.isArray(data)) {
        //   this.products = data;
        // } else if (data && data.products) {
        //   this.products = data.products;
        // } else {
        //   this.products = [];
        // }
      },
      error => {
        console.error('Error loading products:', error);
        this.toastrService.danger('Đã xảy ra lỗi khi tải sản phẩm!', 'Error');
      }
    );
  }



  loadEmployees(): void {
    this.billService.getAllEmployees().subscribe(
      (data: any) => {
        console.log(data);

        this.employees = data.employees;
      },
      error => {
        console.error('Error loading employees:', error);
        this.toastrService.danger('Đã xảy ra lỗi khi tải nhân viên!', 'Error');
      }
    );
  }

  loadBills(page: number): void {
    this.spinner.show();

    this.billService.getAllBills(page, this.searchQuery).subscribe(data => {
      this.spinner.hide();
      this.bills = data.bills;
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
    },
    error => {
      this.spinner.hide();
      console.error('Error loading bills:', error);
      this.toastrService.danger('Đã xảy ra lỗi khi tải hóa đơn!', 'Error');
    });
  }

  onSearch(): void {
    this.loadBills(this.currentPage);
  }

  addBill(): void {
    if (!this.form.valid) {
      this.toastrService.danger('Vui lòng nhập đủ dữ liệu và kiểm tra lại các trường!', 'Error');
      return;
    }

    let billData: IBill = {
      product_id: this.form.get('product_id').value,
      qty: this.form.get('qty').value,
      total: this.form.get('total').value,
      customer_name: this.form.get('customer_name').value,
      employee_id: this.form.get('employee_id').value,
      voucher_id: this.form.get('voucher_id').value
    };

    this.spinner.show();

    if (this.isEditing && !this.isAddingNewBill) {
      const billId = this.newBill.id;
      this.billService.updateBill(billId, billData).subscribe(
        () => {
          this.toastrService.success('Cập nhật thành công!', 'Success');
          this.isEditing = false;
          this.spinner.hide();
          this.loadBills(this.currentPage);
        },
        error => {
          this.toastrService.danger('Đã xảy ra lỗi khi cập nhật bill!', 'Error');
          console.error('Error updating bill:', error);
          this.spinner.hide();
        }
      );
    } else {
      this.billService.addBill(billData).subscribe(
        () => {
          this.toastrService.success('Thêm mới thành công!', 'Success');
          this.spinner.hide();
          this.loadBills(1);
        },
        error => {
          this.toastrService.danger('Đã xảy ra lỗi khi thêm bill!', 'Error');
          console.error('Error adding bill:', error);
          this.spinner.hide();
        }
      );
    }

    this.form.reset();
  }

  editBill(billId: number): void {
    if (this.isEditing) {
      return;
    }

    const billIndex = this.bills.findIndex(bill => bill.id === billId);
    if (billIndex !== -1) {
      this.newBill = { ...this.bills[billIndex] };

      this.form.patchValue({
        product_id: this.newBill.product_id,
        qty: this.newBill.qty,
        total: this.newBill.total,
        customer_name: this.newBill.customer_name,
        employee_id: this.newBill.employee_id,
        voucher_id: this.newBill.voucher_id
      });
      this.isAddingNewBill = false;
      this.isEditing = true;
      this.toastrService.info('Sẵn sàng cập nhật', 'Thông tin');
    }
    this.scrollFormIntoView();
  }

  deleteBill(billId: number): void {
    Swal.fire({
      title: 'Xác nhận xóa',
      text: 'Bạn có chắc chắn muốn xóa bill này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy bỏ'
    }).then((result) => {
      if (result.isConfirmed) {
        this.billService.deleteBill(billId).subscribe(
          () => {
            const billIndex = this.bills.findIndex(bill => bill.id === billId);
            if (billIndex !== -1) {
              this.bills.splice(billIndex, 1);
              this.loadBills(this.currentPage);
              this.toastrService.success('Xóa thành công!', 'Success');
            }
          },
          error => {
            this.toastrService.danger('Đã xảy ra lỗi khi xóa bill!', 'Error');
            console.error('Error deleting bill:', error);
          }
        );
      }
    });
  }

  resetForm(): void {
    this.isEditing = false;
    this.isAddingNewBill = false;
    this.form.reset();
    this.toastrService.success('Dữ liệu trên form đã được reset!', 'Thành công');
  }

  getEmployeeName(employeeId: string): string {
    const employee = this.employees.find(emp => emp.id === employeeId);
    return employee ? employee.name : 'Unknown';
  }

  getProductName(productId: string): any {
    return this.products.find(product => product.id === productId);
  }

  // *Hàm này thực hiện chức năng scroll trang khi click vào nút sửa voucher
  scrollFormIntoView() {
    if (this.formElement) {
      this.formElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
