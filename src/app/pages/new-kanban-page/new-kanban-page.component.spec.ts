import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewKanbanPageComponent } from './new-kanban-page.component';

describe('NewKanbanPageComponent', () => {
  let component: NewKanbanPageComponent;
  let fixture: ComponentFixture<NewKanbanPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewKanbanPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewKanbanPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
