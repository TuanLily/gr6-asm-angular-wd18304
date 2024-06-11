import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { IProduct } from 'app/@core/interfaces/products.interface';
import { ApiService } from '../common';
import { API_BASE_URL, API_ENDPOINT } from "../../config/api-endpoint.config";



@Injectable({
    providedIn: 'root'
})
export class ProductService extends ApiService {

    constructor(private _http: HttpClient) {
        super(_http);
    }

    // getAllProducts(page: number, search: string = ''): Observable<any> {
    //     const params = { page: page.toString(), search: search };
    //     return this.get<any>(API_BASE_URL + API_ENDPOINT.product, params);
    // }
    getAllProducts(page?: number, search?: string): Observable<any> {
        const params: any = {};
        if (page !== undefined) {
            params.page = page.toString();
        }
        if (search !== undefined) {
            params.search = search;
        }
        return this.get<any>(API_BASE_URL + API_ENDPOINT.product, params);
    }
    

    addProduct(product: IProduct): Observable<any> {
        return this.post<any>(API_BASE_URL + API_ENDPOINT.product, product);
    }

    updateProduct(productId: number, product: IProduct): Observable<any> {
        const url = `${API_BASE_URL + API_ENDPOINT.product}/${productId}`;
        return this.patch<any>(url, product);
    }

    deleteProduct(productId: number): Observable<any> {
        const url = `${API_BASE_URL + API_ENDPOINT.product}/${productId}`;
        return this.delete<void>(url);
    }
}
