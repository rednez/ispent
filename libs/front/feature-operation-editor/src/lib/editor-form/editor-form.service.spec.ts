import { TestBed } from '@angular/core/testing';

import { EditorFormService } from './editor-form.service';

describe('EditorFormService', () => {
  let service: EditorFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditorFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('computeWithdrawalRate should return rounded amount', () => {
    expect(service.computeWithdrawalRate(103.2, 123.32)).toBe(1.195);
    expect(service.computeWithdrawalRate(103.2, 123.42)).toBe(1.1959);
    expect(service.computeWithdrawalRate(103.2, 123.45)).toBe(1.1962);
  });

  it('computeWithdrawalRate should return parsed strings', () => {
    expect(service.computeWithdrawalRate('103.2', '123.32')).toBe(1.195);
  });

  it('computeWithdrawalRate should return 0 if one of inputs is NaN', () => {
    expect(service.computeWithdrawalRate(1, 'q')).toBe(0);
    expect(service.computeWithdrawalRate('a', 1)).toBe(0);
    expect(service.computeWithdrawalRate('a', 'b')).toBe(0);
  });
});
