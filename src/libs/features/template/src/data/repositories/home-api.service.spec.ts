import { TestBed } from '@angular/core/testing';

import { HomeApiService } from './mfp.main-view.repository';

describe('MovieService', () => {
  let service: HomeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
