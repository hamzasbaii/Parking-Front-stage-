import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectParkingComponent } from './affect-parking.component';

describe('AffectParkingComponent', () => {
  let component: AffectParkingComponent;
  let fixture: ComponentFixture<AffectParkingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AffectParkingComponent]
    });
    fixture = TestBed.createComponent(AffectParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
