import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;
  private token;
  private user;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getUserDetails() {
    return this.user;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  login(enteredEmail: string, enteredPassword: string) {
    // const authData: AuthData = { email: enteredEmail, password: enteredPassword };
    console.log('enter' + enteredEmail, enteredPassword);

    this.http.post<{token: string, user: AuthData[]}>('http://localhost:3000/api/user/login', {
      email: enteredEmail,
      password: enteredPassword
    })
      .subscribe(response => {
        console.log(response);
        this.user = response.user;
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

  createUser(enteredEmail: string, enteredPassword: string) {
    // const authData: AuthData = { email: enteredEmail, password: enteredPassword };
    this.http.post('http://localhost:3000/api/user/signup', {
      enteredEmail,
      enteredPassword
    })
      .subscribe(response => {
        console.log(response);
      });
  }

}
