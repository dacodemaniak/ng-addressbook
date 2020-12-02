import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public loginStatusSubject$ = new BehaviorSubject<boolean>(false)

  constructor() { }

  public login(): void {
    this.loginStatusSubject$.next(true)
  }

  public logout(): void {
    this.loginStatusSubject$.next(false)
  }
}
