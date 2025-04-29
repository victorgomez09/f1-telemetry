import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDotComponent } from './car-dot.component';

describe('CarDotComponent', () => {
  let component: CarDotComponent;
  let fixture: ComponentFixture<CarDotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarDotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarDotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
