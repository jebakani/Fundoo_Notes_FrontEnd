import { TestBed } from '@angular/core/testing';

import { CollaboratorserviceService } from './collaboratorservice.service';

describe('CollaboratorserviceService', () => {
  let service: CollaboratorserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollaboratorserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
