import {Category} from '@ispent/front/data-access';

export interface BudgetEntity {
  id: number;
  name: string;
}

export interface BudgetCurrency {
  id: number;
  groups: BudgetGroup[];
}

export interface BudgetGroup {
  id: number;
  categories: BudgetCategory[];
}

export interface BudgetCategory {
  id: number;
  amount: number;
  planned: number;
  spent: number;
}
