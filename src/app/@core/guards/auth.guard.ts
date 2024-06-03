import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { AuthService } from '../services/apis';
import { ROUTER_CONFIG } from '../config';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) { }

  canActivate(): Observable<boolean> | boolean {
    const token = this.authService.getToken(); // Lấy token từ authService
  
    if (token) {
      const loggedIn = this.authService.isLoggedIn(); // Kiểm tra xem người dùng có đăng nhập không (tức là token có hợp lệ không)
  
      if (!loggedIn) {
        // Nếu token đã hết hạn, thử gia hạn token
        return this.authService.refreshToken().pipe(
          switchMap((response: any) => {
            // Nếu làm mới token thành công, lưu token mới vào localStorage
            localStorage.setItem('token', response.token);
            return of(true); // Trả về true để cho phép truy cập
          }),
          catchError((error: any) => {
            // Nếu làm mới token thất bại, xóa localStorage và điều hướng người dùng đến trang đăng nhập
            localStorage.clear();
            this.router.navigate([ROUTER_CONFIG.auth.login]).then();
            return of(false); // Trả về false để chặn truy cập
          })
        );
      }
      return true; // Nếu token chưa hết hạn, cho phép truy cập
    } else {
      // Nếu không có token, điều hướng người dùng đến trang đăng nhập và chặn truy cập
      this.router.navigate([ROUTER_CONFIG.auth.login]).then();
      return false;
    }
  }
  

  canActivateChild(): Observable<boolean> | boolean {
    return this.canActivate();
  }
}
