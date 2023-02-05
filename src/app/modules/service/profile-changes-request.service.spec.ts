import { TestBed } from '@angular/core/testing';

import { ProfileChangesRequestService } from './profile-changes-request.service';

describe('ProfileChangesRequestService', () => {
  let service: ProfileChangesRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileChangesRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
