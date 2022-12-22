import { TestBed } from '@angular/core/testing';

import { RouteFormService } from './route-form.service';

describe('RouteFormService', () => {
  let service: RouteFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
