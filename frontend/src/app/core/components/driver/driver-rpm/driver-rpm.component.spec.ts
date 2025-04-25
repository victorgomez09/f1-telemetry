import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverRpmComponent } from './driver-rpm.component';

describe('DriverRpmComponent', () => {
  let component: DriverRpmComponent;
  let fixture: ComponentFixture<DriverRpmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverRpmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverRpmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
