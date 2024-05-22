import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', Validators.required),
    });

    this.route.params.subscribe(params => {
      this.resetToken = params['token'];
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
          next: (res: any) => {
            if (res.status === 200) {
              this.handleSubmitSuccess(res);
            } else {
              this.handleSubmitFailed(res);
            }
          },
          error: (error: any) => {
            this.handleSubmitFailed(error);
          }
        });
    }
  }

  protected handleSubmitSuccess(res: any) {
    this.spinner.hide();
    this.alertMessages = [{ status: 'success', message: 'Xác nhận thành công, vui lòng kiểm tra email của bạn.' }];
  }

  protected handleSubmitFailed(error: any) {
    this.spinner.hide();
    if (error.status === 404) {
      this.alertMessages = [{ status: 'danger', message: 'Email không tồn tại trong hệ thống' }];
    } else {
      this.alertMessages = [{ status: 'danger', message: 'Đã có lỗi xảy ra, vui lòng thử lại sau' }];
    }
  }

}
