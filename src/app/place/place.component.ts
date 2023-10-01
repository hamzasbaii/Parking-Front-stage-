import { Component } from '@angular/core';
  import { Router } from '@angular/router';
import { Place } from '../place';
import { PlaceService } from 'src/app/place.service';
import { Parking } from '../user.model';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent {


  place: Place = new Place();
  ParkingId : any ;
constructor(private placeService:PlaceService , private router:Router){}


public AjouterPlace(ParkingId:number):void{
    
  this.placeService.addPlace(ParkingId,this.place)
    .subscribe( response => {
      console.log(response);
    },
    error => {
      console.log(error);
    });



}

}
