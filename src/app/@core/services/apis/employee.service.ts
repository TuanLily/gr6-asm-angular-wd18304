import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { environment } from '@environments/environment';
import { IEmployee } from 'app/@core/interfaces/employees.interface';
import { ApiService } from '../common';



@Injectable({
    providedIn: 'root'
})
export class EmployeeService extends ApiService {

    private apiUrl = `${environment.apiBaseUrl}/api/employees`;

    constructor(private _http: HttpClient) {
        super(_http);
    }

    getAllEmployees(): Observable<IEmployee[]> {
        return this._http.get<IEmployee[]>(this.apiUrl);
    }

    addEmployee(employee: IEmployee): Observable<IEmployee> {
        return this._http.post<IEmployee>(this.apiUrl, employee);
    }

    updateEmployee(employeeId: number, employee: IEmployee): Observable<IEmployee> {
        const url = `${this.apiUrl}/${employeeId}`;
        return this._http.patch<IEmployee>(url, employee);
    }

    deleteEmployee(employeeId: number): Observable<void> {
        const url = `${this.apiUrl}/${employeeId}`;
        return this._http.delete<void>(url);
    }
}
