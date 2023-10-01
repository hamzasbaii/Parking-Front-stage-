export class Reservation {

    id!: number;
    dateEntrée!: Date;
    dateSortie!: Date;
    prixTotale!: number;
    place!: { id: number;
        dispo: boolean;
        position: string;
        prix: number;};
    vehicule!: {
        id: number;
  matricule: string;
  type: string;
    };
  
}