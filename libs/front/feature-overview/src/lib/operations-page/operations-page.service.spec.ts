import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { OperationsPageService } from './operations-page.service';

describe('OperationsPageService', () => {
  let service: OperationsPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperationsPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBreadcrumbs', () => {
    beforeEach(() => {
      (<any>service)._allCurrencies$ = of([
        { id: 1, name: 'UAH' },
        { id: 2, name: 'CZK' },
      ]);

      (<any>service)._allGroups$ = of([
        {
          id: 1,
          name: 'Life',
        },
        {
          id: 2,
          name: 'Sport',
        },
        {
          id: 3,
          name: 'Car',
        },
      ]);

      (<any>service)._allCategories$ = of([
        {
          id: 1,
          name: 'Foods',
        },
        {
          id: 2,
          name: 'Benzin',
        },
        {
          id: 3,
          name: 'Beer',
        },
        {
          id: 4,
          name: 'Games',
        },
      ]);
    });

    it('should return 1 item array', (done) => {
      service.getBreadcrumbs().subscribe((value) => {
        expect(value).toEqual([{ name: 'Overview', to: ['overview'] }]);
        done();
      });
    });

    it('should return 2 items array', (done) => {
      (<any>service)._routeParams$ = of({ currency: '1' });

      service.getBreadcrumbs().subscribe((value) => {
        expect(value).toEqual([
          { name: 'Overview', to: ['overview'] },
          { name: 'UAH', to: [] },
        ]);
        done();
      });
    });

    it('should return 3 items array', (done) => {
      (<any>service)._routeParams$ = of({ currency: '1', group: '2' });

      service.getBreadcrumbs().subscribe((value) => {
        expect(value).toEqual([
          { name: 'Overview', to: ['overview'] },
          { name: 'UAH', to: ['overview', '1'] },
          { name: 'Sport', to: [] },
        ]);
        done();
      });
    });

    it('should return 4 items array', (done) => {
      (<any>service)._routeParams$ = of({
        currency: '1',
        group: '2',
        category: '3',
      });

      service.getBreadcrumbs().subscribe((value) => {
        expect(value).toEqual([
          { name: 'Overview', to: ['overview'] },
          { name: 'UAH', to: ['overview', '1'] },
          { name: 'Sport', to: ['overview', '1', '2'] },
          { name: 'Beer', to: [] },
        ]);
        done();
      });
    });
  });
});
