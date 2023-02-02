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
  plannedPrevious: number;
  spentPrevious: number;
  spentCurrent: number;
  favorite: boolean;
}

export interface FormData {
  currencies: FormBudgetCurrency[];
}
