import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_BASE_URL, API_ENDPOINT } from "../../config/api-endpoint.config";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    constructor(private _http: HttpClient) { }

    refreshToken(refreshToken: string): Observable<any> {
        return this._http.post(API_BASE_URL + API_ENDPOINT.auth.refreshToken, { refreshToken });
    }
}

