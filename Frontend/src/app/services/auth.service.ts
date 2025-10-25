import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface AuthUserDto {
  userName: string;
  password: string;
}

interface TokenDto {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:9090/auth';

  constructor(private http: HttpClient) { }

  login(authUser: AuthUserDto): Observable<TokenDto> {
    return this.http.post<TokenDto>(`${this.baseUrl}/login`, authUser);
  }

  validate(token: string): Observable<TokenDto> {
    return this.http.post<TokenDto>(`${this.baseUrl}/validate?token=${token}`, {});
  }

  save(authUser: AuthUserDto): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, authUser);
  }
}
