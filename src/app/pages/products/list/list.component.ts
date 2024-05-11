// list.component.ts
import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { IProduct } from 'app/@core/interfaces/products.interface';
import { ProductService } from 'app/@core/services/apis/product.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  form: FormGroup;
  newProduct: any = { name: '', price: '', sale_price: '', image: '', category_id: '' };

  // Biến để xác định trạng thái hiện tại: true = đang thêm mới, false = đang sửa
  isAddingNewProduct: boolean = true;
  isEditing: boolean = false;


  products: IProduct[] = [];

  constructor(private toastrService: NbToastrService, private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();

    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      sale_price: new FormControl('', [Validators.required, Validators.min(0)]),
      image: new FormControl('', [Validators.required]),
      category_id: new FormControl('', [Validators.required])
    });
  }

  // *Định dạng tiền tệ
  formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  }

  //* Hàm load toàn bộ dự liệu ra giao diện
  loadProducts(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    });
  }


  // *Xử lý sự kiện khi chọn file ảnh
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const fileNamePath: string = file.name;
    const fileName: string = fileNamePath.split('\\').pop() || fileNamePath;
    console.log(fileName);
    this.newProduct.image = fileName;
  }

  //* Hàm xử lý thêm mới hoặc cập nhật sản phẩm
  addProduct(): void {
    if (!this.form.valid) {
      this.toastrService.danger('Vui lòng nhập đủ dữ liệu và kiểm tra lại các trường!', 'Error');
      return;
    }

    // Kiểm tra xem giá sale có lớn hơn hoặc bằng giá gốc không
    const price = this.form.get('price').value;
    const salePrice = this.form.get('sale_price').value;
    if (salePrice >= price) {
      this.toastrService.danger('Giá khuyễn mãi phải nhỏ hơn giá niêm yết!', 'Error');
      return;
    }

    if (this.isEditing === true && !this.isAddingNewProduct) {
      // Nếu đang trong chế độ sửa, cập nhật thông tin cho sản phẩm được chọn
      const productId = this.newProduct.id;
      this.productService.updateProduct(productId, this.form.value).subscribe(
        () => {
          this.toastrService.success('Cập nhật thành công!', 'Success');
          this.isEditing = false;
        },
        error => {
          this.toastrService.danger('Đã xảy ra lỗi khi cập nhật sản phẩm!', 'Error');
          console.error('Error updating product:', error);
        }
      );
    } else {
      // Nếu không đang trong chế độ sửa, thêm sản phẩm mới vào danh sách
      this.productService.addProduct(this.form.value).subscribe(
        () => {
          this.toastrService.success('Thêm mới thành công!', 'Success');
        },
        error => {
          this.toastrService.danger('Đã xảy ra lỗi khi thêm sản phẩm!', 'Error');
          console.error('Error adding product:', error);
        }
      );
    }
    this.form.reset();
  }

  //* Hàm xử lý dữ liệu đưa lên form đề cập nhật sản phẩm
  editProduct(productId: number): void {
    if (this.isEditing) {
      return;
    }

    const productIndex = this.products.findIndex(product => product.id === productId);
    if (productIndex !== -1) {
      this.newProduct = { ...this.products[productIndex] };
      this.form.patchValue({
        name: this.newProduct.name,
        price: this.newProduct.price,
        sale_price: this.newProduct.sale_price,
        category_id: this.newProduct.category_id
      });
      this.isAddingNewProduct = false;
      this.isEditing = true;
      this.toastrService.info('Sẵn sàng cập nhật!', 'Thông tin');
    }
  }

  //* Hàm xóa sản phẩm
  deleteProduct(productId: number): void {
    Swal.fire({
      title: 'Xác nhận xóa',
      text: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy bỏ'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(productId).subscribe(
          () => {
            const productIndex = this.products.findIndex(product => product.id === productId);
            if (productIndex !== -1) {
              this.products.splice(productIndex, 1);
              this.toastrService.success('Xóa thành công!', 'Success');
            }
          },
          error => {
            this.toastrService.danger('Đã xảy ra lỗi khi xóa sản phẩm!', 'Error');
            console.error('Error deleting product:', error);
          }
        );
      }
    });
  }

  //* Hàm reset lại form
  Reset(): void {
    this.isEditing = false;
    this.isAddingNewProduct = false;
    this.form.reset();
    this.toastrService.success('Dữ liệu trên form đã được reset!', 'Thành công');
  }

}
