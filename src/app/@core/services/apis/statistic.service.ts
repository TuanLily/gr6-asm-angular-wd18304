import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ApiService } from '../common';
import { API_BASE_URL, API_ENDPOINT } from '../../config/api-endpoint.config';

@Injectable({
  providedIn: 'root',
})
export class statisticsService extends ApiService {
  constructor(private _http: HttpClient) {
    super(_http);
  }

  getProductPrices(): Observable<any> {
    return this.get(
      API_BASE_URL + API_ENDPOINT.statistic.getProductPrices
    );
  }

  getCountProducts(): Observable<any> {
    return this.get(
      API_BASE_URL + API_ENDPOINT.statistic.getCountProducts
    );
  }

  getBillStatus(): Observable<any> {
    return this.get(
      API_BASE_URL + API_ENDPOINT.statistic.getBillStatus
    );
  }
}
