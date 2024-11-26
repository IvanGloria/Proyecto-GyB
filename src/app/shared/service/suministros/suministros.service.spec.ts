import { TestBed } from '@angular/core/testing';

import { SuministrosService } from './suministros.service';

describe('SuministrosService', () => {
  let service: SuministrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuministrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
