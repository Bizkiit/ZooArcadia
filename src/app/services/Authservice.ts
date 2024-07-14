import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserZoo } from '../../models/user-zoo.model';
import { AuthResponse } from '../../models/auth-response';
import { Role } from '../../models/role.model';
import { ApiService } from './ApiService';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<Role | null>;
  public currentUser: Observable<Role | null>;

  constructor(private http: HttpClient, private router: Router, private apiService: ApiService) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<Role | null>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Role | null {
    return this.currentUserSubject.value;
  }

  login(userZoo: UserZoo): Observable<AuthResponse | null> {
    return this.apiService.postWithResponse<AuthResponse>('Authentication/login', userZoo).pipe(
      tap((response: HttpResponse<AuthResponse>) => {
        const user = response.body;
        if (user) {
          const userWithRole: Role = {
            roleid: user.roleid,
            label: user.label,
            username: user.username,
            token: user.token
          };
          localStorage.setItem('currentUser', JSON.stringify(userWithRole));
          localStorage.setItem('token', user.token);
          this.currentUserSubject.next(userWithRole);
        }
      }),
      map((response: HttpResponse<AuthResponse>) => response.body)
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
