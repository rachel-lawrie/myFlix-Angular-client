import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private user = new BehaviorSubject<any>(null);

  constructor() {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user.next(JSON.parse(userString));
    }
  }

  // Method to update the user data and emit the change
  updateUser(newUser: any): void {
    this.user.next(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  }

  // Observable to subscribe to for user data changes
  getUser(): Observable<any> {
    return this.user.asObservable();
  }
}
