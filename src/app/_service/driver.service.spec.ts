import { TestBed } from '@angular/core/testing';
import { DriverService } from '../modules/service/driver.service';

describe('DriverService', () => {
  let service: DriverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
