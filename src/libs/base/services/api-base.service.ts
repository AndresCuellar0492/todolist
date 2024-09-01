import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment';
import { ApiBaseProvider } from '../providers/api-base.provider';

const BASE_URL = environment.apiDoggy;
const API_KEY = environment.apiKey;
@Injectable({
  providedIn: 'root',
})
export class ApiBaseService implements ApiBaseProvider {
  constructor(private http: HttpClient) {}

  get<RQ, RS>(endpoint: string, params?: RQ, reqOpts?: any): Promise<RS> {
    /*    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams(),
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (params.hasOwnProperty(k)) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    } */

    return new Promise<RS>((resolve, reject) => {
      let url = `${BASE_URL}/${endpoint}`;

      if (params) {
        url += `/${params}`;
      }

      this.http.get<RS>(url).subscribe({
        next: (response) => resolve(response as RS),
        error: (error) => reject(error),
      });
    });
  }

  post<RQ, RS>(endpoint: string, body: RQ, reqOpts?: any): Promise<RS> {
    return new Promise<RS>((resolve, reject) => {
      this.http.post<RS>(`${BASE_URL}/${endpoint}`, body, reqOpts).subscribe({
        next: (response) => resolve(response as RS),
        error: (error) => reject(error),
      });
    });
  }

  put<RS>(endpoint: string, body: any, reqOpts?: any): Promise<RS> {
    return new Promise<RS>((resolve, reject) => {
      this.http.put<RS>(`${BASE_URL}/${endpoint}`, body, reqOpts).subscribe({
        next: (response) => resolve(response as RS),
        error: (error) => reject(error),
      });
    });
  }

  delete<RS>(endpoint: string, reqOpts?: any): Promise<RS> {
    return new Promise<RS>((resolve, reject) => {
      this.http.delete<RS>(`${BASE_URL}/${endpoint}`, reqOpts).subscribe({
        next: (response) => resolve(response as RS),
        error: (error) => reject(error),
      });
    });
  }

  patch<RS>(endpoint: string, body: any, reqOpts?: any): Promise<RS> {
    return new Promise<RS>((resolve, reject) => {
      this.http.patch<RS>(`${BASE_URL}/${endpoint}`, body, reqOpts).subscribe({
        next: (response) => resolve(response as RS),
        error: (error) => reject(error),
      });
    });
  }
}
