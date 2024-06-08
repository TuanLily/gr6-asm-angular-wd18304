import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { environment } from '@environments/environment';
import { IRole } from 'app/@core/interfaces/roles.interface';
import { ApiService } from '../common';
import { API_BASE_URL, API_ENDPOINT } from 'app/@core/config/api-endpoint.config';




@Injectable({
  providedIn: 'root'
})
export class RoleService extends ApiService {

  constructor(private _http: HttpClient) {
      super(_http);
  }

  getAllRoles(page: number, search: string = ''): Observable<any> {
    const params = { page: page.toString(), search: search };
      return this.get(API_BASE_URL + API_ENDPOINT.roles, params);
  }

  addRoles(Roles: IRole ): Observable<any > {
      return this.post(API_BASE_URL + API_ENDPOINT.roles, Roles);
  }

  updateRoles(RolesId: number, Roles: IRole ): Observable<any > {
      const url = `${API_BASE_URL + API_ENDPOINT.roles}/${RolesId}`;
      return this.patch(url, Roles);
  }

  deleteRoles(RolesId: number): Observable<any> {
      
      return this.delete(`${API_BASE_URL + API_ENDPOINT.roles}/${RolesId}`);
  }

  
}
