import { User } from "./user.model";

export class Vehicule {
    id!: number;
    matricule!: string;
    type!: string;
    owners!: User[];
  }
  