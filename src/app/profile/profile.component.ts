import { Component, EventEmitter, OnInit } from '@angular/core';
// import { xx } from '../xx';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  user: any; // Define a variable to store the user data, not sure if this goes here

  ngOnInit(): void {
    this.loadUserData();
  }

  openEditProfileDialog(): void {
    // Create a new EventEmitter instance
    const profileUpdatedEmitter = new EventEmitter<void>();

    // Subscribe to the EventEmitter
    profileUpdatedEmitter.subscribe(() => {
      // This function will be called when the event is emitted
      this.loadUserData();
    });

    // Open the dialog and pass the EventEmitter to the EditProfileComponent
    const dialogRef = this.dialog.open(EditProfileComponent, {
      width: '280px',
      data: { profileUpdated: profileUpdatedEmitter },
    });
  }

  loadUserData(): void {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      this.user = JSON.parse(userJson);
    }
  }
}
