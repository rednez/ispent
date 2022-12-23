
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum BudgetSummaryType {
    CURRENCY = "CURRENCY",
    GROUP = "GROUP",
    CATEGORY = "CATEGORY"
}

export class OperationsParams {
    currencyId?: Nullable<number>;
    groupId?: Nullable<number>;
    categoryId?: Nullable<number>;
    month?: Nullable<string>;
}

export class OperationCreateInput {
    amount: number;
    currencyId: number;
    categoryId: number;
    groupId: number;
    dateTime?: Nullable<string>;
    withdrawalAmount?: Nullable<number>;
    withdrawalCurrencyId?: Nullable<number>;
}

export class OperationUpdateInput {
    id: number;
    amount?: Nullable<number>;
    currencyId?: Nullable<number>;
    categoryId?: Nullable<number>;
    groupId?: Nullable<number>;
    dateTime?: Nullable<string>;
    withdrawalAmount?: Nullable<number>;
    withdrawalCurrencyId?: Nullable<number>;
}

export class BudgetSummaryParams {
    type: BudgetSummaryType;
    currencyId?: Nullable<number>;
    groupId?: Nullable<number>;
    categoryId?: Nullable<number>;
    month?: Nullable<string>;
}

export class BudgetsParams {
    date: string;
}

export class CreateBudgetRecordInput {
    amount: number;
    currencyId: number;
    categoryId: number;
    groupId: number;
    dateTime: string;
}

export class Currency {
    id: number;
    name: string;
}

export class Group {
    id: number;
    name: string;
    color?: Nullable<string>;
    categories?: Nullable<Category[]>;
}

export class Category {
    id: number;
    name: string;
    color?: Nullable<string>;
}

export class Operation {
    id: number;
    amount: number;
    currency: Currency;
    category: Category;
    group: Group;
    dateTime: string;
    withdrawalAmount?: Nullable<number>;
    withdrawalCurrencyId?: Nullable<number>;
}

export class BudgetRecord {
    amount: number;
    prevPlannedAmount: number;
    prevSpentAmount: number;
    currency: Currency;
    category: Category;
    group: Group;
    date: string;
}

export class BudgetSummary {
    parentId: number;
    type: BudgetSummaryType;
    title: string;
    planned: number;
    spent: number;
    color?: Nullable<string>;
}

export abstract class IQuery {
    abstract currencies(): Currency[] | Promise<Currency[]>;

    abstract groups(): Group[] | Promise<Group[]>;

    abstract categories(): Category[] | Promise<Category[]>;

    abstract operations(params?: Nullable<OperationsParams>): Operation[] | Promise<Operation[]>;

    abstract operation(id: number): Nullable<Operation> | Promise<Nullable<Operation>>;

    abstract budgetsSummary(params: BudgetSummaryParams): BudgetSummary[] | Promise<BudgetSummary[]>;

    abstract budgets(params: BudgetsParams): BudgetRecord[] | Promise<BudgetRecord[]>;
}

export abstract class IMutation {
    abstract recreateManyBudgetsRecords(inputs: CreateBudgetRecordInput[]): BudgetRecord[] | Promise<BudgetRecord[]>;

    abstract createOperation(params: OperationCreateInput): Operation | Promise<Operation>;

    abstract updateOperation(params: OperationUpdateInput): Operation | Promise<Operation>;

    abstract deleteOperation(id: number): Operation | Promise<Operation>;
}

type Nullable<T> = T | null;
