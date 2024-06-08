import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { environment } from '@environments/environment';
import { ICategory } from 'app/@core/interfaces/categories.interface';
import { ApiService } from '../common';
import { API_BASE_URL, API_ENDPOINT } from 'app/@core/config/api-endpoint.config';




@Injectable({
  providedIn: 'root'
})
export class CategoryService extends ApiService {





  constructor(private _http: HttpClient) {
      super(_http);
  }

  getAllCategories(): Observable<any> {
    
      return this.get(API_BASE_URL + API_ENDPOINT.categories);
  }

  addCategories(Categories: ICategory ): Observable<any > {
      return this.post(API_BASE_URL + API_ENDPOINT.categories, Categories);
  }

  updateCategories(CategoriesId: number, Categories: ICategory ): Observable<any > {
      const url = `${API_BASE_URL + API_ENDPOINT.categories}/${CategoriesId}`;
      return this.patch(url, Categories);
  }

  deleteCategories(CategoriesId: number): Observable<any> {
      
      return this.delete(`${API_BASE_URL + API_ENDPOINT.categories}/${CategoriesId}`);
  }

  
}
