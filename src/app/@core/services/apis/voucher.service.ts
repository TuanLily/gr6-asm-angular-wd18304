import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { ApiService } from '../common';
import { API_BASE_URL, API_ENDPOINT } from '../../config/api-endpoint.config';
import { IVoucher } from 'app/@core/interfaces/vouchers.interface';

@Injectable({
  providedIn: 'root',
})
export class VoucherService extends ApiService {
  constructor(private _http: HttpClient) {
    super(_http);
  }

  getAllVouchers(page: number, search: string = ''): Observable<any> {
    const params = { page: page.toString(), search: search };
    return this.get<any>(API_BASE_URL + API_ENDPOINT.vouchers, params);
  }

  addVoucher(voucher: IVoucher): Observable<any> {
    return this.post<any>(API_BASE_URL + API_ENDPOINT.vouchers, voucher);
  }

  updateVoucher(voucherId: number, voucher: IVoucher): Observable<any> {
    const url = `${API_BASE_URL + API_ENDPOINT.vouchers}/${voucherId}`;
    return this.patch<any>(url, voucher);
  }

  deleteVoucher(voucherId: number): Observable<any> {
    const url = `${API_BASE_URL + API_ENDPOINT.vouchers}/${voucherId}`;
    return this.delete<void>(url);
  }

  getVoucherByCode(code: string): Observable<any> {
    const params = new HttpParams().set('code', code);
    const url = `${API_BASE_URL}${API_ENDPOINT.vouchers}/code`;
    return this._http.get<any>(url, { params }).pipe(
      catchError((error) => {
        // console.error('Error fetching voucher by code:', error);
        return throwError(error);
      })
    );
  }

  checkDuplicateVoucherCode(voucherCode: string): Observable<any> {
    const url = `${API_BASE_URL}${API_ENDPOINT.vouchers}/check-duplicate/${voucherCode}`;
    return this._http.get<any>(url).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
