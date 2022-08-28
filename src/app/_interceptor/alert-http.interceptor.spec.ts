import { TestBed } from '@angular/core/testing';

import { AlertHttpInterceptor } from './alert-http.interceptor';

describe('AlertHttpInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AlertHttpInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AlertHttpInterceptor = TestBed.inject(AlertHttpInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
