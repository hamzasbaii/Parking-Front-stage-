import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parking } from './parking.model';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  private apiUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  getParkings(): Observable<Parking[]> {
    return this.http.get<Parking[]>(`${this.apiUrl}/parkings`);
  }

  getParking(parkingId: number): Observable<Parking> {
    const url = `${this.apiUrl}/parkings/${parkingId}`;
    return this.http.get<Parking>(url);
  }

  createParking(parking: Parking): Observable<Parking> {
    return this.http.post<Parking>(`${this.apiUrl}/parkings`, parking);
  }


  updateParking(parkingId: number, parking: Parking): Observable<Parking> {
    const url = `${this.apiUrl}/parkings/${parkingId}`;
    return this.http.put<Parking>(url, parking);
  }

  deleteParking(id: number): Observable<Object> {
    return this.http.delete(`${this.apiUrl}/parkings/${id}`);
  }

  checkPositionAvailability(position: string, parkingId?: number): Observable<void> {
    if (parkingId) {
      // If parkingId is provided, include it as a query parameter to the backend API
      const params = { parkingId: parkingId.toString() };
      return this.http.post<void>(`${this.apiUrl}/check-position`, position, { params });
    } else {
      // If parkingId is not provided (for create), don't include it in the request
      return this.http.post<void>(`${this.apiUrl}/check-position`, position);
    }
  }

}
