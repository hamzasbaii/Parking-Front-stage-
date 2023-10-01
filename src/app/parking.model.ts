import { User } from "./user.model";

export class Parking {
    id!: number;
    full!: boolean;
    position!: string;
    managers!: User[];
    // ne pas oublier d'ajouter places quand la fonctionnalité sera disponible 
  }
  