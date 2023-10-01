import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParkingService } from '../parking.service';
import { Parking } from '../parking.model';
import { User } from '../user.model';

@Component({
  selector: 'app-parking-details',
  templateUrl: './parking-details.component.html',
  styleUrls: ['./parking-details.component.css']
})
export class ParkingDetailsComponent implements OnInit{

  id!: number
  parking!: Parking
  managers: User[] = [];
  
  constructor(private route: ActivatedRoute, private parkingService: ParkingService) {}

  ngOnInit(): void {
    const parkingId = this.route.snapshot.params['id'];
    this.parkingService.getParking(parkingId).subscribe( 
    parking => {
      this.parking = parking;
      this.managers = parking.managers;
   });
  }
}