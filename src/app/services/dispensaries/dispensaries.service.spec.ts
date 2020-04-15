import { TestBed } from '@angular/core/testing';

import { DispensariesService } from './dispensaries.service';

describe('DispensariesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DispensariesService = TestBed.get(DispensariesService);
    expect(service).toBeTruthy();
  });
});
