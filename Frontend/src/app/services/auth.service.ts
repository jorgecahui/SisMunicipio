import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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
  private baseUrl = environment.authUrl;

  constructor(private http: HttpClient) {}

  login(user: AuthUserDto): Observable<TokenDto> {
    return this.http.post<TokenDto>(`${this.baseUrl}/login`, user);
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