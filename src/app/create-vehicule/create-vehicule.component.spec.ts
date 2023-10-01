import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVehiculeComponent } from './create-vehicule.component';

describe('CreateVehiculeComponent', () => {
  let component: CreateVehiculeComponent;
  let fixture: ComponentFixture<CreateVehiculeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateVehiculeComponent]
    });
    fixture = TestBed.createComponent(CreateVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
