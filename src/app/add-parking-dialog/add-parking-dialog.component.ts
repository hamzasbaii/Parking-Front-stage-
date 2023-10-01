import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-parking-dialog',
  templateUrl: './add-parking-dialog.component.html',
  styleUrls: ['./add-parking-dialog.component.css']
})
export class AddParkingDialogComponent {
  
  position: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddParkingDialogComponent>
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.position.trim() !== '') {
      this.dialogRef.close(this.position);
    }
  }
}
