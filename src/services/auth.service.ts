import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getJwtToken() {
    return localStorage.getItem('JWT_TOKEN');
  }

  setToken(value: string): void {
    let authToken = value.split(' ')[1];
    localStorage.setItem('JWT_TOKEN', authToken);
  }

  login({ username, password }) {
    return this.http.post(
      `${environment.protocol}${environment.api_url}:${environment.port}/auth/login`,
      { username, password }
    )
  }

  logout(): void {
    localStorage.removeItem('JWT_TOKEN');
  }

  validateToken() {
    return this.http.post(
      `${environment.protocol}${environment.api_url}:${environment.port}/auth/validateToken`,
      this.getJwtToken()
    )
  }
}
