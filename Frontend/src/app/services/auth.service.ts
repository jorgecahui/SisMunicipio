import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AuthUserDto {
  userName: string;
  password: string;
}

export interface TokenDto {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = '/auth';

  constructor(private http: HttpClient) { }

  login(user: AuthUserDto): Observable<TokenDto> {
    return this.http.post<TokenDto>(`${this.baseUrl}/login`, user);
  }

  validateToken(token: string): Observable<TokenDto> {
    return this.http.post<TokenDto>(`${this.baseUrl}/validate`, null, { params: { token } });
  }

  createUser(user: AuthUserDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, user);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  clearToken() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
