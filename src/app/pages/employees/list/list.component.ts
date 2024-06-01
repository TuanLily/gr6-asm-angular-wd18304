import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IEmployee } from 'app/@core/interfaces/employees.interface';
import { SpinnerService } from "../../../@theme/components/spinner/spinner.service";
import { EmployeeService } from 'app/@core/services/apis/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild('formElement') formElement: ElementRef;
  form: FormGroup;
  newEmployee: any = { name: '', username: '', phone: '', email: '', address: '', password: '',  salary: '' };

  // Biến để xác định trạng thái hiện tại: true = đang thêm mới, false = đang sửa
  isAddingNewEmployee: boolean = true;
  isEditing: boolean = false;

  employees: IEmployee[] = [];

  constructor(private toastrService: NbToastrService, private employeeService: EmployeeService, private spinner: SpinnerService) { }

  ngOnInit(): void {
    this.loadEmployees();

      this.form = new FormGroup({
        name: new FormControl('', Validators.required),
        username: new FormControl('', Validators.required),
        phone: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        address: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        salary: new FormControl('', [Validators.required])
      });
  }
  
  scrollFormIntoView(){
    if(this.formElement){
      this.formElement.nativeElement.scrollIntoView({ behavior: 'smooth' , block: 'start'});
    }
  }

  // *Định dạng tiền tệ
  formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  }

  //* Hàm load toàn bộ dữ liệu ra giao diện
  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(employees => {
      this.employees = employees;
    });
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
          this.loadEmployees();
        },
        error => {
          this.toastrService.danger('Đã xảy ra lỗi khi cập nhật nhân viên!', 'Error');
          console.error('Error updating employee:', error);
        }
      );
    } else {
      // Nếu không đang trong chế độ sửa, thêm nhân viên mới vào danh sách
      this.employeeService.addEmployee(employeeData).subscribe(
        () => {
          this.toastrService.success('Thêm mới thành công!', 'Success');
          this.spinner.hide();
          this.loadEmployees();
        },
        error => {
          this.toastrService.danger('Đã xảy ra lỗi khi thêm nhân viên!', 'Error');
          console.error('Error adding employee:', error);
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

      this.form.patchValue({
        name: this.newEmployee.name,
        phone: this.newEmployee.phone,
        email: this.newEmployee.email,
        address: this.newEmployee.address,
        password: this.newEmployee.password,
        salary: this.newEmployee.salary,
      });
      this.isAddingNewEmployee = false;
      this.isEditing = true;
      this.toastrService.info('Sẵn sàng cập nhật!', 'Thông tin');
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
    this.toastrService.success('Dữ liệu trên form đã được reset!', 'Thành công');
  }
}
