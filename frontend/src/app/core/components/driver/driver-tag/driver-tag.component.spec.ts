import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverTagComponent } from './driver-tag.component';

describe('DriverTagComponent', () => {
  let component: DriverTagComponent;
  let fixture: ComponentFixture<DriverTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverTagComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
