import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Parking } from '../parking.model';
import { ParkingService } from '../parking.service';

@Component({
  selector: 'app-update-parking',
  templateUrl: './update-parking.component.html',
  styleUrls: ['./update-parking.component.css']
})
export class UpdateParkingComponent implements OnInit {
  parking: Parking = new Parking();
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private parkingService: ParkingService
  ) {}

  ngOnInit() {
    const parkingId = this.route.snapshot.params['id'];
    this.parkingService.getParking(parkingId).subscribe(
      parking => {
        this.parking = parking;
      },
      error => {
        console.error('Error fetching parking:', error);
      }
    );
  }

  onSubmit() {
    if (this.parking.position) {
      // Check if the position is already used
      this.parkingService.checkPositionAvailability(this.parking.position, this.parking.id).subscribe(
        () => {
          // If the position is available, update the parking
          this.parkingService.updateParking(this.parking.id, this.parking).subscribe(
            (result) => {
              // Handle success
              console.log('Parking updated:', result);
              this.successMessage = 'Parking updated successfully.';
              this.errorMessage = ''; // Clear the error message
              setTimeout(() => {
                this.successMessage = ''; // Clear the success message after 5 seconds
              }, 5000);
            },
            (error) => {
              // Handle error
              console.error('Error updating parking:', error);
              this.errorMessage = 'An error occurred while updating the parking. Please try again later.';
            }
          );
        },
        (error) => {
          // Handle error, the position is already taken, show error message
          console.error('Position is already taken:', error);
          this.errorMessage = 'Position is already taken. Please try another one.';
        }
      );
    } else {
      this.errorMessage = 'Please enter all fields.';
      setTimeout(() => {
        this.errorMessage = ''; // Clear the error message after 5 seconds
      }, 5000);
    }
  }
}
