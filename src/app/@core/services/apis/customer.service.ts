import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { environment } from '@environments/environment';
import { ICustomer } from 'app/@core/interfaces/customers.interface';
import { ApiService } from '../common';
import { API_BASE_URL, API_ENDPOINT } from "../../config/api-endpoint.config";



@Injectable({
    providedIn: 'root'
})
export class CustomerService extends ApiService {

    constructor(private _http: HttpClient) {
        super(_http);
    }

    getAllCustomers(page?: number, search?: string): Observable<any> {
        const params: any = {};
        if (page !== undefined) {
            params.page = page.toString();
        }
        if (search !== undefined) {
            params.search = search;
        }
        return this.get<any>(API_BASE_URL + API_ENDPOINT.customers, params);
    }

    addCustomer(customer: ICustomer): Observable<any> {
        return this.post<any>(API_BASE_URL + API_ENDPOINT.customers, customer);
    }

    updateCustomer(customerId: number, customer: ICustomer): Observable<any> {
        const url = `${API_BASE_URL + API_ENDPOINT.customers}/${customerId}`;
        return this.patch<any>(url, customer);
    }

    deleteCustomer(customerId: number): Observable<any> {
        const url = `${API_BASE_URL + API_ENDPOINT.customers}/${customerId}`;
        return this.delete<void>(url);
    }
}
