import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

import { IAlertMessage } from "../../@theme/components/alert/ngx-alerts.component";
import { SpinnerService } from "../../@theme/components/spinner/spinner.service";
import { AuthService } from "../../@core/services/apis";
import { LocalStorageService } from 'app/@core/services/common';
import { LOCALSTORAGE_KEY, ROUTER_CONFIG } from "../../@core/config";
import { finalize } from 'rxjs';



@Component({
  selector: 'app-requestpassword',
  templateUrl: './requestpassword.component.html',
  styleUrls: ['./requestpassword.component.scss']
})
export class RequestpasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  alertMessages: IAlertMessage[] = [];
  resetToken: string;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute,
    private spinner: SpinnerService,
    private toast: NbToastrService,
  ) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.route.params.subscribe(params => {
      this.resetToken = params['token'];
      // Bạn có thể thực hiện các xử lý khác ở đây sau khi nhận được mã thông báo
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      this.spinner.show();
      this.auth.forgotPassword(this.forgotPasswordForm.value)
        .pipe(
          finalize(() => {
            this.spinner.hide();
          }),
        )
        .subscribe({
          next: this.handleLoginSuccess.bind(this),
          error: this.handleLoginFailed.bind(this),
        });
    }
  }

  protected handleLoginSuccess(res: any) {
    this.spinner.hide();
    this.toast.success('Xác nhận thành công, vui lòng kiểm tra email của bạn.', 'Thành công');

  }
  protected handleLoginFailed(error: any) {
    this.spinner.hide();
    if (error.status === 404) {
      this.alertMessages = [{ status: 'danger', message: 'Email không tồn tại trong hệ thống' }];
    } 
    // else {
    //   this.alertMessages = [{ status: 'danger', message: 'Đã có lỗi xảy ra, vui lòng thử lại sau' }];
    // }
  }

}
