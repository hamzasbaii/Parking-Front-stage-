import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getUser(userId: number): Observable<User> {
    const url = `${this.apiUrl}/users/${userId}`;
    return this.http.get<User>(url);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users/roles`);
  }

  updateUser(userId: number, user: User): Observable<User> {
    const url = `${this.apiUrl}/users/${userId}`;
    return this.http.put<User>(url, user);
  }

  deleteUser(id: number): Observable<Object> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }

  loginUser(login: string, pwd: string): Observable<User> {
    const body = { login: login, pwd: pwd };
    return this.http.post<User>(`${this.apiUrl}/login`, body);
  }

  signupUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/signup`, user);
  }

  checkLoginAvailability(login: string, userId?: number): Observable<void> {
    if (userId) {
      // If userId is provided, include it as a query parameter to the backend API
      const params = new HttpParams().set('userId', String(userId));
      return this.http.post<void>(`${this.apiUrl}/check-login`, login, { params });
    } else {
      // If userId is not provided (for create and signup), don't include it in the request
      return this.http.post<void>(`${this.apiUrl}/check-login`, login);
    }
  }

  affectVehicleToUser(userId: number, matricule: string): Observable<void> {
    const url = `${this.apiUrl}/users/${userId}/affect-vehicle`;
    const body = { matricule: matricule };
    return this.http.post<void>(url, body);
  }

  // Method to check if a vehicle is affected to a user
  checkVehicleAffectedByUser(userId: number, vehicleId: number): Observable<boolean> {
    const url = `${this.apiUrl}/users/${userId}/check-vehicle-affected/${vehicleId}`;
    return this.http.post<boolean>(url, null);
  }

  // Method to remove the affectation of a vehicle from a user
  removeVehicleFromUser(userId: number, vehicleId: number): Observable<void> {
    const url = `${this.apiUrl}/users/${userId}/vehicules/${vehicleId}`;
    return this.http.delete<void>(url);
  }

  affectParkingToUser(userId: number, position: string): Observable<void> {
    const url = `${this.apiUrl}/users/${userId}/affect-parking`;
    const body = { position: position };
    return this.http.post<void>(url, body);
  }

  // Method to check if a parking is affected to a user
  checkParkingAffectedByUser(userId: number, parkingId: number): Observable<boolean> {
    const url = `${this.apiUrl}/users/${userId}/check-parking-affected/${parkingId}`;
    return this.http.post<boolean>(url, null);
  }

  // Method to remove the affectation of a parking from a user
  removeParkingFromUser(userId: number, parkingId: number): Observable<void> {
    const url = `${this.apiUrl}/users/${userId}/parkings/${parkingId}`;
    return this.http.delete<void>(url);
  }

}
