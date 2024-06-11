import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../common';
import { API_BASE_URL, API_ENDPOINT } from '../../config/api-endpoint.config';
import { IBill } from 'app/@core/interfaces/bills.interface';

@Injectable({
  providedIn: 'root',
})
export class BillService extends ApiService {
  constructor(private _http: HttpClient) {
    super(_http);
  }

  getAllBills(page: number, search: string = ''): Observable<any> {
    const params = { page: page.toString(), search: search };
    return this.get<any>(API_BASE_URL + API_ENDPOINT.bills, params);
  }

  addBill(bill: IBill): Observable<any> {
    return this.post<any>(API_BASE_URL + API_ENDPOINT.bills, bill);
  }

  updateBill(billId: number, bill: IBill): Observable<any> {
    const url = `${API_BASE_URL + API_ENDPOINT.bills}/${billId}`;
    return this.patch<any>(url, bill);
  }

  deleteBill(billId: number): Observable<any> {
    const url = `${API_BASE_URL + API_ENDPOINT.bills}/${billId}`;
    return this.delete<void>(url);
  }
}
