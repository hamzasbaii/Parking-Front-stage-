import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingDetailsComponent } from './parking-details.component';

describe('ParkingDetailsComponent', () => {
  let component: ParkingDetailsComponent;
  let fixture: ComponentFixture<ParkingDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParkingDetailsComponent]
    });
    fixture = TestBed.createComponent(ParkingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
