import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { IFeedback } from 'app/@core/interfaces/feedback.interface';
import { ApiService } from '../common';

@Injectable({
    providedIn: 'root'
})
export class FeedbackService extends ApiService {

    private apiUrl = `${environment.apiBaseUrl}/api/feedback`;

    constructor(private _http: HttpClient) {
        super(_http);
    }

    getAllFeedbacks(): Observable<IFeedback[]> {
        return this._http.get<IFeedback[]>(this.apiUrl).pipe(
            catchError(this.handleError)
        );
    }

    addFeedback(feedback: IFeedback): Observable<IFeedback> {
        return this._http.post<IFeedback>(this.apiUrl, feedback).pipe(
            catchError(this.handleError)
        );
    }

    updateFeedback(feedbackId: number, feedbacks: IFeedback): Observable<IFeedback> {
        const url = `${this.apiUrl}/${feedbackId}`;
        return this._http.patch<IFeedback>(url, feedbacks).pipe(
            catchError(this.handleError)
        );
    }

    deleteFeedback(feedbackId: number): Observable<void> {
        const url = `${this.apiUrl}/${feedbackId}`;
        return this._http.delete<void>(url).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: any): Observable<never> {
        console.error('An error occurred:', error);
        return throwError(error);
    }
}

