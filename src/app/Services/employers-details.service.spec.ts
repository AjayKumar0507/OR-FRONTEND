import { TestBed } from '@angular/core/testing';

import { EmployersDetailsService } from './employers-details.service';

describe('EmployersDetailsService', () => {
  let service: EmployersDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployersDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
