import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { User } from '../shared/models/User';
import { NgToastService } from 'ng-angular-popup'
import { IUserRegister } from '../shared/interfaces/IUserRegister';

const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable: Observable<User>;

  constructor(private http: HttpClient, private toast: NgToastService) {
    this.userObservable = this.userSubject.asObservable();
  }

  register(usreRegister: IUserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, usreRegister).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toast.success({ detail: `Welcom to the foodmine ${user.name}`, summary: 'Register Successful', duration: 5000 })
        },
        error: (errorResponse) => {
          this.toast.error({ detail: 'Register Failed', duration: 5000 })
        }
      })
    )
  }

  public get currentUser(): User {
    return this.userSubject.value;
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toast.success({ detail: `Welcom to foodmine ${user.name}`, summary: 'Login Successful', duration: 5000 })
        },
        error: () => {
          this.toast.error({ detail: 'Login Failed', summary: 'Email or password is not valid', duration: 5000 });
        }
      }));
  }

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }
  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as User;
    return new User;
  }
}
