import { TestBed } from '@angular/core/testing';

import { SwitchKanbanModalService } from './switch-kanban-modal.service';

describe('SwitchKanbanModalService', () => {
  let service: SwitchKanbanModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwitchKanbanModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
