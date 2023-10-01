export class User {
  id!: number;
  login!: string;
  pwd!: string;
  userName!: string;
  role!: {
    id: number;
    description: string;
    titre: string;
  };

  vehicules!: Vehicule[];
  managedParkings!: Parking[];

  constructor() {
    this.role = {
      id: 0,
      description: '',
      titre: ''
    };
    
  }
}

export class Vehicule {
  id!: number;
  matricule!: string;
  type!: string;
  owners!: User[];
}

export class Parking {
  id!: number;
  full!: boolean;
  position!: string;
  managers!: User[];
}
