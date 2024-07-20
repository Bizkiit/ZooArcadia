import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getFullUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`;
  }

  private getHeaders(useToken: boolean = false): HttpHeaders {
    let headers = new HttpHeaders();
    if (useToken) {
      let token = localStorage.getItem('token');
      if (token) {
        token = token.replace(/[\r\n]+/g, '').trim();
        headers = headers.set('Authorization', `Bearer ${token}`);
        console.log('Authorization header:', headers.get('Authorization'));
      }
    }
    return headers;
  }

  get<T>(endpoint: string, useToken: boolean = false): Observable<T> {
    const headers = this.getHeaders(useToken);
    return this.http.get<T>(this.getFullUrl(endpoint), { headers });
  }

  post<T>(endpoint: string, body: any, useToken: boolean = false): Observable<T> {
    const headers = this.getHeaders(useToken);
    return this.http.post<T>(this.getFullUrl(endpoint), body, { headers });
  }

  postWithResponse<T>(endpoint: string, body: any, useToken: boolean = false): Observable<HttpResponse<T>> {
    const headers = this.getHeaders(useToken);
    return this.http.post<T>(this.getFullUrl(endpoint), body, { headers, observe: 'response' });
  }

  put<T>(endpoint: string, body: any, useToken: boolean = false): Observable<T> {
    const headers = this.getHeaders(useToken);
    return this.http.put<T>(this.getFullUrl(endpoint), body, { headers });
  }

  delete<T>(endpoint: string, useToken: boolean = false): Observable<T> {
    const headers = this.getHeaders(useToken);
    return this.http.delete<T>(this.getFullUrl(endpoint), { headers });
  }
}
