// src/app/edit-profile/edit-profile.component.ts
import {
  Component,
  EventEmitter,
  OnInit,
  Inject,
  Input,
  Output,
} from '@angular/core';

// Import to close the dialog on success
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls created in 6.2
import { EditUserService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent {
  @Input() userData = { Username: '', Email: '', Birthday: '' };

  // Create an output event emitter to notify ProfileComponent

  user: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fetchApiData: EditUserService,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
      // Prefill the fields with user data
      this.userData.Username = this.user.Username;
      this.userData.Email = this.user.Email;
      this.userData.Birthday = this.user.Birthday;
    }
  }

  userEdit(): void {
    const username = this.user ? this.user.Username : null;
    this.fetchApiData.editUser(username, this.userData).subscribe(
      (response) => {
        // Logic for a successful user registration goes here! (To be implemented)
        const { user } = response;
        // Store the user and token in local storage
        localStorage.setItem('user', JSON.stringify(user));

        this.dialogRef.close(); // This will close the modal on success!
        this.snackBar.open('User information updated', 'OK', {
          duration: 2000,
        });

        // Notify ProfileComponent that the user's profile has been updated
        if (this.data.profileUpdated) {
          this.data.profileUpdated.emit();
        }

        this.dialogRef.close(); // Close the modal on success
        this.snackBar.open('User information updated', 'OK', {
          duration: 2000,
        });
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
