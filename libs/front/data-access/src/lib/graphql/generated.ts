/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type BudgetRecord = {
  __typename?: 'BudgetRecord';
  amount: Scalars['Float'];
  category: Category;
  currency: Currency;
  date: Scalars['String'];
  group: Group;
  prevPlannedAmount: Scalars['Float'];
  prevSpentAmount: Scalars['Float'];
};

export type BudgetSummary = {
  __typename?: 'BudgetSummary';
  color?: Maybe<Scalars['String']>;
  parentId: Scalars['Int'];
  planned: Scalars['Float'];
  spent: Scalars['Float'];
  title: Scalars['String'];
  type: BudgetSummaryType;
};

export type BudgetSummaryParams = {
  categoryId?: InputMaybe<Scalars['Int']>;
  currencyId?: InputMaybe<Scalars['Int']>;
  groupId?: InputMaybe<Scalars['Int']>;
  /**
   * ISO 8601 string that represents the selected month.
   *
   * The _day_ in the string is not taken into account.
   */
  month?: InputMaybe<Scalars['String']>;
  type: BudgetSummaryType;
};

export enum BudgetSummaryType {
  Category = 'CATEGORY',
  Currency = 'CURRENCY',
  Group = 'GROUP',
}

export type BudgetsParams = {
  /**
   * ISO 8601 string that represents the selected month.
   *
   * The _day_ in the string is not taken into account.
   */
  date: Scalars['String'];
};

