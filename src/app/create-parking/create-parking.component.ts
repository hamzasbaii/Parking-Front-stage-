import { Component, OnInit } from '@angular/core';
import { Parking } from '../parking.model';
import { ParkingService } from '../parking.service';

@Component({
  selector: 'app-create-parking',
  templateUrl: './create-parking.component.html',
  styleUrls: ['./create-parking.component.css']
})
export class CreateParkingComponent implements OnInit {
  parking: Parking = new Parking();
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private parkingService: ParkingService) { }

  ngOnInit() {
    
  }
  

  onSubmit() {
    if (this.parking.full && this.parking.position) {
      // Check if the position is already used
      this.parkingService.checkPositionAvailability(this.parking.position).subscribe(
        () => {
          // If the position is available, create the parking
          this.parkingService.createParking(this.parking).subscribe(
            (result) => {
              // Handle success
              console.log('Parking created:', result);
              this.successMessage = 'Parking created successfully.';
              this.errorMessage = ''; // Clear the error message
              this.parking = new Parking(); // Reset the parking object
              setTimeout(() => {
                this.successMessage = ''; // Clear the success message after 5 seconds
              }, 5000);
            },
            (error) => {
              // Handle error
              console.error('Error creating parking:', error);
              this.errorMessage = 'An error occurred while creating the parking. Please try again later.';
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

  

  resetForm() {
    this.parking = new Parking();
  }
}
