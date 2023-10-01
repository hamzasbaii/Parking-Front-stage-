import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CreateParkingComponent } from './create-parking/create-parking.component';
import { UpdateParkingComponent } from './update-parking/update-parking.component';
import { ParkingDetailsComponent } from './parking-details/parking-details.component';
import { ParkingComponent } from './parking/parking.component';
import { VehiculeComponent } from './vehicule/vehicule.component';
import { CreateVehiculeComponent } from './create-vehicule/create-vehicule.component';
import { VehiculeDetailsComponent } from './vehicule-details/vehicule-details.component';
import { UpdateVehiculeComponent } from './update-vehicule/update-vehicule.component';
import { AffectVehiculeComponent } from './affect-vehicule/affect-vehicule.component';
import { AffectParkingComponent } from './affect-parking/affect-parking.component';
import { AddVehicleDialogComponent } from './add-vehicle-dialog/add-vehicle-dialog.component';

// Add the necessary Angular Material modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { AddParkingDialogComponent } from './add-parking-dialog/add-parking-dialog.component';
import { MapComponent } from './map/map.component';
import { PlaceComponent } from './place/place.component';
import { ReservationComponent } from './reservation/reservation.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    CreateUserComponent,
    UpdateUserComponent,
    UserDetailsComponent,
    LoginComponent,
    SignupComponent,
    CreateParkingComponent,
    UpdateParkingComponent,
    ParkingDetailsComponent,
    ParkingComponent,
    VehiculeComponent,
    CreateVehiculeComponent,
    VehiculeDetailsComponent,
    UpdateVehiculeComponent,
    AffectVehiculeComponent,
    AffectParkingComponent,
    AddVehicleDialogComponent,
    AddParkingDialogComponent,
    MapComponent,
    PlaceComponent,
    ReservationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  // Angular Material modules
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent, UserComponent]
})
export class AppModule { }
