import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(data) {
    return this.http.post(`http://localhost:8000/api/users/signup`, data, {
      withCredentials: true,
    });
  }
  login(data) {
    return this.http.post(`http://localhost:8000/api/users/login`, data, {
      withCredentials: true,
    });
  }
  logout() {
    return this.http.get(`http://localhost:8000/api/users/logout`, {
      withCredentials: true,
    });
  }
  userStatus() {
    return this.http.get(`http://localhost:8000/api/users/isLoggedIn`, {
      withCredentials: true,
    });
  }
}
