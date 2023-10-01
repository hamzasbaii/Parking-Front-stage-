import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehiculeService } from '../vehicule.service';
import { Vehicule } from '../vehicule.model';
import { User } from '../user.model';

@Component({
  selector: 'app-vehicule-details',
  templateUrl: './vehicule-details.component.html',
  styleUrls: ['./vehicule-details.component.css']
})
export class VehiculeDetailsComponent implements OnInit{

  id!: number
  vehicule!: Vehicule
  owners: User[] = []; // Array to store the owners of the vehicle
  
  constructor(private route: ActivatedRoute, private vehiculeService: VehiculeService) {}

  ngOnInit() {
    const vehiculeId = this.route.snapshot.params['id'];
    this.vehiculeService.getVehicule(vehiculeId).subscribe(
      vehicule => {
        this.vehicule = vehicule;
        this.owners = vehicule.owners; // Store the owners of the vehicle
      },
      error => {
        console.error('Error fetching vehicule:', error);
      }
    );
  }
}