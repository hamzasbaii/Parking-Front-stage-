import { Component, OnInit } from '@angular/core';
import { Vehicule } from '../vehicule.model';
import { Router } from '@angular/router';
import { VehiculeService } from '../vehicule.service';

@Component({
  selector: 'app-vehicule',
  templateUrl: './vehicule.component.html',
  styleUrls: ['./vehicule.component.css']
})
export class VehiculeComponent implements OnInit {
  vehicules: Vehicule[] = [];

  constructor(private vehiculeService: VehiculeService, private router: Router) {}

  ngOnInit() {
    this.getVehicules();
  }

  private getVehicules(){
    this.vehiculeService.getVehicules().subscribe(
      (vehicules) => (this.vehicules = vehicules),
      (error) => console.log(error)
    );
  }

  updateVehicule(id: number){
    this.router.navigate(['update-vehicule', id]);
  }

  deleteVehicule(id: number) {
    this.vehiculeService.deleteVehicule(id).subscribe(
      (data) => {
        console.log(data);
        this.getVehicules();
      },
      (error) => console.log(error)
    );
  }

  vehiculeDetails(id: number) {
    this.router.navigate(['vehicule-details', id]);
  }

  createVehicule() {
    this.router.navigate(['create-vehicule']);
  }
}


