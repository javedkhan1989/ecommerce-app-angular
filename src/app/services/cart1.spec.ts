import { TestBed } from '@angular/core/testing';

import { Cart1 } from './cart1';

describe('Cart1', () => {
  let service: Cart1;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cart1);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
