import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { ICategory } from 'app/@core/interfaces/categories.interface';
import { CategoryService } from 'app/@core/services/apis/categories.service';
import { SpinnerService } from "../../../@theme/components/spinner/spinner.service";
import { BehaviorSubject } from 'rxjs';


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

  Categories: ICategory[] = [];
 

  constructor(private toastrService: NbToastrService, private Categorieservice: CategoryService, private spinner: SpinnerService) { }

  ngOnInit(): void {
    this.loadCategories();
    if (!this.isAddingNewCate && this.isEditing) {
      this.form = new FormGroup({
        name: new FormControl('', Validators.required),
        status: new FormControl('', [Validators.required])
      });
    } else {
      this.form = new FormGroup({
        name: new FormControl('', Validators.required),
        status: new FormControl('', [Validators.required])
      });
    }

  }

  //* Hàm load toàn bộ dự liệu ra giao diện
  loadCategories(): void {
    this.Categorieservice.getAllCategories().subscribe(Categories => {
      this.Categories = Categories;
    });
  }

  addCategories(): void {
    if (!this.form.valid) {
      this.toastrService.danger('Vui lòng nhập đủ dữ liệu và kiểm tra lại các trường!', 'Error');
      return;
    }

    let cateData: ICategory;
    
      cateData = {
        name: this.form.get('name').value,
        status: this.form.get('status').value
        
      };
      this.spinner.show
   
    if (this.isEditing === true && !this.isAddingNewCate) {
      // Nếu đang trong chế độ sửa, cập nhật thông tin cho danh mục được chọn
      const cateId = this.newCate.id;
      this.Categorieservice.updateCategories(cateId, cateData).subscribe(
        () => {
          this.toastrService.success('Cập nhật thành công!', 'Success');
          this.isEditing = false;
          this.spinner.hide();
          this.loadCategories();
        },
        error => {
          this.toastrService.danger('Đã xảy ra lỗi khi cập nhật!', 'Error');
          console.error('Error updating Categories:', error);
          this.spinner.hide()
        }
      );
    } else {
      // Nếu không đang trong chế độ sửa, thêm danh mục mới vào danh sách
      this.Categorieservice.addCategories(cateData).subscribe(
        () => {
          this.toastrService.success('Thêm mới thành công!', 'Success');
          this.spinner.hide();
          this.loadCategories();
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

      // Lấy đường dẫn ảnh cũ từ sản phẩm được chọn
      

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
      text: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy bỏ'
    }).then((result) => {
      if (result.isConfirmed) {
        this.Categorieservice.deleteCategories(CategoriesId).subscribe(
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
