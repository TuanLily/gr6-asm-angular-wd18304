import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { IAlertMessage } from "../../../@theme/components/alert/ngx-alerts.component";
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
  private readonly API_BASE_URL = 'http://localhost:8000';
  private readonly API_ENDPOINT = {
    auth: {
      login: '/api/auth/login',
      logout: '/api/auth/logout',
      forgotPassword: '/api/auth/forgot-password/',
      resetPassword: '/api/auth/reset-password/',
    }
  };

  constructor(
    private _http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService,
  ) {
    super(_http);
  }

  login(form: ILogin): Observable<any> {
    return this._http.post<any>(`${this.API_BASE_URL}${this.API_ENDPOINT.auth.login}`, {
      email: form.email.trim(),
      password: form.password,
      rememberMe: form.rememberMe
    });
  }

  logout() {
    return this.post<any>(`${this.API_BASE_URL}${this.API_ENDPOINT.auth.logout}`, this.getToken());
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

  // forgotPassword(form: ILogin): Observable<any> {
  //   return this.post(API_BASE_URL + API_ENDPOINT.auth.forgotPassword, {
  //     idLogin: form.idLogin,
  //   });
  // }

  forgotPassword(form: ILogin): Observable<any> {
    // Gửi yêu cầu đến backend với dữ liệu email
    return this._http.post<any>(`${this.API_BASE_URL}${this.API_ENDPOINT.auth.forgotPassword}`, {
      email: form.email.trim(),
    });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this._http.post<any>(`${this.API_BASE_URL}${this.API_ENDPOINT.auth.resetPassword}`, { token, newPassword });
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
    if (this.getToken()) {
      const expired = this.jwtHelperService.isTokenExpired(this.getToken());
      if (expired) {
        localStorage.clear();
      }
      return !expired;
    }
    return false;
  }

  override getToken() {
    return this.localStorageService.getItem<any>(LOCALSTORAGE_KEY.token);
  }
}
