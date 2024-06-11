import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


import { IEmployee } from 'app/@core/interfaces/employees.interface';
import { ApiService } from '../common';
import { API_BASE_URL, API_ENDPOINT } from "../../config/api-endpoint.config";



@Injectable({
    providedIn: 'root'
})
export class EmployeeService extends ApiService {

    constructor(private _http: HttpClient) {
        super(_http);
    }

    getAllEmployees(page?: number, search?: string): Observable<any> {
        const params: any = {};
        if (page !== undefined) {
            params.page = page.toString();
        }
        if (search !== undefined) {
            params.search = search;
        }
        return this.get<any>(API_BASE_URL + API_ENDPOINT.employees, params);
    }

    addEmployee(employee: IEmployee): Observable<any> {
        return this.post<any>(API_BASE_URL + API_ENDPOINT.employees, employee);
    }

    updateEmployee(employeeId: number, employee: IEmployee): Observable<any> {
        const url = `${API_BASE_URL + API_ENDPOINT.employees}/${employeeId}`;
        return this.patch<any>(url, employee);
    }

    deleteEmployee(employeeId: number): Observable<any> {
        const url = `${API_BASE_URL + API_ENDPOINT.employees}/${employeeId}`;
        return this.delete<void>(url);
    }
}
