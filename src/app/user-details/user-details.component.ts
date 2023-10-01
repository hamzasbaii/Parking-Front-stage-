import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Parking, User, Vehicule } from '../user.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { AddVehicleDialogComponent } from '../add-vehicle-dialog/add-vehicle-dialog.component';
import { AddParkingDialogComponent } from '../add-parking-dialog/add-parking-dialog.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  id!: number;
  user!: User;
  vehicules: Vehicule[] = [];
  managedParkings: Parking[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private dialog: MatDialog // Add the MatDialog dependency
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.user = new User();
    this.userService.getUser(this.id).subscribe(data => {
      this.user = data;
      this.vehicules = this.user.vehicules;
      this.managedParkings = this.user.managedParkings;
    });
  }

  openAddVehicleDialog(): void {
    const dialogRef = this.dialog.open(AddVehicleDialogComponent, {
      width: 'auto',
      data: {} // Pass any data that the dialog might need
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.affectVehicle(result);
      }
    });
  }

  affectVehicle(matricule: string): void {
    this.userService.affectVehicleToUser(this.id, matricule).subscribe(
      () => {
        // Refresh the vehicle list after the vehicle is affected
        this.userService.getUser(this.id).subscribe(data => {
          this.user = data;
          this.vehicules = this.user.vehicules;
        });
      },
      error => {
        console.error('Error affecting vehicle:', error);
        // Handle error (e.g., show an error message to the user)
      }
    );
  }

  removeVehicleFromUser(vehicleId: number): void {
    this.userService.removeVehicleFromUser(this.id, vehicleId).subscribe(
      () => {
        // Refresh the vehicle list after the vehicle is removed
        this.userService.getUser(this.id).subscribe(data => {
          this.user = data;
          this.vehicules = this.user.vehicules;
        });
      },
      error => {
        console.error('Error removing vehicle:', error);
        // Handle error (e.g., show an error message to the user)
      }
    );
  }

  openAddParkingDialog(): void {
    const dialogRef = this.dialog.open(AddParkingDialogComponent, {
      width: 'auto', // Set the width to 'auto' to fit the content
      data: {} // Pass any data that the dialog might need
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.affectParking(result);
      }
    });
  }

  affectParking(position: string): void {
    this.userService.affectParkingToUser(this.id, position).subscribe(
      () => {
        // Refresh the vehicle list after the vehicle is affected
        this.userService.getUser(this.id).subscribe(data => {
          this.user = data;
          this.managedParkings = this.user.managedParkings;
        });
      },
      error => {
        console.error('Error affecting parking:', error);
        // Handle error (e.g., show an error message to the user)
      }
    );
  }

  removeParkingFromUser(parkingId: number): void {
    this.userService.removeParkingFromUser(this.id, parkingId).subscribe(
      () => {
        // Refresh the vehicle list after the vehicle is removed
        this.userService.getUser(this.id).subscribe(data => {
          this.user = data;
          this.managedParkings = this.user.managedParkings;
        });
      },
      error => {
        console.error('Error removing parking:', error);
        // Handle error (e.g., show an error message to the user)
      }
    );
  }
}
