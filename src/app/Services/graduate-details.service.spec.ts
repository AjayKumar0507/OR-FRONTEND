import { TestBed } from '@angular/core/testing';

import { GraduateDetailsService } from './graduate-details.service';

describe('GraduateDetailsService', () => {
  let service: GraduateDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraduateDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
