import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentKanbanPageComponent } from './recent-kanban-page.component';

describe('RecentKanbanPageComponent', () => {
  let component: RecentKanbanPageComponent;
  let fixture: ComponentFixture<RecentKanbanPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentKanbanPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentKanbanPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
