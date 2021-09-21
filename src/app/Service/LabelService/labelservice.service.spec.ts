import { TestBed } from '@angular/core/testing';

import { LabelserviceService } from './labelservice.service';

describe('LabelserviceService', () => {
  let service: LabelserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabelserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
