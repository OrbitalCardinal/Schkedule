import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingSchedulePageComponent } from './landing-schedule-page.component';

describe('LandingSchedulePageComponent', () => {
  let component: LandingSchedulePageComponent;
  let fixture: ComponentFixture<LandingSchedulePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingSchedulePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingSchedulePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
