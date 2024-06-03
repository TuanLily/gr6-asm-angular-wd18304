import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { environment } from '@environments/environment';
import { ICustomer } from 'app/@core/interfaces/customers.interface';
import { ApiService } from '../common';



@Injectable({
    providedIn: 'root'
})
export class CustomerService extends ApiService {

    private apiUrl = `${environment.apiBaseUrl}/api/customers`;

    constructor(private _http: HttpClient) {
        super(_http);
    }

    getAllCustomers(): Observable<ICustomer[]> {
        return this._http.get<ICustomer[]>(this.apiUrl);
    }

    addCustomer(customer: ICustomer): Observable<ICustomer> {
        return this._http.post<ICustomer>(this.apiUrl, customer);
    }

    updateCustomer(customerId: number, customers: ICustomer): Observable<ICustomer> {
        const url = `${this.apiUrl}/${customerId}`;
        return this._http.patch<ICustomer>(url, customers);
    }

    deleteCustomer(customerId: number): Observable<void> {
        const url = `${this.apiUrl}/${customerId}`;
        return this._http.delete<void>(url);
    }
}
