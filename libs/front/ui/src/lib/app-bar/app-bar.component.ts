import { Component } from '@angular/core';

@Component({
  selector: 'ispent-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss'],
})
export class AppBarComponent {
  links = [
    { name: 'Overview', to: '/overview' },
    { name: 'Budgets', to: '/budgets' },
  ];
}
