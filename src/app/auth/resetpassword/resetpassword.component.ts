import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTER_CONFIG } from 'app/@core/config';
import { AuthService } from 'app/@core/services/apis';
import { IAlertMessage } from 'app/@theme/components/alert/ngx-alerts.component';
import { SpinnerService } from 'app/@theme/components/spinner/spinner.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  resetToken: string;
  alertMessages: IAlertMessage[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private spinner: SpinnerService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.resetToken = params['token'];
    });

    this.resetPasswordForm = new FormGroup({
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    }, { validators: this.passwordsMatchValidator });
  }

  passwordsMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword').value;
    const confirmPassword = form.get('confirmPassword').value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      this.spinner.show();
      const newPassword = this.resetPasswordForm.get('newPassword').value;
      this.auth.resetPassword(this.resetToken, newPassword)
        .pipe(
          finalize(() => {
            this.spinner.hide();
          }),
        )
        .subscribe({
          next: (res: any) => {
            console.log('Response from resetPassword API:', res); // Log response
            if (res.status === 'success') {
              this.alertMessages = [{ status: 'success', message: 'Đổi mật khẩu thành công' }];
              this.router.navigate([ROUTER_CONFIG.auth.login]).then();
            } else {
              this.alertMessages = [{ status: 'danger', message: res.message || 'Đổi mật khẩu thất bại' }];
            }
          },
          error: (error: any) => {
            console.error('Error from resetPassword API:', error); // Log error
            this.alertMessages = [{ status: 'danger', message: error.error.message || 'Đổi mật khẩu thất bại' }];
          }
        });
    }
  }

}
