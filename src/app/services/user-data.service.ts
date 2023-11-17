import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * UserDataService is a singleton service provided at the root level.
 * It manages and provides access to the user data throughout the application.
 * User data is stored reactively using BehaviorSubject and persisted in localStorage.
 */
@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private user = new BehaviorSubject<any>(null);

  constructor() {
    // Initialize user data from localStorage if available
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user.next(JSON.parse(userString));
    }
  }

  /**
   * Updates the user data and emits the change to all subscribers.
   * Also updates the user data in localStorage for persistence.
   * @param newUser - The new user data to be updated.
   */
  updateUser(newUser: any): void {
    this.user.next(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  }

  // Observable to subscribe to for user data changes
  getUser(): Observable<any> {
    return this.user.asObservable();
  }
}
