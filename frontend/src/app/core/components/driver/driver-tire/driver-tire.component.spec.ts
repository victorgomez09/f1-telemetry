import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverTireComponent } from './driver-tire.component';

describe('DriverTireComponent', () => {
  let component: DriverTireComponent;
  let fixture: ComponentFixture<DriverTireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverTireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverTireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
