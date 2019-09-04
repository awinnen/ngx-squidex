import { TestBed } from '@angular/core/testing';

import { SquidexService } from './squidex.service';

describe('SquidexService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SquidexService = TestBed.get(SquidexService);
    expect(service).toBeTruthy();
  });
});
