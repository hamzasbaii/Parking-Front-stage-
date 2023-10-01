import { Component, Inject } from '@angular/core';
import { UserService } from '../user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-affect-parking',
  templateUrl: './affect-parking.component.html',
  styleUrls: ['./affect-parking.component.css']
})
export class AffectParkingComponent {

  parkingPosition!: string;

  constructor(
    public dialogRef: MatDialogRef<AffectParkingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: number },
    private userService: UserService
  ) {}

  onAffect(): void {
    this.userService.affectParkingToUser(this.data.userId, this.parkingPosition)
      .subscribe(() => {
        this.dialogRef.close(true); // Close the dialog and notify the parent component
      }, (error) => {
        console.error('Error affecting parking:', error);
        // Handle the error, e.g., show an error message to the user
        this.dialogRef.close(false);
      });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}
