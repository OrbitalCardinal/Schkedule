import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingKanbanPageComponent } from './landing-kanban-page.component';

describe('LandingKanbanPageComponent', () => {
  let component: LandingKanbanPageComponent;
  let fixture: ComponentFixture<LandingKanbanPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingKanbanPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingKanbanPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
