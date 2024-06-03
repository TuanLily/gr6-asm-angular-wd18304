// list.component.ts
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

import { IProduct } from 'app/@core/interfaces/products.interface';
import { ProductService } from 'app/@core/services/apis/product.service';
import { SpinnerService } from "../../../@theme/components/spinner/spinner.service";
import { API_BASE_URL, API_ENDPOINT } from 'app/@core/config/api-endpoint.config';
import { ICategory } from 'app/@core/interfaces/categories.interface';
import { CategoryService } from 'app/@core/services/apis/categories.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild('formElement') formElement: ElementRef;

  form: FormGroup;
  newProduct: IProduct = { name: '', price: 0, sale_price: 0, image: '', category_id: '' };

  // Biến để xác định trạng thái hiện tại: true = đang thêm mới, false = đang sửa
  isAddingNewProduct: boolean = true;
  isEditing: boolean = false;

  products: IProduct[] = [];
  categoryData: ICategory[] = [];


  apiUrl = API_BASE_URL + API_ENDPOINT.product;
  currentPage: number = 1;
  totalPages: number;
  searchQuery: string = '';

  oldImages: string = '';

  constructor(
    private toastrService: NbToastrService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private spinner: SpinnerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const currentPage = params['page'] || 1;
      this.loadProducts(currentPage);
    });

    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      sale_price: new FormControl('', [Validators.required, Validators.min(0)]),
      image: new FormControl(''),
      category_id: new FormControl('', [Validators.required])
    });

    this.loadCategory();

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

  // *Hàm load toàn bộ dữ liệu ra giao diện (bao gồm chức năng phân trang và tìm kiếm sản phẩm theo từ khóa)
  loadProducts(page: number): void {
    this.spinner.show();

    this.productService.getAllProducts(page, this.searchQuery).subscribe(data => {

      this.spinner.hide();
      this.products = data.products;
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

  //* Hàm load dữ liệu từ danh mục sang
  loadCategory(): void {
    this.categoryService.getAllCategories().subscribe(cateData => {
      // Lọc các danh mục có status = 0
      this.categoryData = cateData.filter(category => category.status === 0);
    });
  }

  //* Hàm xử lý tìm kiếm sản phẩm
  onSearch(): void {
    // Đặt lại trang hiện tại về 1 khi tìm kiếm
    this.loadProducts(1);
  }


  //* Hàm xử lý thêm mới hoặc cập nhật sản phẩm
  addProduct(): void {
    if (!this.form.valid) {
      this.toastrService.danger('Vui lòng nhập đủ dữ liệu và kiểm tra lại các trường!', 'Error');
      return;
    }

    const price = this.form.get('price').value;
    const salePrice = this.form.get('sale_price').value;
    if (salePrice >= price) {
      this.toastrService.danger('Giá khuyến mãi phải nhỏ hơn giá niêm yết!', 'Error');
      return;
    }

    let productData: IProduct;
    const imageValue = this.form.get('image').value;
    if (this.isEditing && !this.isAddingNewProduct && !imageValue) {
      productData = {
        name: this.form.get('name').value,
        price: this.form.get('price').value,
        sale_price: this.form.get('sale_price').value,
        image: this.oldImages,
        category_id: this.form.get('category_id').value
      };
    } else {
      productData = {
        name: this.form.get('name').value,
        price: this.form.get('price').value,
        sale_price: this.form.get('sale_price').value,
        image: imageValue,
        category_id: this.form.get('category_id').value
      };
    }

    this.spinner.show();

    if (this.isEditing && !this.isAddingNewProduct) {
      const productId = this.newProduct.id;
      this.productService.updateProduct(productId, productData).subscribe(
        () => {
          this.toastrService.success('Cập nhật thành công!', 'Success');
          this.isEditing = false;
          this.spinner.hide();
          this.loadProducts(this.currentPage); // Cập nhật danh sách sản phẩm sau khi chỉnh sửa
        },
        error => {
          this.toastrService.danger('Đã xảy ra lỗi khi cập nhật sản phẩm!', 'Error');
          console.error('Error updating product:', error);
          this.spinner.hide();
        }
      );
    } else {
      this.productService.addProduct(productData).subscribe(
        () => {
          this.toastrService.success('Thêm mới thành công!', 'Success');
          this.spinner.hide();
          this.loadProducts(1); // Cập nhật danh sách sản phẩm sau khi thêm mới
        },
        error => {
          this.toastrService.danger('Đã xảy ra lỗi khi thêm sản phẩm!', 'Error');
          console.error('Error adding product:', error);
          this.spinner.hide();
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
    this.scrollFormIntoView();

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
              this.loadProducts(this.currentPage);
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

  // *Hàm này thực hiện chức năng scroll trang khi click vào nút sửa sản phẩm
  scrollFormIntoView() {
    if (this.formElement) {
      this.formElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
