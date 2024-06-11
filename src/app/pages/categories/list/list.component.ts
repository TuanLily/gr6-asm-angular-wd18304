import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { ICategory } from 'app/@core/interfaces/categories.interface';
import { CategoryService } from 'app/@core/services/apis/categories.service';
import { SpinnerService } from "../../../@theme/components/spinner/spinner.service";
import { BehaviorSubject } from 'rxjs';
import { API_BASE_URL, API_ENDPOINT } from 'app/@core/config/api-endpoint.config';


@Component({
  selector: 'app-categories',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild('formElement') formElement: ElementRef;

  form: FormGroup;
  newCate: any = { name: '', status: '' };

  // Biến để xác định trạng thái hiện tại: true = đang thêm mới, false = đang sửa
  isAddingNewCate: boolean = true;
  isEditing: boolean = false;

  apiUrl = API_BASE_URL + API_ENDPOINT.categories;
  currentPage: number = 1;
  totalPages: number;
  searchQuery: string = '';

  Categories: ICategory[] = [];
 

  constructor(
    private toastrService: NbToastrService, 
    private CategorieService: CategoryService, 
    private spinner: SpinnerService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const currentPage = params['page'] || 1;
      this.loadCategories(currentPage);
    });

    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      status: new FormControl('')
    });

  }

  //* Hàm load toàn bộ dự liệu ra giao diện
  loadCategories(page: number): void {
    this.spinner.show(); // Hiển thị spinner khi bắt đầu tải dữ liệu

    this.CategorieService.getAllCategories(page, this.searchQuery).subscribe(data => {
        this.spinner.hide(); // Ẩn spinner khi dữ liệu đã được tải xong

        // Cập nhật danh sách các danh mục
        this.Categories = data.categories.map(category => ({
            ...category,
            isLocker: category.name === 'Chưa Phân Loại' // Thêm cờ isLocker nếu tên của danh mục là "Locker"
        }));

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
    }, error => {
        this.spinner.hide(); // Ẩn spinner nếu có lỗi xảy ra
        console.error('Error loading categories:', error);
    });
}

  onSearch(): void {
    // Gọi hàm loadProducts với trang hiện tại và từ khóa tìm kiếm
    this.loadCategories(this.currentPage);
  }

  addCategories(): void {
    if (!this.form.valid) {
      this.toastrService.danger('Vui lòng nhập đủ dữ liệu và kiểm tra lại các trường!', 'Error');
      return;
    }
  
    let cateData: ICategory;
  
    // Lấy giá trị từ form
    const name = this.form.get('name').value;
    let status = this.form.get('status').value;
  
    // Kiểm tra nếu status là rỗng thì gán giá trị mặc định là 0
    if (!status) {
      status = 0;
    }
  
    cateData = {
      name: name,
      status: status
    };
  
    this.spinner.show();
  
    if (this.isEditing === true && !this.isAddingNewCate) {
      // Nếu đang trong chế độ sửa, cập nhật thông tin cho danh mục được chọn
      const cateId = this.newCate.id;
      this.CategorieService.updateCategories(cateId, cateData).subscribe(
        () => {
          this.toastrService.success('Cập nhật thành công!', 'Success');
          this.isEditing = false;
          this.spinner.hide();
          this.loadCategories(this.currentPage);
        },
        error => {
          this.toastrService.danger('Đã xảy ra lỗi khi cập nhật!', 'Error');
          console.error('Error updating Categories:', error);
          this.spinner.hide();
        }
      );
    } else {
      // Nếu không đang trong chế độ sửa, thêm danh mục mới vào danh sách
      this.CategorieService.addCategories(cateData).subscribe(
        () => {
          this.toastrService.success('Thêm mới thành công!', 'Success');
          this.spinner.hide();
          this.loadCategories(1);
        },
        error => {
          this.toastrService.danger('Đã xảy ra lỗi khi thêm !', 'Error');
          console.error('Error adding Categories:', error);
          this.spinner.hide();
        }
      );
    }
    this.form.reset();
  }
  

  editCate(CateId: number): void {
    if (this.isEditing) {
      return;
    }

    const CateIndex = this.Categories.findIndex(Cate => Cate.id === CateId);
    if (CateIndex !== -1) {
      this.newCate = { ...this.Categories[CateIndex] };
      this.form.patchValue({
        name: this.newCate.name,
        status: this.newCate.status
      });
      this.isAddingNewCate = false;
      this.isEditing = true;
      this.toastrService.info('Sẵn sàng cập nhật!', 'Thông tin');
    }
    this.scrollFormIntoView();
  }


  deleteCategories(CategoriesId: number): void {
    Swal.fire({
      title: 'Xác nhận xóa',
      text: 'Bạn có chắc chắn muốn xóa danh mục này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy bỏ'
    }).then((result) => {
      if (result.isConfirmed) {
        this.CategorieService.deleteCategories(CategoriesId).subscribe(
          () => {
            const CategoriesIndex = this.Categories.findIndex(Categories => Categories.id === CategoriesId);
            if (CategoriesIndex !== -1) {
              this.Categories.splice(CategoriesIndex, 1);
              this.toastrService.success('Xóa thành công!', 'Success');
            }
          },
          error => {
            this.toastrService.danger('Đã xảy ra lỗi khi xóa', 'Error');
            console.error('Error deleting Categories:', error);
          }
        );
      }
    });
  }

  Reset(): void {
    this.isEditing = false;
    this.isAddingNewCate = false;
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
