import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { IFeedback } from 'app/@core/interfaces/feedback.interface';
import { ApiService } from '../common';
import { API_BASE_URL, API_ENDPOINT } from "../../config/api-endpoint.config";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService extends ApiService {



  constructor(private _http: HttpClient) {
    super(_http);
  }

  getAllFeedbacks(page: number, search: string = ''): Observable<any> {
    const params = { page: page.toString(), search: search };
    return this.get<any>(API_BASE_URL + API_ENDPOINT.feedback, params)
      ;
  }


  addFeedback(feedback: IFeedback): Observable<any> {
    return this.post<any>(API_BASE_URL + API_ENDPOINT.feedback, feedback);
  }

  updateFeedback(feedbackId: number, feedback: IFeedback): Observable<any> {
    const url = `${API_BASE_URL + API_ENDPOINT.feedback}/${feedbackId}`
    return this.patch<any>(url, feedback);
  }

  deleteFeedback(feedbackId: number): Observable<any> {
    const url = `${API_BASE_URL + API_ENDPOINT.feedback}/${feedbackId}`
    return this._http.delete<void>(url)
  }

  // private handleError(error: any): Observable<never> {
  //     console.error('An error occurred:', error);
  //     return throwError(error);
  // }
}

