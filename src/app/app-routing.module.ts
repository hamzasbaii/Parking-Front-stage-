import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ParkingComponent } from './parking/parking.component';
import { CreateParkingComponent } from './create-parking/create-parking.component';
import { UpdateParkingComponent } from './update-parking/update-parking.component';
import { ParkingDetailsComponent } from './parking-details/parking-details.component';
import { VehiculeComponent } from './vehicule/vehicule.component';
import { CreateVehiculeComponent } from './create-vehicule/create-vehicule.component';
import { UpdateVehiculeComponent } from './update-vehicule/update-vehicule.component';
import { VehiculeDetailsComponent } from './vehicule-details/vehicule-details.component';
import { MapComponent } from './map/map.component';
import { PlaceComponent } from './place/place.component';
import { ReservationComponent } from './reservation/reservation.component';

const routes: Routes = [
  {path: 'users', component: UserComponent},
  {path: 'create-user', component: CreateUserComponent},
  {path: 'update-user/:id', component: UpdateUserComponent},
  {path: 'user-details/:id', component: UserDetailsComponent},
  //
  {path: 'parkings', component: ParkingComponent},
  {path: 'create-parking', component: CreateParkingComponent},
  {path: 'update-parking/:id', component: UpdateParkingComponent},
  {path: 'parking-details/:id', component: ParkingDetailsComponent},
  //
  {path: 'vehicules', component: VehiculeComponent},
  {path: 'create-vehicule', component: CreateVehiculeComponent},
  {path: 'update-vehicule/:id', component: UpdateVehiculeComponent},
  {path: 'vehicule-details/:id', component: VehiculeDetailsComponent},
  //
  {path:'Map',component:MapComponent},
  {path:'place',component:PlaceComponent},
  {path:'reservation',component:ReservationComponent},
  

  //
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
