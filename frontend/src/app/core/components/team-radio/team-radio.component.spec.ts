import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamRadioComponent } from './team-radio.component';

describe('TeamRadioComponent', () => {
  let component: TeamRadioComponent;
  let fixture: ComponentFixture<TeamRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamRadioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
