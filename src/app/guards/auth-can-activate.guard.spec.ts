import { TestBed, async, inject } from '@angular/core/testing';

import { AuthCanActivateGuard } from './auth-can-activate.guard';

describe('AuthCanActivateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthCanActivateGuard]
    });
  });

  it('should ...', inject([AuthCanActivateGuard], (guard: AuthCanActivateGuard) => {
    expect(guard).toBeTruthy();
  }));
});
