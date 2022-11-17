
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

export class BudgetSummaryParams {
    type: BudgetSummaryType;
    currencyId?: Nullable<number>;
    groupId?: Nullable<number>;
    categoryId?: Nullable<number>;
    month?: Nullable<string>;
}

export class Currency {
    id: number;
    name: string;
}

export class Group {
    id: number;
    name: string;
    color: string;
}

export class Category {
    id: number;
    name: string;
    color: string;
}

export class Operation {
    id: number;
    amount: number;
    currency: string;
    category: Category;
    group: Group;
    dateTime: string;
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

    abstract budgetsSummary(params: BudgetSummaryParams): BudgetSummary[] | Promise<BudgetSummary[]>;
}

type Nullable<T> = T | null;