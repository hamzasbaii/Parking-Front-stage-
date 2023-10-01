import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Place } from './place';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http:HttpClient) { }

  
  public getPlace():Observable<Place[]>{
    return this.http.get<Place[]>("http://localhost:8088/Place/all");
  }
  public deletePlace(id:number){
    return this.http.delete("http://localhost:8088/Place/"+id);
  }

  public addPlace(parkingId: number,place:Place){
return this.http.post<Place>("http://localhost:8088/Place/place/"+parkingId,place);
  }
  public UpdatePlace(place:Place){
    return this.http.put<Place>("http://localhost:8088/Place/",place);
  }
  public GetPlaceByID(id:number):Observable<Place>{
    return this.http.get<Place>("http://localhost:8088/Place/"+id);
}
}
