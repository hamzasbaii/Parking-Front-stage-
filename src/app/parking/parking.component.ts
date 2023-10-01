import { Component, OnInit } from '@angular/core';
import { Parking } from '../parking.model';
import { Router } from '@angular/router';
import { ParkingService } from '../parking.service';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css']
})
export class ParkingComponent implements OnInit {
  parkings: Parking[] = [];

  constructor(private parkingService: ParkingService, private router: Router) {}

  ngOnInit() {
    this.getParkings();
  }

  private getParkings(){
    this.parkingService.getParkings().subscribe(
      (parkings) => (this.parkings = parkings),
      (error) => console.log(error)
    );
  }

  updateParking(id: number){
    this.router.navigate(['update-parking', id]);
  }

  deleteParking(id: number) {
    this.parkingService.deleteParking(id).subscribe(
      (data) => {
        console.log(data);
        this.getParkings();
      },
      (error) => console.log(error)
    );
  }

  parkingDetails(id: number) {
    this.router.navigate(['parking-details', id]);
  }

  createParking() {
    this.router.navigate(['create-parking']);
  }
}

