import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WheatherComponent } from './wheather.component';

describe('WheatherComponent', () => {
  let component: WheatherComponent;
  let fixture: ComponentFixture<WheatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WheatherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WheatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
