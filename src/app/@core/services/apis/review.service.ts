import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { ApiService } from '../common';
import { IReview } from 'app/@core/interfaces/reviews.interface';
import { API_BASE_URL, API_ENDPOINT } from "../../config/api-endpoint.config";

@Injectable({
    providedIn: 'root'
})
export class ReviewsService extends ApiService {

    
    constructor(private _http: HttpClient) {
        super(_http);
    }

    getAllReviews(page: number, search: string = ''): Observable<any> {
        const params = { page: page.toString(), search: search };
        return this.get<any>(API_BASE_URL + API_ENDPOINT.reviews, params);
    }

    addReviews(review: IReview): Observable<any> {
        return this.post<any>(API_BASE_URL + API_ENDPOINT.reviews, review);
    }

    updateReviews(reviewId: number, review: IReview): Observable<any> {
        const url = `${API_BASE_URL + API_ENDPOINT.reviews}/${reviewId}`;
        return this.patch<any>(url, review);
    }

    deleteReviews(reviewId: number): Observable<any> {
        const url = `${API_BASE_URL + API_ENDPOINT.reviews}/${reviewId}`;
        return this.delete<void>(url);
    }
}

