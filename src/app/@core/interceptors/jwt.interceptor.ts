import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpHandler,
  HttpRequest, HttpEvent, HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';

import { AuthService } from '../services/apis';
import { TokenService } from '../services/apis/token.service';
import { LOCALSTORAGE_KEY, ROUTER_CONFIG } from '../config';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    if (token) {
      request = this.injectToken(request, token);
    }
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        }
        return throwError(error);
      })
    );
  }



  private injectToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const refreshToken = this.authService.getRefreshToken();
      if (refreshToken) {
        return this.tokenService.refreshToken(refreshToken).pipe(
          switchMap((response: any) => {
            this.isRefreshing = false;
            const newToken = response.token;
            localStorage.setItem(LOCALSTORAGE_KEY.token, newToken);
            this.refreshTokenSubject.next(newToken);
            // Gọi lại request ban đầu với token mới
            return next.handle(this.injectToken(request, newToken)).pipe(
              catchError((error) => {
                // Xử lý lỗi khi gửi request lại thất bại
                return throwError(error);
              })
            );
          }),
          catchError((error) => {
            this.isRefreshing = false;
            if (error.status === 403) {
              this.authService.logout();
              this.router.navigate([ROUTER_CONFIG.auth.login]).then();
            }
            return throwError(error);
          })
        );
      } else {
        this.authService.logout();
        this.router.navigate([ROUTER_CONFIG.auth.login]).then();
        return throwError('Refresh token không tồn tại');
      }
    } else {
      // Nếu đang trong quá trình làm mới token, giữ lại request và chờ
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => {
          // Gửi lại request ban đầu với token mới
          return next.handle(this.injectToken(request, token)).pipe(
            catchError((error) => {
              // Xử lý lỗi khi gửi request lại thất bại
              return throwError(error);
            })
          );
        })
      );
    }
  }
}
