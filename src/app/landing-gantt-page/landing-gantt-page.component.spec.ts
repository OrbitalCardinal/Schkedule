import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingGanttPageComponent } from './landing-gantt-page.component';

describe('LandingGanttPageComponent', () => {
  let component: LandingGanttPageComponent;
  let fixture: ComponentFixture<LandingGanttPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingGanttPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingGanttPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
