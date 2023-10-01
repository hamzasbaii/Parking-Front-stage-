import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  
  private placeUrl = 'http://localhost:8080/api/v1/Place';

  constructor(private http: HttpClient) {}

  createReservation(reservationData: any): Observable<any> {
    return this.http.post(`http://localhost:8080/reservations/create`, reservationData);
  }

  checkPlaceAvailability(placeId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.placeUrl}/check/${placeId}`);
  }
}
