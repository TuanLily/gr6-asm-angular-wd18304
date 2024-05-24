import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    private API_URL = `${environment.apiBaseUrl}`;
    private API_ENDPOINT = '/api/auth/refresh-token'

    constructor(private http: HttpClient) { }

    refreshToken(refreshToken: string): Observable<any> {
        return this.http.post(`${this.API_URL}${this.API_ENDPOINT}`, { refreshToken });
    }
}

