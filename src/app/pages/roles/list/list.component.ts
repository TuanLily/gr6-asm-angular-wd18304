import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import Swal from 'sweetalert2';

import { IRole } from 'app/@core/interfaces/roles.interface';
import { RoleService } from 'app/@core/services/apis/roles.service';
import { SpinnerService } from "../../../@theme/components/spinner/spinner.service";
import { BehaviorSubject } from 'rxjs';
import { API_BASE_URL, API_ENDPOINT } from 'app/@core/config/api-endpoint.config';

@Component({
  selector: 'app-roles',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class listComponent {
  @ViewChild('formElement') formElement: ElementRef;

  form: FormGroup;
  newRole: any = { name: '', status: '' };

  // Biến để xác định trạng thái hiện tại: true = đang thêm mới, false = đang sửa
  isAddingNewRole: boolean = true;
  isEditing: boolean = false;

  apiUrl = API_BASE_URL + API_ENDPOINT.roles;
  currentPage: number = 1;
  totalPages: number;
  searchQuery: string = '';

  Roles: IRole[] = [];
 

  constructor(
    private toastrService: NbToastrService, 
    private RoleService: RoleService, 
    private spinner: SpinnerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      const currentPage = params['page'] || 1;
      this.loadRoles(currentPage);
    });
    
    this.form = new FormGroup({
        name: new FormControl('', Validators.required),
        status: new FormControl('')
      });
    

  }

  
  //* Hàm load toàn bộ dự liệu ra giao diện
  loadRoles(page: number): void {
    this.RoleService.getAllRoles(page, this.searchQuery).subscribe(data => {
      this.spinner.hide();
      this.Roles = data.roles;
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
  onSearch(): void {
    // Gọi hàm loadProducts với trang hiện tại và từ khóa tìm kiếm
    this.loadRoles(this.currentPage);
  }


  addRoles(): void {
    if (!this.form.valid) {
      this.toastrService.danger('Vui lòng nhập đủ dữ liệu và kiểm tra lại các trường!', 'Error');
      return;
    }
    let roleData: IRole;

    const name = this.form.get('name').value;
  let status = this.form.get('status').value;

  if (!status) {
    status = 0;
  }
    
    roleData = {
        name: name,
        status: status,
      };
      this.spinner.show
   
    if (this.isEditing === true && !this.isAddingNewRole) {
      // Nếu đang trong chế độ sửa, cập nhật thông tin cho danh mục được chọn
      const roleId = this.newRole.id;
      this.RoleService.updateRoles(roleId, roleData).subscribe(
        () => {
          this.toastrService.success('Cập nhật thành công!', 'Success');
          this.isEditing = false;
          this.spinner.hide();
          this.loadRoles(this.currentPage);
        },
        error => {
          this.toastrService.danger('Đã xảy ra lỗi khi cập nhật!', 'Error');
          console.error('Error updating Roles:', error);
          this.spinner.hide()
        }
      );
    } else {
      // Nếu không đang trong chế độ sửa, thêm danh mục mới vào danh sách
      this.RoleService.addRoles(roleData).subscribe(
        () => {
          this.toastrService.success('Thêm mới thành công!', 'Success');
          this.spinner.hide();
          this.loadRoles(1);
        },
        error => {
          this.toastrService.danger('Đã xảy ra lỗi khi thêm !', 'Error');
          console.error('Error adding Roles:', error);
          this.spinner.hide();
        }
      );
    }
    this.form.reset();
  }

  editRole(RoleId: number): void {
    if (this.isEditing) {
      return;
    }

    const RoleIndex = this.Roles.findIndex(Role => Role.id === RoleId);
    if (RoleIndex !== -1) {
      this.newRole = { ...this.Roles[RoleIndex] };
      this.form.patchValue({
        name: this.newRole.name,
        status: this.newRole.status
      });
      this.isAddingNewRole = false;
      this.isEditing = true;
      this.toastrService.info('Sẵn sàng cập nhật!', 'Thông tin');
    }
    this.scrollFormIntoView();
  }


  deleteRole(RolesId: number): void {
    Swal.fire({
      title: 'Xác nhận xóa',
      text: 'Bạn có chắc chắn muốn xóa vai trò này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy bỏ'
    }).then((result) => {
      if (result.isConfirmed) {
        this.RoleService.deleteRoles(RolesId).subscribe(
          () => {
            const RolesIndex = this.Roles.findIndex(Roles => Roles.id === RolesId);
            if (RolesIndex !== -1) {
              this.Roles.splice(RolesIndex, 1);
              this.toastrService.success('Xóa thành công!', 'Success');
            }
          },
          error => {
            this.toastrService.danger('Đã xảy ra lỗi khi xóa', 'Error');
            console.error('Error deleting Roles:', error);
          }
        );
      }
    });
  }

  
 Reset(): void {
    this.isEditing = false;
    this.isAddingNewRole = false;
    this.form.reset();
    this.toastrService.success('Dữ liệu trên form đã được reset!', 'Thành công');
  }

  scrollFormIntoView() {
    if (this.formElement) {
        this.formElement.nativeElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

 
}
