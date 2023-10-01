import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicule } from './vehicule.model';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {
  private apiUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  getVehicules(): Observable<Vehicule[]> {
    return this.http.get<Vehicule[]>(`${this.apiUrl}/vehicules`);
  }

  getVehicule(vehiculeId: number): Observable<Vehicule> {
    const url = `${this.apiUrl}/vehicules/${vehiculeId}`;
    return this.http.get<Vehicule>(url);
  }

  createVehicule(vehicule: Vehicule): Observable<Vehicule> {
    return this.http.post<Vehicule>(`${this.apiUrl}/vehicules`, vehicule);
  }


  updateVehicule(vehiculeId: number, vehicule: Vehicule): Observable<Vehicule> {
    const url = `${this.apiUrl}/vehicules/${vehiculeId}`;
    return this.http.put<Vehicule>(url, vehicule);
  }

  deleteVehicule(id: number): Observable<Object> {
    return this.http.delete(`${this.apiUrl}/vehicules/${id}`);
  }

  checkMatriculeAvailability(matricule: string, vehiculeId?: number): Observable<void> {
    if (vehiculeId) {
      // If vehciuleId is provided, include it as a query parameter to the backend API
      const params = { vehiculeId: vehiculeId.toString() };
      return this.http.post<void>(`${this.apiUrl}/check-matricule`, matricule, { params });
    } else {
      // If vehiculeId is not provided (for create), don't include it in the request
      return this.http.post<void>(`${this.apiUrl}/check-matricule`, matricule);
    }
  }
}