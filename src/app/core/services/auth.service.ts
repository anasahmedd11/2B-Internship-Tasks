import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest, SignupRequest, AuthResponse, ForgotPasswordRequest, VerifyCodeRequest, ResendCodeRequest, ResetPasswordRequest } from '../Model/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authApiUrl = environment.authApiUrl;
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // to check for existing token on app start
    this.loadStoredUser();
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.authApiUrl}/auth/signin`, credentials)
      .pipe(
        tap(response => {
          //* expects token only in response
          if (response.token) {
            this.storeUserData(response.token, response.user);
          }
        })
      );
  }

  signup(userData: SignupRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.authApiUrl}/auth/signup`, userData)
      .pipe(
        tap(response => {
          //* expects token only in response
          if (response.token) {
            this.storeUserData(response.token, response.user);
          }
        })
      );
  }

  forgotPassword(email: ForgotPasswordRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.authApiUrl}/auth/forgotPassword`, email);
  }

  verifyCode(request: VerifyCodeRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.authApiUrl}/auth/verifyResetCode`, request);
  }

  resendCode(request: ResendCodeRequest): Observable<AuthResponse> {
    // Email should be sent again
    return this.http.post<AuthResponse>(`${this.authApiUrl}/auth/forgotPassword`, request);
  }

  resetPassword(request: ResetPasswordRequest): Observable<AuthResponse> {
    return this.http.put<AuthResponse>(`${this.authApiUrl}/auth/resetPassword`, request);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.getToken() ? true : false;
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private storeUserData(token: string, user: any): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  private loadStoredUser(): void {
    const token = this.getToken();
    const user = localStorage.getItem('user');
    
    if (token && user) {
      try {
        const userData = JSON.parse(user);
        this.currentUserSubject.next(userData);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        this.logout();
      }
    }
  }
}
