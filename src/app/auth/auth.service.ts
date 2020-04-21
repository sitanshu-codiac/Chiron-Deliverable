import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;
  private token;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(enteredEmail: string, enteredPassword: string) {
    const authData: AuthData = { email: enteredEmail, password: enteredPassword };
    this.http.post('http://localhost:3000/api/user/signup', authData)
      .subscribe(response => {
        console.log(response);
      });
  }

  login(enteredEmail: string, enteredPassword: string) {
    const authData: AuthData = { email: enteredEmail, password: enteredPassword };
    this.http.post<{userName: string, token: string}>('http://localhost:3000/api/user/login', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.router.navigate(['/admin']);
      });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
  }

}