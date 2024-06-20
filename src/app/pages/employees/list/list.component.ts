import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

import { IEmployee } from 'app/@core/interfaces/employees.interface';
import { SpinnerService } from "../../../@theme/components/spinner/spinner.service";
import { EmployeeService } from 'app/@core/services/apis/employee.service';
import { API_BASE_URL, API_ENDPOINT } from 'app/@core/config/api-endpoint.config';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild('formElement') formElement: ElementRef;
  form: FormGroup;
  newEmployee: any = { name: '', username: '', phone: '', email: '', address: '', password: '', salary: '' };

  // Biến để xác định trạng thái hiện tại: true = đang thêm mới, false = đang sửa
  isAddingNewEmployee: boolean = true;
  isEditing: boolean = false;

  employees: IEmployee[] = [];

  apiUrl = API_BASE_URL + API_ENDPOINT.employees;
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
    private employeeService: EmployeeService,
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
      const currencyPage = params['page'] || 1;
      this.loadEmployees(currencyPage);
    })

    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(11),
      this.phoneValidator, this.phoneRegex]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      salary: new FormControl('', [Validators.required, Validators.min(0)])
    });
  }


  scrollFormIntoView() {
    if (this.formElement) {
      this.formElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Bắt lỗi phone không phải là số
  phoneValidator(control: FormControl) {
    const isValid = /^[0-9]*$/.test(control.value);
    return isValid ? null : { invalidPhone: true };
  }

  phoneRegex(control: FormControl) {
    const phoneRegex = /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/
    const valid = phoneRegex.test(control.value);
    return valid ? null : { validPhone: true };
  }


  // Bắt phone đang gặp lỗi nào
  getPhoneErrorMessage() {
    const phoneControl = this.form.get('phone');
    if (phoneControl?.hasError('required')) {
      return 'Vui lòng nhập số điện thoại';
    } else if (phoneControl?.hasError('invalidPhone')) {
      return 'Số điện thoại phải là số';
    } else if (phoneControl?.hasError('maxlength')) {
      return 'Số điện thoại không lớn hơn 11 số';
    } else if (phoneControl?.hasError('minlength')) {
      return 'Số điện thoại không ít hơn 10 số';
    } else if (phoneControl?.hasError('validPhone')) {
      return 'Số điện thoại không phải định dạng số VN'
    }
    return null;
  }

  // *Định dạng tiền tệ
  formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  }

  //* Hàm load toàn bộ dữ liệu ra giao diện
  loadEmployees(page: number): void {
    this.spinner.show();


    this.employeeService.getAllEmployees(page, this.searchQuery).subscribe(data => {
      this.spinner.hide();
      this.employees = data.employees;
      this.currentPage = data.currentPage;
      this.totalPages = data.totalPages;

      this.employees = data.employees.filter(employee => employee.status === 1);

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

  //* Hàm xử lý tìm kiếm
  onSearch(): void {
    // Gọi hàm loadEmployees với trang hiện tại và từ khóa tìm kiếm
    this.loadEmployees(this.currentPage);
  }

  //* Hàm xử lý thêm mới hoặc cập nhật sản phẩm
  addEmployee(): void {
    if (!this.form.valid) {
      this.toastrService.danger('Vui lòng nhập đủ dữ liệu và kiểm tra lại các trường!', 'Error');
      return;
    }
    let employeeData: IEmployee;
    const usernameValue = this.form.get('username').value;
    const phoneValue = this.form.get('phone').value;
    const emailValue = this.form.get('email').value;
    const addressValue = this.form.get('address').value;
    const passwordValue = this.form.get('password').value;
    const salaryValue = this.form.get('salary').value;

    if (this.isEditing && !this.isAddingNewEmployee && !usernameValue && !phoneValue && !emailValue && !addressValue && !passwordValue && !salaryValue) {
      // Nếu là chế độ sửa và không có giá trị mới được nhập, sử dụng lại giá trị cũ
      employeeData = {
        name: this.form.get('name').value,
        username: this.form.get('username').value,
        phone: this.form.get('phone').value,
        email: this.form.get('email').value,
        address: this.form.get('address').value,
        password: this.form.get('password').value,
        salary: this.form.get('salary').value
      };
    } else {
      // Sử dụng giá trị mới nếu có hoặc nếu không ở chế độ thêm mới
      employeeData = {
        name: this.form.get('name').value,
        username: usernameValue,
        phone: phoneValue,
        email: emailValue,
        address: addressValue,
        password: passwordValue,
        salary: salaryValue
      };
    }

    if (this.isEditing === true && !this.isAddingNewEmployee) {
      // Nếu đang trong chế độ sửa, cập nhật thông tin cho nhân viên được chọn
      const employeeId = this.newEmployee.id;
      this.employeeService.updateEmployee(employeeId, employeeData).subscribe(
        () => {
          this.toastrService.success('Cập nhật thành công!', 'Success');
          this.isEditing = false;
          this.spinner.hide();
          this.loadEmployees(this.currentPage);
        },
        error => {
          this.toastrService.danger('Đã xảy ra lỗi khi cập nhật nhân viên!', 'Error');
          console.error('Error updating employee:', error);
          this.spinner.hide();
        }
      );
    } else {
      // Nếu không đang trong chế độ sửa, thêm nhân viên mới vào danh sách
      this.employeeService.addEmployee(employeeData).subscribe(
        () => {
          this.toastrService.success('Thêm mới thành công!', 'Success');
          this.spinner.hide();
          this.loadEmployees(1);
        },
        error => {
          this.toastrService.danger('Đã xảy ra lỗi khi thêm nhân viên!', 'Error');
          console.error('Error adding employee:', error);
          this.spinner.hide();
        }
      );
    }
    this.form.reset();
  }

  //* Hàm xử lý dữ liệu đưa lên form đề cập nhật sản phẩm
  editEmployee(employeeId: number): void {
    if (this.isEditing) {
        return;
    }

    const employeeIndex = this.employees.findIndex(employee => employee.id === employeeId);
    if (employeeIndex !== -1) {
        this.newEmployee = { ...this.employees[employeeIndex] };

        // Lưu mật khẩu ban đầu
        const storedPassword = this.newEmployee.password;

        this.form.patchValue({
            name: this.newEmployee.name,
            phone: this.newEmployee.phone,
            email: this.newEmployee.email,
            address: this.newEmployee.address,
            salary: this.newEmployee.salary,
        });
        
        this.isAddingNewEmployee = false;
        this.isEditing = true;
        
        // Disable trường password để không thể thay đổi
        this.form.get('password').disable();

        // Hiển thị thông báo
        this.toastrService.info('Sẵn sàng cập nhật!', 'Thông tin');

        // Thêm xử lý khi cập nhật
        this.form.valueChanges.subscribe((values) => {
            if (values.password && values.password !== storedPassword) {
                // Nếu mật khẩu mới khác với mật khẩu ban đầu, giữ nguyên mật khẩu ban đầu
                this.form.patchValue({ password: storedPassword }, { emitEvent: true });
            }
        });
    }
    this.scrollFormIntoView();
}


  deleteEmployee(employeeId: number): void {
    Swal.fire({
      title: 'Xác nhận xóa',
      text: 'Bạn có chắc chắn muốn xóa nhân viên này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy bỏ'
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.deleteEmployee(employeeId).subscribe(
          () => {
            const employeeIndex = this.employees.findIndex(employee => employee.id === employeeId);
            if (employeeIndex !== -1) {
              this.employees.splice(employeeIndex, 1);
              this.loadEmployees(this.currentPage)
              this.toastrService.success('Xóa thành công!', 'Success');
            }
          },
          error => {
            this.toastrService.danger('Đã xảy ra lỗi khi xóa nhân viên!', 'Error');
            console.error('Error deleting employee:', error);
          }
        );
      }
    });
  }

  //* Hàm reset lại form
  Reset(): void {
    this.isEditing = false;
    this.isAddingNewEmployee = false;
    this.form.reset();
    this.form.get('password').enable();
    this.toastrService.success('Dữ liệu trên form đã được reset!', 'Thành công');
  }
}
