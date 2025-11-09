import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Api } from './api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Auth {
   private tokenKey = 'ecom_token';
  currentUser$ = new BehaviorSubject<any>(null);

  constructor(private api: Api) {
    const token = localStorage.getItem(this.tokenKey);
    if (token) this.currentUser$.next({ token });
  }

  register(data: { username: string; password: string }) {
    return this.api.post<any>('register', data).pipe(
      tap(res => {
        localStorage.setItem(this.tokenKey, res.token);
        this.currentUser$.next(res);
      })
    );
  }

  login(data: { username: string; password: string }) {
    return this.api.post<any>('login', data).pipe(
      tap(res => {
        localStorage.setItem(this.tokenKey, res.token);
        this.currentUser$.next(res);
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.currentUser$.next(null);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

   isAuthenticated():boolean{
    const token=localStorage.getItem('ecom_token');
    return !! token;
  }
}
