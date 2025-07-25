import { TestBed } from '@angular/core/testing';

import { ActiveClubService } from './active-club.service';

describe('ActiveClubService', () => {
  let service: ActiveClubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveClubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
