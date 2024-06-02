import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { IVoucher } from 'app/@core/interfaces/vouchers.interface';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {
  private apiUrl = `${environment.apiBaseUrl}/api/vouchers`;

  constructor(private http: HttpClient) {}

  getAllVouchers(): Observable<IVoucher[]> {
    return this.http.get<IVoucher[]>(this.apiUrl);
  }

  addVoucher(voucher: IVoucher): Observable<void> {
    return this.http.post<void>(this.apiUrl, voucher);
  }

  updateVoucher(id: number, voucher: IVoucher): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, voucher);
  }

  deleteVoucher(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
