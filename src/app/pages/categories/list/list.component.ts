// list.component.ts
import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import {FormGroup, FormControl, Validators} from '@angular/forms';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  form: FormGroup;
  newProduct: any = { name: '', price: '', sale_price: '', image: '' };

  // Biến để xác định trạng thái hiện tại: true = đang thêm mới, false = đang sửa
  isAddingNewProduct: boolean = true;
  isEditing: boolean = false;

  products: any[] = [
    { id: 1, name: 'Trà Sữa Trân Châu Đen', price: 35000, sale_price: 30000, image: 'https://example.com/tra-sua-1.jpg' },
    { id: 2, name: 'Trà Sữa Trân Châu Trắng', price: 40000, sale_price: 35000, image: 'https://example.com/tra-sua-2.jpg' },
    { id: 3, name: 'Trà Sữa Matcha', price: 45000, sale_price: 40000, image: 'https://example.com/tra-sua-3.jpg' },
  ];

  constructor(private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      sale_price: new FormControl('', [Validators.required, Validators.min(0)]),
      image: new FormControl('', [Validators.required])
    });
  }

  // *Xử lý sự kiện khi chọn file ảnh
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.newProduct.image = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  // *Định dạng tiền tệ
  formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  }

  // *Thêm sản phẩm mới vào danh sách và hiển thị thông báo
  addProduct(): void {
    if (!this.newProduct.name || !this.newProduct.price || !this.newProduct.sale_price || !this.newProduct.image) {
      this.toastrService.danger('Vui lòng nhật đủ dữ liệu', 'Error');
      return;
    }

    // Kiểm tra xem giá sale có lớn hơn hoặc bằng giá gốc không
    if (this.newProduct.sale_price >= this.newProduct.price) {
      this.toastrService.danger('Giá khuyễn phải nhỏ hơn giá niêm yết!', 'Error');
      return;
    }

    if (this.isEditing === true && !this.isAddingNewProduct) {
      // Nếu đang trong chế độ sửa, cập nhật thông tin cho sản phẩm được chọn
      this.products.push(this.newProduct);
      this.isEditing = false;
      this.toastrService.success('Cập nhật thành công!', 'Success');
    } else {
      // Nếu không đang trong chế độ sửa, thêm sản phẩm mới vào danh sách
      const newProductId = this.products.length + 1;
      this.products.push({
        id: newProductId,
        name: this.newProduct.name,
        price: this.newProduct.price,
        sale_price: this.newProduct.sale_price,
        image: this.newProduct.image
      });
      this.toastrService.success('Thêm mới thành công!', 'Success');
    }

    this.newProduct = { name: '', price: '', sale_price: '', image: '' };
  }


  // *Hàm sửa sản phẩm
  editProduct(productId: number): void {
    // Nếu đang trong quá trình sửa sản phẩm, không cho phép thực hiện lại hành động sửa khác
    if (this.isEditing) {
      return;
    }

    // Tìm sản phẩm trong danh sách dựa trên id
    const productIndex = this.products.findIndex(product => product.id === productId);
    if (productIndex !== -1) {
      this.newProduct = { ...this.products[productIndex] };
      this.products.splice(productIndex, 1);
      this.isAddingNewProduct = false;
      this.isEditing = true;
      this.toastrService.info('Sẵn sàng cập nhật!', 'Thông tin');

    }
  }

  // *Hàm xóa sản phẩm
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
        const productIndex = this.products.findIndex(product => product.id === productId);
        if (productIndex !== -1) {
          this.products.splice(productIndex, 1);
          this.toastrService.success('Xóa thành công!', 'Success');
        }
      }
    });
  }

}
