import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-vehicle-dialog',
  templateUrl: './add-vehicle-dialog.component.html',
  styleUrls: ['./add-vehicle-dialog.component.css']
})
export class AddVehicleDialogComponent {

  matricule: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddVehicleDialogComponent>
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.matricule.trim() !== '') {
      this.dialogRef.close(this.matricule);
    }
  }
}
