import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicule } from '../vehicule.model';
import { VehiculeService } from '../vehicule.service';

@Component({
  selector: 'app-update-vehicule',
  templateUrl: './update-vehicule.component.html',
  styleUrls: ['./update-vehicule.component.css']
})
export class UpdateVehiculeComponent implements OnInit {
  vehicule: Vehicule = new Vehicule();
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehiculeService: VehiculeService
  ) {}

  ngOnInit() {
    const vehiculeId = this.route.snapshot.params['id'];
    this.vehiculeService.getVehicule(vehiculeId).subscribe(
      vehicule => {
        this.vehicule = vehicule;
      },
      error => {
        console.error('Error fetching vehicule:', error);
      }
    );
  }

  onSubmit() {
    // Check if the matricule is already used
    this.vehiculeService.checkMatriculeAvailability(this.vehicule.matricule, this.vehicule.id).subscribe(
      () => {
        // If the matricule is available or unchanged, update the vehicule
        this.vehiculeService.updateVehicule(this.vehicule.id, this.vehicule).subscribe(
          (result) => {
            // Handle success
            console.log('Vehicule updated:', result);
            this.successMessage = 'Vehicule updated successfully.';
            this.errorMessage = ''; // Clear the error message
            setTimeout(() => {
              this.successMessage = ''; // Clear the success message after 5 seconds
            }, 5000);
          },
          (error) => {
            // Handle error
            console.error('Error updating vehicule:', error);
            this.errorMessage = 'An error occurred while updating the vehicule. Please try again later.';
          }
        );
      },
      (error) => {
        // Handle error, the matricule is already taken, show error message
        console.error('Matricule is already taken:', error);
        this.errorMessage = 'Matricule is already taken. Please try another one.';
      }
    );
  }

  resetForm() {
    this.vehicule = new Vehicule();
  }
}
