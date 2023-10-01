import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../user.service';

@Component({
  selector: 'app-affect-vehicule',
  templateUrl: './affect-vehicule.component.html',
  styleUrls: ['./affect-vehicule.component.css']
})
export class AffectVehiculeComponent {
  vehicleMatricule!: string;

  constructor(
    public dialogRef: MatDialogRef<AffectVehiculeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: number },
    private userService: UserService
  ) {}

  onAffect(): void {
    this.userService.affectVehicleToUser(this.data.userId, this.vehicleMatricule)
      .subscribe(() => {
        this.dialogRef.close(true); // Close the dialog and notify the parent component
      }, (error) => {
        console.error('Error affecting vehicle:', error);
        // Handle the error, e.g., show an error message to the user
        this.dialogRef.close(false);
      });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
