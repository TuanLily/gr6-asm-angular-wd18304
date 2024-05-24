import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { environment } from '@environments/environment';
import { IProduct } from 'app/@core/interfaces/products.interface';
import { ApiService } from '../common';



@Injectable({
    providedIn: 'root'
})
export class ProductService extends ApiService {

    private apiUrl = `${environment.apiBaseUrl}/api/products`;

    constructor(private _http: HttpClient) {
        super(_http);
    }

    getAllProducts(): Observable<IProduct[]> {
        return this.get<IProduct[]>(this.apiUrl);
    }

    addProduct(product: IProduct): Observable<IProduct> {
        return this.post<IProduct>(this.apiUrl, product);
    }

    updateProduct(productId: number, product: IProduct): Observable<IProduct> {
        const url = `${this.apiUrl}/${productId}`;
        return this.patch<IProduct>(url, product);
    }

    deleteProduct(productId: number): Observable<void> {
        const url = `${this.apiUrl}/${productId}`;
        return this.delete<void>(url);
    }
}
