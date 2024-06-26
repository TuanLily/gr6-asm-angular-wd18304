import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerService } from "../../@theme/components/spinner/spinner.service";
import { AuthService } from "../../@core/services/apis";
import { LocalStorageService } from "../../@core/services/common";
import { LOCALSTORAGE_KEY, ROUTER_CONFIG } from "../../@core/config";
import { IAlertMessage } from "../../@theme/components/alert/ngx-alerts.component";
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'ngx-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  alertMessages: IAlertMessage[] = [];

  constructor(
    private router: Router,
    private spinner: SpinnerService,
    private auth: AuthService,
    private storageService: LocalStorageService,
  ) {
  }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      rememberMe: new FormControl('')
    });

  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.spinner.show(); // Hiển thị spinner khi bắt đầu gọi API
      this.auth.login(this.loginForm.value)
        .pipe(
          finalize(() => {
            this.spinner.hide(); // Ẩn spinner sau khi API trả về kết quả
          }),
        )
        .subscribe({
          next: this.handleLoginSuccess.bind(this),
          error: this.handleLoginFailed.bind(this),
        });
    }
  }


  protected handleLoginSuccess(res) {
    this.storageService.setItem(LOCALSTORAGE_KEY.userInfo, res.name);
    this.storageService.setItem(LOCALSTORAGE_KEY.token, res.token);
    
    // Lưu refreshToken nếu có trong phản hồi
    if (res.refreshToken) {
        this.storageService.setItem(LOCALSTORAGE_KEY.refreshToken, res.refreshToken);
    }
    
    this.router.navigate([ROUTER_CONFIG.pages]).then();
    this.spinner.hide();
  }

  protected handleLoginFailed() {
    this.spinner.hide();
    this.alertMessages = [{ status: 'danger', message: 'Tài khoản hoặc mật khẩu không chính xác' }];
  }
}
