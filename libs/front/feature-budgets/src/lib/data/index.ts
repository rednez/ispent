export interface FormBudgetEntity {
  id: number;
  name: string;
}

export interface FormBudgetCurrency {
  id: number;
  groups: FormBudgetGroup[];
}

export interface FormBudgetGroup {
  id: number;
  categories: FormBudgetCategory[];
}

export interface FormBudgetCategory {
  id: number;
  amount: number;
  planned: number;
  spent: number;
}

export interface FormData {
  currencies: FormBudgetCurrency[];
}
