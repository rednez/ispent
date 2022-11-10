import { Component } from '@angular/core';
import { Operation } from '@ispent/shared/data-access';

@Component({
  selector: 'ispent-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  operations: Operation[] = [
    {
      id: 1,
      amount: 1200,
      currency: 'UAH',
      group: {
        id: 1,
        name: 'Products',
        color: '#7ec53c',
      },
      category: {
        id: 1,
        name: 'Foods',
        color: '#3cc5c5',
      },
      dateTime: '1982-01-10',
    },
    {
      id: 2,
      amount: 20500.4,
      currency: 'UAH',
      group: {
        id: 1,
        name: 'Products',
        color: '#7ec53c',
      },
      category: {
        id: 1,
        name: 'Foods',
        color: '#3cc5c5',
      },
      dateTime: '2022-11-03',
    },
    {
      id: 3,
      amount: 3574,
      currency: 'CZK',
      group: {
        id: 2,
        name: 'Life',
        color: '#a73cc5',
      },
      category: {
        id: 4,
        name: 'Caffe',
        color: '#c78522',
      },
      dateTime: '2022-11-03',
    },
  ];
}
