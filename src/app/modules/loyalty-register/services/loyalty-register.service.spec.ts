import { TestBed } from '@angular/core/testing';

import { LoyaltyRegisterService } from './loyalty-register.service';

describe('LoyaltyRegisterService', () => {
  let service: LoyaltyRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoyaltyRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
