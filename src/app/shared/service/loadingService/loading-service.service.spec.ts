import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading-service.service';


describe('LoadingServiceService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
