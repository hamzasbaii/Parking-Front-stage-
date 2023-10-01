import { Component, OnInit } from '@angular/core';
import { Vehicule } from '../vehicule.model';
import { VehiculeService } from '../vehicule.service';

@Component({
  selector: 'app-create-vehicule',
  templateUrl: './create-vehicule.component.html',
  styleUrls: ['./create-vehicule.component.css']
})
export class CreateVehiculeComponent implements OnInit {
  vehicule: Vehicule = new Vehicule();
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private vehiculeService: VehiculeService) { }

  ngOnInit() {
    
  }

  onSubmit() {
    if (this.vehicule.matricule && this.vehicule.type) {
      // Check if the matricule is already used
      this.vehiculeService.checkMatriculeAvailability(this.vehicule.matricule).subscribe(
        () => {
          // If the matricule is available, create the vehicule
          this.vehiculeService.createVehicule(this.vehicule).subscribe(
            (result) => {
              // Handle success
              console.log('Vehicule created:', result);
              this.successMessage = 'Vehicule created successfully.';
              this.errorMessage = ''; // Clear the error message
              this.vehicule = new Vehicule(); // Reset the vehicule object
              setTimeout(() => {
                this.successMessage = ''; // Clear the success message after 5 seconds
              }, 5000);
            },
            (error) => {
              // Handle error
              console.error('Error creating vehicule:', error);
              this.errorMessage = 'An error occurred while creating the vehicule. Please try again later.';
            }
          );
        },
        (error) => {
          // Handle error, the matricule is already taken, show error message
          console.error('Matricule is already taken:', error);
          this.errorMessage = 'Matricule is already taken. Please try another one.';
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
    this.vehicule = new Vehicule();
  }
}
