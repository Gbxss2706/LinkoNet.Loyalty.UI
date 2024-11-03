import { TestBed } from '@angular/core/testing';

import { RecentClientService } from './recent-client.service';

describe('RecentUserService', () => {
  let service: RecentClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecentClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
