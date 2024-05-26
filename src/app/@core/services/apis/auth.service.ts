import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IAlertMessage } from "../../../@theme/components/alert/ngx-alerts.component";

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { ApiService, LocalStorageService } from "../common";
import { ILogin } from "../../interfaces/login.interface";
import { API_BASE_URL, API_ENDPOINT } from "../../config/api-endpoint.config";
import { UserInfoModel } from "../../model/user-info.model";
import { LOCALSTORAGE_KEY } from "../../config";

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {

  private loginInfo: ILogin;
  private alertMessages: IAlertMessage;
  private jwtHelperService = new JwtHelperService();

  constructor(
    private _http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService,
  ) {
    super(_http);
  }

  login(form: ILogin): Observable<any> {
    return this.post<any>(API_BASE_URL + API_ENDPOINT.auth.login, {
      email: form.email.trim(),
      password: form.password,
      rememberMe: form.rememberMe
    })
  }

  logout(): Observable<any> {
    return this.post<any>(API_BASE_URL + API_ENDPOINT.auth.logout, {}).pipe(
      tap(() => {
        localStorage.removeItem(LOCALSTORAGE_KEY.userInfo);
        localStorage.removeItem(LOCALSTORAGE_KEY.token);
        localStorage.removeItem(LOCALSTORAGE_KEY.refreshToken);
      })
    );
  }
  

  requirePassword(form: ILogin): Observable<any> {
    return this.post(API_BASE_URL + API_ENDPOINT.auth.login, {
      idLogin: this.getIdLogin(),
      password: form.password,
      newPassword: form.newPassword,
      confirmPassword: form.confirmPassword,
    });
  }

  changePassword(form: ILogin): Observable<any> {
    return this.post(API_BASE_URL + API_ENDPOINT.auth.changePassword, {
      oldPassword: form.password,
      newPassword: form.newPassword,
      confirmNewPassword: form.confirmPassword,
      token: this.getToken(),
    });
  }

  forgotPassword(form: ILogin): Observable<any> {
    return this.post<any>(API_BASE_URL + API_ENDPOINT.auth.forgotPassword, {
      email: form.email.trim(),
    });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.post<any>(API_BASE_URL + API_ENDPOINT.auth.resetPassword, { token, newPassword });
  }


  confirmPassword(form: ILogin): Observable<any> {
    return this.post(API_BASE_URL + API_ENDPOINT.auth.confirmPassword, {
      idLogin: this.getIdLogin(),
      newPassword: form.newPassword,
      verificationCode: form.verificationCode,
    });
  }

  updateProfile(form: UserInfoModel): Observable<any> {
    return this.patch(API_BASE_URL + API_ENDPOINT.auth.updateProfile, {
      firstName: form.firstName,
      lastName: form.lastName,
      token: this.getToken(),
    });
  }

  getIdLogin() {
    if (this.loginInfo) {
      return this.loginInfo.idLogin;
    }
    return null;
  }

  cacheLoginInfo(value: ILogin) {
    return this.loginInfo = value;
  }

  cacheUpdateMessage(alertMessages: any) {
    return this.alertMessages = alertMessages;
  }

  clearMessage() {
    return this.alertMessages = null;
  }

  getUpdateMessage() {
    if (this.alertMessages) {
      return this.alertMessages;
    }
    return null;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (token) {
      const expired = this.jwtHelperService.isTokenExpired(token);
      if (expired) {
        return false;
      }
      return true;
    }
    return false;
  }


  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    return this.post<any>(API_BASE_URL + API_ENDPOINT.auth.refreshToken, { refreshToken });
  }

  override getToken() {
    return this.localStorageService.getItem<any>(LOCALSTORAGE_KEY.token);
  }

  getRefreshToken() {
    return this.localStorageService.getItem<any>(LOCALSTORAGE_KEY.refreshToken);
  }
}
