import { TestBed } from '@angular/core/testing';

import { SwitchHorarioModalService } from './switch-horario-modal.service';

describe('SwitchMorarioModalService', () => {
  let service: SwitchHorarioModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwitchHorarioModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
