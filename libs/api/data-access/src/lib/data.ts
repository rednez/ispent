
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

export class GroupCreateInput {
    name: string;
    color?: Nullable<string>;
}

export class GroupUpdateInput {
    id: number;
    name?: Nullable<string>;
    color?: Nullable<string>;
}

export class CategoryCreateInput {
    name: string;
    groupId: number;
    color?: Nullable<string>;
}

export class CategoryUpdateInput {
    id: number;
    name?: Nullable<string>;
    color?: Nullable<string>;
}

export class OperationsParams {
    currencyId?: Nullable<number>;
    groupId?: Nullable<number>;
    categoryId?: Nullable<number>;
    month?: Nullable<string>;
    limit?: Nullable<number>;
}

export class OperationCreateInput {
    amount: number;
    currencyId: number;
    categoryId: number;
    groupId: number;
    dateTime?: Nullable<string>;
    withdrawalAmount?: Nullable<number>;
    withdrawalCurrencyId?: Nullable<number>;
    comment?: Nullable<string>;
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
    comment?: Nullable<string>;
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
    withdrawalCurrencyName?: Nullable<string>;
    comment?: Nullable<string>;
}

export class BudgetRecord {
    amount: number;
    prevPlannedAmount: number;
    prevSpentAmount: number;
    currentSpentAmount: number;
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

    abstract currency(id: number): Nullable<Currency> | Promise<Nullable<Currency>>;

    abstract groups(): Group[] | Promise<Group[]>;

    abstract group(id: number): Nullable<Group> | Promise<Nullable<Group>>;

    abstract categories(): Category[] | Promise<Category[]>;

    abstract category(id: number): Nullable<Category> | Promise<Nullable<Category>>;

    abstract operations(params?: Nullable<OperationsParams>): Operation[] | Promise<Operation[]>;

    abstract operation(id: number): Nullable<Operation> | Promise<Nullable<Operation>>;

    abstract budgetsSummary(params: BudgetSummaryParams): BudgetSummary[] | Promise<BudgetSummary[]>;

    abstract budgets(params: BudgetsParams): BudgetRecord[] | Promise<BudgetRecord[]>;
}

export class DeleteManyResponse {
    count: number;
}

export abstract class IMutation {
    abstract recreateManyBudgetsRecords(inputs: CreateBudgetRecordInput[]): BudgetRecord[] | Promise<BudgetRecord[]>;

    abstract generateManyBudgetsRecords(date: string): BudgetRecord[] | Promise<BudgetRecord[]>;

    abstract deleteManyBudgetsRecords(date: string): DeleteManyResponse | Promise<DeleteManyResponse>;

    abstract createOperation(params: OperationCreateInput): Operation | Promise<Operation>;

    abstract createCurrency(name: string): Currency | Promise<Currency>;

    abstract createGroup(params: GroupCreateInput): Group | Promise<Group>;

    abstract createCategory(params: CategoryCreateInput): Category | Promise<Category>;

    abstract updateOperation(params: OperationUpdateInput): Operation | Promise<Operation>;

    abstract updateCurrency(id: number, name: string): Currency | Promise<Currency>;

    abstract updateGroup(params: GroupUpdateInput): Group | Promise<Group>;

    abstract updateCategory(params: CategoryUpdateInput): Category | Promise<Category>;

    abstract deleteOperation(id: number): Operation | Promise<Operation>;

    abstract deleteCurrency(id: number): Currency | Promise<Currency>;

    abstract deleteGroup(id: number): Group | Promise<Group>;

    abstract deleteCategory(id: number): Category | Promise<Category>;
}

type Nullable<T> = T | null;
