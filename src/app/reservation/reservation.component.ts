import { Component } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { Reservation } from '../reservation';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  Reservation: any;



  constructor(private reservationService: ReservationService) {}

  createReservation() {
    this.reservationService.createReservation(this.Reservation).subscribe(
      (response) => {
        // Gérer la réponse de succès
        console.log('Réservation créée avec succès:', response);
        // Réinitialiser les données du formulaire ou effectuer d'autres actions
      },
      (error) => {
        // Gérer les erreurs
        console.error('Erreur lors de la création de la réservation:', error);
      }
    );
  }
}
