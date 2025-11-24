import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {END_POINTS} from '../../utils/end-points';
import {EntityDataService} from "../../utils/entity-data";
import {TokenModels} from "../../../models/token-models";
import {BehaviorSubject, Observable, tap} from "rxjs";

export interface AuthResponse {
  token: string;
  userName: string;
  personaId: number;
  roles: string[];
}

@Injectable({providedIn: 'root'})
export class AuthService extends EntityDataService<TokenModels> {

  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'current_user';
  private currentUserSubject = new BehaviorSubject<AuthResponse | null>(null);

  constructor(protected override httpClient: HttpClient) {
    super(httpClient, END_POINTS.login, END_POINTS.login);
    this.loadUserFromStorage();
  }
  private loadUserFromStorage(): void {
    const savedUser = localStorage.getItem(this.USER_KEY);
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }
  private storeUserData(user: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, user.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }



  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  getCurrentUser(): AuthResponse | null {
    return this.currentUserSubject.value;
  }
  getPersonaId(): number | null {
    const user = this.getCurrentUser();
    return user ? user.personaId : null;
  }

  setToken(token: string | undefined): void {
    localStorage.clear();
    if (token != null) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }

  }
  login(credentials: any): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(this.baseUrl, credentials).pipe(
      tap((response: AuthResponse) => {
        this.storeUserData(response);
      })
    );
  }
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }


}
