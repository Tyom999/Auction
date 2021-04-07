import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUserInterface} from '../models/user.interface';
import {tap} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = null;
  private admin = false;
  private id = null;
  userId;

  constructor(private http: HttpClient) {
  }

  signUp(user): Observable<IUserInterface> {
    return this.http.post<IUserInterface>('http://localhost:3000/auth/signUp', user);
  }

  signIn(user): Observable<IUserInterface> {
    return this.http.post<IUserInterface>('http://localhost:3000/auth/signIn', user)
      .pipe(
        tap(({token, admin, id}) => {
          localStorage.setItem('token', token);
          this.setToken(token);
          this.admin = admin;
          this.id = id;
        })
      );
  }
  isAdmin(): boolean {
    return this.admin;
  }
  setToken(token): void {
    this.token = token;
  }

  getId(): string {
    return this.id;
  }
  isLogin(): string {
    const helper = new JwtHelperService();
    this.token = localStorage.getItem('token');
    const decodedToken = helper.decodeToken(this.token);
    this.userId = decodedToken._id;
    this.admin = decodedToken.isAdmin;
    return this.token;
  }

  logout(): void {
    this.token = null;
    localStorage.clear();
  }
}
