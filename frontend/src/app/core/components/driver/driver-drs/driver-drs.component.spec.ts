import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverDrsComponent } from './driver-drs.component';

describe('DriverDrsComponent', () => {
  let component: DriverDrsComponent;
  let fixture: ComponentFixture<DriverDrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverDrsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverDrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
