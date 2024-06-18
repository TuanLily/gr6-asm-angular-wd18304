import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { FormGroup, FormControl, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

import { SpinnerService } from "../../../@theme/components/spinner/spinner.service";
import { CustomerService } from 'app/@core/services/apis/customer.service';
import { ICustomer } from 'app/@core/interfaces/customers.interface';
import { IReview } from 'app/@core/interfaces/reviews.interface';
import { ReviewsService } from 'app/@core/services/apis/review.service';
import { IProduct } from 'app/@core/interfaces/products.interface';
import { ProductService } from 'app/@core/services/apis/product.service';
import { API_BASE_URL, API_ENDPOINT } from 'app/@core/config/api-endpoint.config';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild('formElement') formElement: ElementRef;

  form: FormGroup;
  newReviews: any = { product_id: '', customer_id: '', rate: '', content: '', created_at: '', updated_at: '' };

  // Biến để xác định trạng thái hiện tại: true = đang thêm mới, false = đang sửa
  isAddingNewReviews: boolean = true;
  isEditing: boolean = false;

  reviews: IReview[] = [];
  customerData: ICustomer[] = [];
  products: IProduct[] = [];

  apiUrl = API_BASE_URL + API_ENDPOINT.reviews;
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
    private reviewsService: ReviewsService,
    private customerService: CustomerService,
    private productService: ProductService,
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
    this.loadProducts();
    this.loadCustomer();
    this.route.queryParams.subscribe(params => {
      const currentPage = params['page'] || 1;
      this.loadReviews(currentPage);
    })

    this.form = new FormGroup({
      product_id: new FormControl('', Validators.required),
      customer_id: new FormControl('', Validators.required),
      rate: new FormControl(5, [Validators.required, this.ratingValidator]),
      content: new FormControl(''),
    });
    this.form.get('rate')?.markAsTouched();
  }

  onRate(event: any): void {
    this.newReviews.rate = event;
    this.form.get('rate').setValue(event);
  }

  ratingValidator(control: FormControl): ValidationErrors | null {
    const formGroup = control.parent;
    if (!formGroup) return null;

    const rate = control.value;

    return rate >= 1 && rate <= 5 ? null : { invalidRating: true };
  }

  //* Hàm load toàn bộ dữ liệu ra giao diện
  loadReviews(page: number): void {
    this.spinner.show();

    this.reviewsService.getAllReviews(page, this.searchQuery).subscribe(data => {
      this.spinner.hide();
      this.reviews = data.reviews;
      this.currentPage = data.currentPage;
      this.totalPages = data.totalPages;

      const queryParams: any = { page: page };

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

  loadCustomer(page: number = 1, search: string = ''): void {
    this.customerService.getAllCustomers(page, search).subscribe(customer => {
      console.log(customer);
      this.customerData = customer.customers;
    });
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      (data: any) => {
        this.products = data.products;
      },
      (error) => {
        this.toastrService.danger('Đã xảy ra lỗi khi tải sản phẩm!', 'Error');
      }
    );
  }


  getCustomerNameById(customerId: number): string {
    const customer = this.customerData.find(c => c.id === customerId);
    return customer ? customer.name : 'Unknown Customer';
  }

  getProductNameById(productId: number): string {
    const product = this.products.find(c => c.id === productId);
    return product ? product.name : 'Unknown product';
  }

  //* Hàm xử lý tìm kiếm
  onSearch(): void {
    // Gọi hàm loadReviews với trang hiện tại và từ khóa tìm kiếm
    this.loadReviews(this.currentPage);
  }

  //* Hàm xử lý thêm mới hoặc cập nhật đánh giá
  addReviews(): void {
    if (!this.form.valid) {
      this.toastrService.danger('Vui lòng nhập đủ dữ liệu và kiểm tra lại các trường!', 'Error');
      return;
    }

    let reviewsData: IReview;
    const productValue = this.form.get('product_id').value;
    const customerValue = this.form.get('customer_id').value;
    const rateValue = this.form.get('rate').value;
    const contentValue = this.form.get('content').value;

    if (this.isEditing && !this.isAddingNewReviews && !productValue && !customerValue && !rateValue && !contentValue) {
      // Nếu đang trong chế độ sửa, cập nhật thông tin cho đánh giá được chọn
      // Nếu là chế độ sửa và không có giá trị mới được nhập, sử dụng lại giá trị cũ
      reviewsData = {
        product_id: this.form.get('product_id').value,
        customer_id: this.form.get('customer_id').value,
        rate: this.form.get('rate').value,
        content: this.form.get('content').value,
      };
    } else {
      // Sử dụng giá trị mới nếu có hoặc nếu không ở chế độ thêm mới
      reviewsData = {
        product_id: productValue,
        customer_id: customerValue,
        rate: rateValue,
        content: contentValue
      };
    }

    if (this.isEditing === true && !this.isAddingNewReviews) {
      // Nếu đang trong chế độ sửa, cập nhật thông tin cho nhân viên được chọn
      const reviewId = this.newReviews.id;
      this.reviewsService.updateReviews(reviewId, reviewsData).subscribe(
        () => {
          this.toastrService.success('Cập nhật thành công!', 'Success');
          this.isEditing = false;
          this.spinner.hide();
          this.loadReviews(this.currentPage);
        },
        error => {
          this.toastrService.danger('Đã xảy ra lỗi khi cập nhật nhân viên!', 'Error');
          console.error('Error updating employee:', error);
          this.spinner.hide();
        }
      );
    } else {
      // Nếu không đang trong chế độ sửa, thêm nhân viên mới vào danh sách
      this.reviewsService.addReviews(reviewsData).subscribe(
        () => {
          this.toastrService.success('Thêm mới thành công!', 'Success');
          this.spinner.hide();
          this.loadReviews(1);
        },
        error => {
          this.toastrService.danger('Đã xảy ra lỗi khi thêm nhân viên!', 'Error');
          console.error('Error adding employee:', error);
          this.spinner.hide();
        }
      );
    }
    this.form.reset({
      product_id: '',
      customer_id: '',
      rate: 5,
      content: ''
    });
  }

  //* Hàm xử lý dữ liệu đưa lên form để cập nhật đánh giá
  editReviews(reviewsId: number): void {
    if (this.isEditing) {
      return;
    }

    const reviewsIndex = this.reviews.findIndex(reviews => reviews.id === reviewsId);
    if (reviewsIndex !== -1) {
      this.newReviews = { ...this.reviews[reviewsIndex] };

      this.form.patchValue({
        product_id: this.newReviews.product_id,
        customer_id: this.newReviews.customer_id,
        rate: this.newReviews.rate,
        content: this.newReviews.content,
      });
      this.isAddingNewReviews = false;
      this.isEditing = true;
      this.form.get('product_id')?.disable();
      this.form.get('customer_id')?.disable();
      this.toastrService.info('Sẵn sàng cập nhật!', 'Thông tin');
    }
    this.scrollFormIntoView();
  }


  //* Hàm xóa đánh giá
  deleteReviews(reviewsId: number): void {
    Swal.fire({
      title: 'Xác nhận xóa',
      text: 'Bạn có chắc chắn muốn xóa đánh giá này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy bỏ'
    }).then((result) => {
      if (result.isConfirmed) {
        this.reviewsService.deleteReviews(reviewsId).subscribe(
          () => {
            const reviewsIndex = this.reviews.findIndex(reviews => reviews.id === reviewsId);
            if (reviewsIndex !== -1) {
              this.reviews.splice(reviewsIndex, 1);
              this.loadReviews(this.currentPage)
              this.toastrService.success('Xóa thành công!', 'Success');
            }
          },
          error => {
            this.toastrService.danger('Đã xảy ra lỗi khi xóa đánh giá!', 'Error');
            console.error('Error deleting feedback:', error);
          }
        );
      }
    });
  }

  Reset(): void {
    this.isEditing = false;
    this.isAddingNewReviews = true;
    this.form.reset({
      product_id: '',
      customer_id: '',
      rate: 5,
      content: ''
    });
    this.form.get('product_id')?.enable();
    this.form.get('customer_id')?.enable();
    this.toastrService.success('Dữ liệu trên form đã được reset!', 'Thành công');
  }


  scrollFormIntoView(): void {
    if (this.formElement) {
      this.formElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
