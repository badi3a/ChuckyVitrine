import { TestBed } from '@angular/core/testing';

import { ContactmsgService } from './contactmsg.service';

describe('ContactmsgService', () => {
  let service: ContactmsgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactmsgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