export type Category = {
  __typename?: 'Category';
  color?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type CreateBudgetRecordInput = {
  amount: Scalars['Float'];
  categoryId: Scalars['Int'];
  currencyId: Scalars['Int'];
  dateTime: Scalars['String'];
  groupId: Scalars['Int'];
};

export type Currency = {
  __typename?: 'Currency';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Group = {
  __typename?: 'Group';
  categories?: Maybe<Array<Category>>;
  color?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  recreateManyBudgetsRecords: Array<BudgetRecord>;
};

export type MutationRecreateManyBudgetsRecordsArgs = {
  inputs: Array<CreateBudgetRecordInput>;
};

export type Operation = {
  __typename?: 'Operation';
  amount: Scalars['Float'];
  category: Category;
  currency: Scalars['String'];
  dateTime: Scalars['String'];
  group: Group;
  id: Scalars['Int'];
};

export type OperationsParams = {
  categoryId?: InputMaybe<Scalars['Int']>;
  currencyId?: InputMaybe<Scalars['Int']>;
  groupId?: InputMaybe<Scalars['Int']>;
  /**
   * ISO 8601 string that represents the selected month.
   *
   * The _day_ in the string is not taken into account.
   */
  month?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  budgets: Array<BudgetRecord>;
  budgetsSummary: Array<BudgetSummary>;
  categories: Array<Category>;
  currencies: Array<Currency>;
  groups: Array<Group>;
  operations: Array<Operation>;
};

export type QueryBudgetsArgs = {
  params: BudgetsParams;
};

export type QueryBudgetsSummaryArgs = {
  params: BudgetSummaryParams;
};

export type QueryOperationsArgs = {
  params?: InputMaybe<OperationsParams>;
};

export type CurrenciesGroupsCategoriesQueryVariables = Exact<{
  [key: string]: never;
}>;

export type CurrenciesGroupsCategoriesQuery = {
  __typename?: 'Query';
  currencies: Array<{ __typename?: 'Currency'; id: number; name: string }>;
  groups: Array<{
    __typename?: 'Group';
    id: number;
    name: string;
    color?: string | null;
  }>;
  categories: Array<{
    __typename?: 'Category';
    id: number;
    name: string;
    color?: string | null;
  }>;
};

export type CurrenciesGroupsWithCategoriesQueryVariables = Exact<{
  [key: string]: never;
}>;

export type CurrenciesGroupsWithCategoriesQuery = {
  __typename?: 'Query';
  currencies: Array<{ __typename?: 'Currency'; id: number; name: string }>;
  groups: Array<{
    __typename?: 'Group';
    id: number;
    name: string;
    categories?: Array<{
      __typename?: 'Category';
      id: number;
      name: string;
    }> | null;
  }>;
};

export type OperationsQueryVariables = Exact<{
  params: OperationsParams;
}>;

export type OperationsQuery = {
  __typename?: 'Query';
  operations: Array<{
    __typename?: 'Operation';
    id: number;
    amount: number;
    currency: string;
    dateTime: string;
    category: {
      __typename?: 'Category';
      id: number;
      name: string;
      color?: string | null;
    };
    group: {
      __typename?: 'Group';
      id: number;
      name: string;
      color?: string | null;
    };
  }>;
};

export type BudgetsSummariesQueryVariables = Exact<{
  params: BudgetSummaryParams;
}>;

export type BudgetsSummariesQuery = {
  __typename?: 'Query';
  budgetsSummary: Array<{
    __typename?: 'BudgetSummary';
    parentId: number;
    title: string;
    planned: number;
    spent: number;
    color?: string | null;
    type: BudgetSummaryType;
  }>;
};

export type BudgetsQueryVariables = Exact<{
  params: BudgetsParams;
}>;

export type BudgetsQuery = {
  __typename?: 'Query';
  budgets: Array<{
    __typename?: 'BudgetRecord';
    amount: number;
    prevPlannedAmount: number;
    prevSpentAmount: number;
    date: string;
    currency: { __typename?: 'Currency'; id: number; name: string };
    category: { __typename?: 'Category'; id: number; name: string };
    group: { __typename?: 'Group'; id: number; name: string };
  }>;
};

export type RecreateBudgetsRecordsMutationVariables = Exact<{
  inputs: Array<CreateBudgetRecordInput> | CreateBudgetRecordInput;
}>;

export type RecreateBudgetsRecordsMutation = {
  __typename?: 'Mutation';
  recreateManyBudgetsRecords: Array<{
    __typename?: 'BudgetRecord';
    amount: number;
    date: string;
    currency: { __typename?: 'Currency'; id: number; name: string };
    group: { __typename?: 'Group'; id: number; name: string };
    category: { __typename?: 'Category'; id: number; name: string };
  }>;
};

export const CurrenciesGroupsCategoriesDocument = gql`
  query CurrenciesGroupsCategories {
    currencies {
      id
      name
    }
    groups {
      id
      name
      color
    }
    categories {
      id
      name
      color
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CurrenciesGroupsCategoriesGQL extends Apollo.Query<
  CurrenciesGroupsCategoriesQuery,
  CurrenciesGroupsCategoriesQueryVariables
> {
  document = CurrenciesGroupsCategoriesDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const CurrenciesGroupsWithCategoriesDocument = gql`
  query CurrenciesGroupsWithCategories {
    currencies {
      id
      name
    }
    groups {
      id
      name
      categories {
        id
        name
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CurrenciesGroupsWithCategoriesGQL extends Apollo.Query<
  CurrenciesGroupsWithCategoriesQuery,
  CurrenciesGroupsWithCategoriesQueryVariables
> {
  document = CurrenciesGroupsWithCategoriesDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const OperationsDocument = gql`
  query Operations($params: OperationsParams!) {
    operations(params: $params) {
      id
      amount
      currency
      category {
        id
        name
        color
      }
      group {
        id
        name
        color
      }
      dateTime
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class OperationsGQL extends Apollo.Query<
  OperationsQuery,
  OperationsQueryVariables
> {
  document = OperationsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const BudgetsSummariesDocument = gql`
  query BudgetsSummaries($params: BudgetSummaryParams!) {
    budgetsSummary(params: $params) {
      parentId
      title
      planned
      spent
      color
      type
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class BudgetsSummariesGQL extends Apollo.Query<
  BudgetsSummariesQuery,
  BudgetsSummariesQueryVariables
> {
  document = BudgetsSummariesDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const BudgetsDocument = gql`
  query Budgets($params: BudgetsParams!) {
    budgets(params: $params) {
      amount
      prevPlannedAmount
      prevSpentAmount
      currency {
        id
        name
      }
      category {
        id
        name
      }
      group {
        id
        name
      }
      date
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class BudgetsGQL extends Apollo.Query<
  BudgetsQuery,
  BudgetsQueryVariables
> {
  document = BudgetsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const RecreateBudgetsRecordsDocument = gql`
  mutation RecreateBudgetsRecords($inputs: [CreateBudgetRecordInput!]!) {
    recreateManyBudgetsRecords(inputs: $inputs) {
      amount
      currency {
        id
        name
      }
      group {
        id
        name
      }
      category {
        id
        name
      }
      date
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class RecreateBudgetsRecordsGQL extends Apollo.Mutation<
  RecreateBudgetsRecordsMutation,
  RecreateBudgetsRecordsMutationVariables
> {
  document = RecreateBudgetsRecordsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
