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

export type CategoryCreateInput = {
  color?: InputMaybe<Scalars['String']>;
  groupId: Scalars['Int'];
  name: Scalars['String'];
};

export type CategoryUpdateInput = {
  color?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
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

export type GroupCreateInput = {
  color?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type GroupUpdateInput = {
  color?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: Category;
  createCurrency: Currency;
  createGroup: Group;
  createOperation: Operation;
  deleteCategory: Category;
  deleteCurrency: Currency;
  deleteGroup: Group;
  deleteOperation: Operation;
  recreateManyBudgetsRecords: Array<BudgetRecord>;
  updateCategory: Category;
  updateCurrency: Currency;
  updateGroup: Group;
  updateOperation: Operation;
};

export type MutationCreateCategoryArgs = {
  params: CategoryCreateInput;
};

export type MutationCreateCurrencyArgs = {
  name: Scalars['String'];
};

export type MutationCreateGroupArgs = {
  params: GroupCreateInput;
};

export type MutationCreateOperationArgs = {
  params: OperationCreateInput;
};

export type MutationDeleteCategoryArgs = {
  id: Scalars['Int'];
};

export type MutationDeleteCurrencyArgs = {
  id: Scalars['Int'];
};

export type MutationDeleteGroupArgs = {
  id: Scalars['Int'];
};

export type MutationDeleteOperationArgs = {
  id: Scalars['Int'];
};

export type MutationRecreateManyBudgetsRecordsArgs = {
  inputs: Array<CreateBudgetRecordInput>;
};

export type MutationUpdateCategoryArgs = {
  params: CategoryUpdateInput;
};

export type MutationUpdateCurrencyArgs = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type MutationUpdateGroupArgs = {
  params: GroupUpdateInput;
};

export type MutationUpdateOperationArgs = {
  params: OperationUpdateInput;
};

export type Operation = {
  __typename?: 'Operation';
  amount: Scalars['Float'];
  category: Category;
  currency: Currency;
  dateTime: Scalars['String'];
  group: Group;
  id: Scalars['Int'];
  withdrawalAmount?: Maybe<Scalars['Float']>;
  withdrawalCurrencyId?: Maybe<Scalars['Int']>;
  withdrawalCurrencyName?: Maybe<Scalars['String']>;
};

export type OperationCreateInput = {
  amount: Scalars['Float'];
  categoryId: Scalars['Int'];
  currencyId: Scalars['Int'];
  dateTime?: InputMaybe<Scalars['String']>;
  groupId: Scalars['Int'];
  withdrawalAmount?: InputMaybe<Scalars['Float']>;
  withdrawalCurrencyId?: InputMaybe<Scalars['Int']>;
};

export type OperationUpdateInput = {
  amount?: InputMaybe<Scalars['Float']>;
  categoryId?: InputMaybe<Scalars['Int']>;
  currencyId?: InputMaybe<Scalars['Int']>;
  dateTime?: InputMaybe<Scalars['String']>;
  groupId?: InputMaybe<Scalars['Int']>;
  id: Scalars['Int'];
  withdrawalAmount?: InputMaybe<Scalars['Float']>;
  withdrawalCurrencyId?: InputMaybe<Scalars['Int']>;
};

export type OperationsParams = {
  categoryId?: InputMaybe<Scalars['Int']>;
  currencyId?: InputMaybe<Scalars['Int']>;
  groupId?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
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
  group?: Maybe<Group>;
  groups: Array<Group>;
  operation?: Maybe<Operation>;
  operations: Array<Operation>;
};

export type QueryBudgetsArgs = {
  params: BudgetsParams;
};

export type QueryBudgetsSummaryArgs = {
  params: BudgetSummaryParams;
};

export type QueryGroupArgs = {
  id: Scalars['Int'];
};

export type QueryOperationArgs = {
  id: Scalars['Int'];
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

export type CurrenciesQueryVariables = Exact<{ [key: string]: never }>;

export type CurrenciesQuery = {
  __typename?: 'Query';
  currencies: Array<{ __typename?: 'Currency'; id: number; name: string }>;
};

export type GroupsQueryVariables = Exact<{ [key: string]: never }>;

export type GroupsQuery = {
  __typename?: 'Query';
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

export type GroupQueryVariables = Exact<{
  id: Scalars['Int'];
}>;

export type GroupQuery = {
  __typename?: 'Query';
  group?: {
    __typename?: 'Group';
    id: number;
    name: string;
    color?: string | null;
    categories?: Array<{
      __typename?: 'Category';
      id: number;
      name: string;
      color?: string | null;
    }> | null;
  } | null;
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
    dateTime: string;
    withdrawalAmount?: number | null;
    withdrawalCurrencyId?: number | null;
    withdrawalCurrencyName?: string | null;
    currency: { __typename?: 'Currency'; id: number; name: string };
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

export type OperationQueryVariables = Exact<{
  operationId: Scalars['Int'];
}>;

export type OperationQuery = {
  __typename?: 'Query';
  operation?: {
    __typename?: 'Operation';
    id: number;
    amount: number;
    dateTime: string;
    withdrawalAmount?: number | null;
    withdrawalCurrencyId?: number | null;
    currency: { __typename?: 'Currency'; id: number; name: string };
    group: { __typename?: 'Group'; id: number; name: string };
    category: { __typename?: 'Category'; id: number; name: string };
  } | null;
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

export type DeleteOperationMutationVariables = Exact<{
  id: Scalars['Int'];
}>;

export type DeleteOperationMutation = {
  __typename?: 'Mutation';
  deleteOperation: { __typename?: 'Operation'; id: number };
};

export type UpdateOperationMutationVariables = Exact<{
  params: OperationUpdateInput;
}>;

export type UpdateOperationMutation = {
  __typename?: 'Mutation';
  updateOperation: {
    __typename?: 'Operation';
    id: number;
    amount: number;
    dateTime: string;
    withdrawalAmount?: number | null;
    withdrawalCurrencyId?: number | null;
    currency: { __typename?: 'Currency'; id: number; name: string };
    group: { __typename?: 'Group'; id: number; name: string };
    category: { __typename?: 'Category'; id: number; name: string };
  };
};

export type CreateOperationMutationVariables = Exact<{
  params: OperationCreateInput;
}>;

export type CreateOperationMutation = {
  __typename?: 'Mutation';
  createOperation: {
    __typename?: 'Operation';
    id: number;
    amount: number;
    dateTime: string;
    withdrawalAmount?: number | null;
    withdrawalCurrencyId?: number | null;
    currency: { __typename?: 'Currency'; id: number; name: string };
    group: { __typename?: 'Group'; id: number; name: string };
    category: { __typename?: 'Category'; id: number; name: string };
  };
};

export type CreateCurrencyMutationVariables = Exact<{
  name: Scalars['String'];
}>;

export type CreateCurrencyMutation = {
  __typename?: 'Mutation';
  createCurrency: { __typename?: 'Currency'; id: number; name: string };
};

export type CreateGroupMutationVariables = Exact<{
  params: GroupCreateInput;
}>;

export type CreateGroupMutation = {
  __typename?: 'Mutation';
  createGroup: {
    __typename?: 'Group';
    id: number;
    name: string;
    color?: string | null;
  };
};

export type CreateCategoryMutationVariables = Exact<{
  params: CategoryCreateInput;
}>;

export type CreateCategoryMutation = {
  __typename?: 'Mutation';
  createCategory: {
    __typename?: 'Category';
    id: number;
    name: string;
    color?: string | null;
  };
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
export const CurrenciesDocument = gql`
  query Currencies {
    currencies {
      id
      name
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CurrenciesGQL extends Apollo.Query<
  CurrenciesQuery,
  CurrenciesQueryVariables
> {
  document = CurrenciesDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const GroupsDocument = gql`
  query Groups {
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
export class GroupsGQL extends Apollo.Query<GroupsQuery, GroupsQueryVariables> {
  document = GroupsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const GroupDocument = gql`
  query Group($id: Int!) {
    group(id: $id) {
      id
      name
      color
      categories {
        id
        name
        color
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class GroupGQL extends Apollo.Query<GroupQuery, GroupQueryVariables> {
  document = GroupDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const OperationsDocument = gql`
  query Operations($params: OperationsParams!) {
    operations(params: $params) {
      id
      amount
      currency {
        id
        name
      }
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
      withdrawalAmount
      withdrawalCurrencyId
      withdrawalCurrencyName
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
export const OperationDocument = gql`
  query Operation($operationId: Int!) {
    operation(id: $operationId) {
      id
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
      dateTime
      withdrawalAmount
      withdrawalCurrencyId
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class OperationGQL extends Apollo.Query<
  OperationQuery,
  OperationQueryVariables
> {
  document = OperationDocument;

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
export const DeleteOperationDocument = gql`
  mutation DeleteOperation($id: Int!) {
    deleteOperation(id: $id) {
      id
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class DeleteOperationGQL extends Apollo.Mutation<
  DeleteOperationMutation,
  DeleteOperationMutationVariables
> {
  document = DeleteOperationDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const UpdateOperationDocument = gql`
  mutation UpdateOperation($params: OperationUpdateInput!) {
    updateOperation(params: $params) {
      id
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
      dateTime
      withdrawalAmount
      withdrawalCurrencyId
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class UpdateOperationGQL extends Apollo.Mutation<
  UpdateOperationMutation,
  UpdateOperationMutationVariables
> {
  document = UpdateOperationDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const CreateOperationDocument = gql`
  mutation CreateOperation($params: OperationCreateInput!) {
    createOperation(params: $params) {
      id
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
      dateTime
      withdrawalAmount
      withdrawalCurrencyId
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CreateOperationGQL extends Apollo.Mutation<
  CreateOperationMutation,
  CreateOperationMutationVariables
> {
  document = CreateOperationDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const CreateCurrencyDocument = gql`
  mutation CreateCurrency($name: String!) {
    createCurrency(name: $name) {
      id
      name
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CreateCurrencyGQL extends Apollo.Mutation<
  CreateCurrencyMutation,
  CreateCurrencyMutationVariables
> {
  document = CreateCurrencyDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const CreateGroupDocument = gql`
  mutation CreateGroup($params: GroupCreateInput!) {
    createGroup(params: $params) {
      id
      name
      color
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CreateGroupGQL extends Apollo.Mutation<
  CreateGroupMutation,
  CreateGroupMutationVariables
> {
  document = CreateGroupDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const CreateCategoryDocument = gql`
  mutation CreateCategory($params: CategoryCreateInput!) {
    createCategory(params: $params) {
      id
      name
      color
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CreateCategoryGQL extends Apollo.Mutation<
  CreateCategoryMutation,
  CreateCategoryMutationVariables
> {
  document = CreateCategoryDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
