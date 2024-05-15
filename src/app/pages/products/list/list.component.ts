// list.component.ts
import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { IProduct } from 'app/@core/interfaces/products.interface';
import { ProductService } from 'app/@core/services/apis/product.service';
import { SpinnerService } from "../../../@theme/components/spinner/spinner.service";


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
  oldImages: string = '';

  constructor(private toastrService: NbToastrService, private productService: ProductService, private spinner: SpinnerService) { }

  ngOnInit(): void {
    this.loadProducts();
    if (!this.isAddingNewProduct && this.isEditing) {
      this.form = new FormGroup({
        name: new FormControl('', Validators.required),
        price: new FormControl('', [Validators.required, Validators.min(0)]),
        sale_price: new FormControl('', [Validators.required, Validators.min(0)]),
        image: new FormControl('', [Validators.required]),
        category_id: new FormControl('', [Validators.required])
      });
    } else {
      this.form = new FormGroup({
        name: new FormControl('', Validators.required),
        price: new FormControl('', [Validators.required, Validators.min(0)]),
        sale_price: new FormControl('', [Validators.required, Validators.min(0)]),
        image: new FormControl(''), // Loại bỏ validators required khi chế độ chỉnh sửa
        category_id: new FormControl('', [Validators.required])
      });
    }

  }

  //* Hàm xử lý upload file
  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.form.get('image').setValue(file.name);
    }
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
      this.toastrService.danger('Giá khuyến mãi phải nhỏ hơn giá niêm yết!', 'Error');
      return;
    }

    let productData: IProduct;
    const imageValue = this.form.get('image').value;
    if (this.isEditing && !this.isAddingNewProduct && !imageValue) {
      // Nếu là chế độ sửa và không có ảnh mới được chọn, sử dụng lại ảnh cũ
      productData = {
        name: this.form.get('name').value,
        price: this.form.get('price').value,
        sale_price: this.form.get('sale_price').value,
        image: this.oldImages,
        category_id: this.form.get('category_id').value
      };
    } else {
      // Sử dụng ảnh mới nếu có hoặc nếu không ở chế độ thêm mới
      productData = {
        name: this.form.get('name').value,
        price: this.form.get('price').value,
        sale_price: this.form.get('sale_price').value,
        image: imageValue,
        category_id: this.form.get('category_id').value
      };
    }

    if (this.isEditing === true && !this.isAddingNewProduct) {
      // Nếu đang trong chế độ sửa, cập nhật thông tin cho sản phẩm được chọn
      const productId = this.newProduct.id;
      this.productService.updateProduct(productId, productData).subscribe(
        () => {
          this.toastrService.success('Cập nhật thành công!', 'Success');
          this.isEditing = false;
          setTimeout(() => {
            this.spinner.show();
            window.location.reload();
          }, 1000);

        },
        error => {
          this.toastrService.danger('Đã xảy ra lỗi khi cập nhật sản phẩm!', 'Error');
          console.error('Error updating product:', error);
        }
      );
    } else {
      // Nếu không đang trong chế độ sửa, thêm sản phẩm mới vào danh sách
      this.productService.addProduct(productData).subscribe(
        () => {
          this.toastrService.success('Thêm mới thành công!', 'Success');
          setTimeout(() => {
            this.spinner.show();
            window.location.reload();
          }, 1000);
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

      // Lấy đường dẫn ảnh cũ từ sản phẩm được chọn
      this.oldImages = this.newProduct.image;

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
