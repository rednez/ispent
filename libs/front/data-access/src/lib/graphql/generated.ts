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
  currentSpentAmount: Scalars['Float'];
  /**
   * ISO 8601
   * Presented by the first day of the month in UTC
   */
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
  /**
   * ISO 8601
   * Must be presented in the local time of a web-client
   */
  dateTimeEnd?: InputMaybe<Scalars['String']>;
  /**
   * ISO 8601
   * Must be presented in the local time of a web-client
   */
  dateTimeStart?: InputMaybe<Scalars['String']>;
  groupId?: InputMaybe<Scalars['Int']>;
  type: BudgetSummaryType;
};

export enum BudgetSummaryType {
  Category = 'CATEGORY',
  Currency = 'CURRENCY',
  Group = 'GROUP',
}

export type BudgetsParams = {
  /**
   * ISO 8601
   * Must be presented in the local time of a web-client
   */
  currentOperationsDateTimeEnd?: InputMaybe<Scalars['String']>;
  /**
   * ISO 8601
   * Must be presented in the local time of a web-client
   */
  currentOperationsDateTimeStart?: InputMaybe<Scalars['String']>;
  /**
   * ISO 8601
   * Must be presented on the first day of the month in UTC
   */
  date: Scalars['String'];
  /**
   * ISO 8601
   * Must be presented in the local time of a web-client
   */
  prevOperationsDateTimeEnd?: InputMaybe<Scalars['String']>;
  /**
   * ISO 8601
   * Must be presented in the local time of a web-client
   */
  prevOperationsDateTimeStart?: InputMaybe<Scalars['String']>;
};

export type Category = {
  __typename?: 'Category';
  color?: Maybe<Scalars['String']>;
  favorite: Scalars['Boolean'];
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type CategoryCreateInput = {
  color?: InputMaybe<Scalars['String']>;
  favorite: Scalars['Boolean'];
  groupId: Scalars['Int'];
  name: Scalars['String'];
};

export type CategoryUpdateInput = {
  color?: InputMaybe<Scalars['String']>;
  favorite?: InputMaybe<Scalars['Boolean']>;
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

export type DeleteManyResponse = {
  __typename?: 'DeleteManyResponse';
  count: Scalars['Int'];
};

export type GenerateBudgetsRecordsInput = {
  /**
   * ISO 8601
   * Must be presented on the first day of the month in UTC
   */
  date: Scalars['String'];
  /**
   * ISO 8601
   * Must be presented in the local time of a web-client
   */
  prevOperationsDateTimeEnd: Scalars['String'];
  /**
   * ISO 8601
   * Must be presented in the local time of a web-client
   */
  prevOperationsDateTimeStart: Scalars['String'];
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
  deleteManyBudgetsRecords: DeleteManyResponse;
  deleteOperation: Operation;
  generateManyBudgetsRecords: Array<BudgetRecord>;
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

export type MutationDeleteManyBudgetsRecordsArgs = {
  date: Scalars['String'];
};

export type MutationDeleteOperationArgs = {
  id: Scalars['Int'];
};

export type MutationGenerateManyBudgetsRecordsArgs = {
  input: GenerateBudgetsRecordsInput;
};

export type MutationRecreateManyBudgetsRecordsArgs = {
  input: Array<CreateBudgetRecordInput>;
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
  comment?: Maybe<Scalars['String']>;
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
  comment?: InputMaybe<Scalars['String']>;
  currencyId: Scalars['Int'];
  dateTime?: InputMaybe<Scalars['String']>;
  groupId: Scalars['Int'];
  withdrawalAmount?: InputMaybe<Scalars['Float']>;
  withdrawalCurrencyId?: InputMaybe<Scalars['Int']>;
};

export type OperationUpdateInput = {
  amount?: InputMaybe<Scalars['Float']>;
  categoryId?: InputMaybe<Scalars['Int']>;
  comment?: InputMaybe<Scalars['String']>;
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
  /**
   * ISO 8601
   * Must be presented in the local time of a web-client
   */
  dateTimeEnd?: InputMaybe<Scalars['String']>;
  /**
   * ISO 8601
   * Must be presented in the local time of a web-client
   */
  dateTimeStart?: InputMaybe<Scalars['String']>;
  groupId?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  budgets: Array<BudgetRecord>;
  budgetsSummary: Array<BudgetSummary>;
  categories: Array<Category>;
  category?: Maybe<Category>;
  currencies: Array<Currency>;
  currency?: Maybe<Currency>;
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

export type QueryCategoryArgs = {
  id: Scalars['Int'];
};

export type QueryCurrencyArgs = {
  id: Scalars['Int'];
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

export type CurrencyBaseFragment = {
  __typename?: 'Currency';
  id: number;
  name: string;
};

export type CategoryBaseFragment = {
  __typename?: 'Category';
  id: number;
  name: string;
  favorite: boolean;
};

export type GroupBaseFragment = {
  __typename?: 'Group';
  id: number;
  name: string;
};

export type GroupWithCategoriesFragment = {
  __typename?: 'Group';
  id: number;
  name: string;
  categories?: Array<{
    __typename?: 'Category';
    id: number;
    name: string;
    favorite: boolean;
  }> | null;
};

export type BudgetRecordBaseFragment = {
  __typename?: 'BudgetRecord';
  amount: number;
  date: string;
  currency: { __typename?: 'Currency'; id: number; name: string };
  category: {
    __typename?: 'Category';
    id: number;
    name: string;
    favorite: boolean;
  };
  group: { __typename?: 'Group'; id: number; name: string };
};

export type OperationBaseFragment = {
  __typename?: 'Operation';
  id: number;
  amount: number;
  dateTime: string;
  withdrawalAmount?: number | null;
  withdrawalCurrencyId?: number | null;
  comment?: string | null;
  currency: { __typename?: 'Currency'; id: number; name: string };
  category: {
    __typename?: 'Category';
    color?: string | null;
    id: number;
    name: string;
    favorite: boolean;
  };
  group: {
    __typename?: 'Group';
    color?: string | null;
    id: number;
    name: string;
  };
};

export type CurrenciesGroupsCategoriesQueryVariables = Exact<{
  [key: string]: never;
}>;

export type CurrenciesGroupsCategoriesQuery = {
  __typename?: 'Query';
  currencies: Array<{ __typename?: 'Currency'; id: number; name: string }>;
  groups: Array<{
    __typename?: 'Group';
    color?: string | null;
    id: number;
    name: string;
  }>;
  categories: Array<{
    __typename?: 'Category';
    color?: string | null;
    id: number;
    name: string;
    favorite: boolean;
  }>;
};

export type CurrenciesGroupsQueryVariables = Exact<{ [key: string]: never }>;

export type CurrenciesGroupsQuery = {
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
      favorite: boolean;
    }> | null;
  }>;
};

export type CurrenciesQueryVariables = Exact<{ [key: string]: never }>;

export type CurrenciesQuery = {
  __typename?: 'Query';
  currencies: Array<{ __typename?: 'Currency'; id: number; name: string }>;
};

export type CurrencyQueryVariables = Exact<{
  currencyId: Scalars['Int'];
}>;

export type CurrencyQuery = {
  __typename?: 'Query';
  currency?: { __typename?: 'Currency'; id: number; name: string } | null;
};

export type CategoryQueryVariables = Exact<{
  categoryId: Scalars['Int'];
}>;

export type CategoryQuery = {
  __typename?: 'Query';
  category?: {
    __typename?: 'Category';
    color?: string | null;
    id: number;
    name: string;
    favorite: boolean;
  } | null;
};

export type GroupsQueryVariables = Exact<{ [key: string]: never }>;

export type GroupsQuery = {
  __typename?: 'Query';
  groups: Array<{
    __typename?: 'Group';
    color?: string | null;
    id: number;
    name: string;
    categories?: Array<{
      __typename?: 'Category';
      color?: string | null;
      id: number;
      name: string;
      favorite: boolean;
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
    color?: string | null;
    id: number;
    name: string;
    categories?: Array<{
      __typename?: 'Category';
      color?: string | null;
      id: number;
      name: string;
      favorite: boolean;
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
    withdrawalCurrencyName?: string | null;
    id: number;
    amount: number;
    dateTime: string;
    withdrawalAmount?: number | null;
    withdrawalCurrencyId?: number | null;
    comment?: string | null;
    currency: { __typename?: 'Currency'; id: number; name: string };
    category: {
      __typename?: 'Category';
      color?: string | null;
      id: number;
      name: string;
      favorite: boolean;
    };
    group: {
      __typename?: 'Group';
      color?: string | null;
      id: number;
      name: string;
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
    comment?: string | null;
    currency: { __typename?: 'Currency'; id: number; name: string };
    category: {
      __typename?: 'Category';
      color?: string | null;
      id: number;
      name: string;
      favorite: boolean;
    };
    group: {
      __typename?: 'Group';
      color?: string | null;
      id: number;
      name: string;
    };
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
    prevPlannedAmount: number;
    prevSpentAmount: number;
    currentSpentAmount: number;
    amount: number;
    date: string;
    currency: { __typename?: 'Currency'; id: number; name: string };
    category: {
      __typename?: 'Category';
      id: number;
      name: string;
      favorite: boolean;
    };
    group: { __typename?: 'Group'; id: number; name: string };
  }>;
};

export type CurrenciesGroupsBudgetsQueryVariables = Exact<{
  params: BudgetsParams;
}>;

export type CurrenciesGroupsBudgetsQuery = {
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
      favorite: boolean;
    }> | null;
  }>;
  budgets: Array<{
    __typename?: 'BudgetRecord';
    prevPlannedAmount: number;
    prevSpentAmount: number;
    currentSpentAmount: number;
    amount: number;
    date: string;
    currency: { __typename?: 'Currency'; id: number; name: string };
    category: {
      __typename?: 'Category';
      id: number;
      name: string;
      favorite: boolean;
    };
    group: { __typename?: 'Group'; id: number; name: string };
  }>;
};

export type RecreateBudgetsRecordsMutationVariables = Exact<{
  input: Array<CreateBudgetRecordInput> | CreateBudgetRecordInput;
}>;

export type RecreateBudgetsRecordsMutation = {
  __typename?: 'Mutation';
  recreateManyBudgetsRecords: Array<{
    __typename?: 'BudgetRecord';
    amount: number;
    date: string;
    currency: { __typename?: 'Currency'; id: number; name: string };
    category: {
      __typename?: 'Category';
      id: number;
      name: string;
      favorite: boolean;
    };
    group: { __typename?: 'Group'; id: number; name: string };
  }>;
};

export type GenerateBudgetsRecordsMutationVariables = Exact<{
  input: GenerateBudgetsRecordsInput;
}>;

export type GenerateBudgetsRecordsMutation = {
  __typename?: 'Mutation';
  generateManyBudgetsRecords: Array<{
    __typename?: 'BudgetRecord';
    prevPlannedAmount: number;
    prevSpentAmount: number;
    currentSpentAmount: number;
    amount: number;
    date: string;
    currency: { __typename?: 'Currency'; id: number; name: string };
    category: {
      __typename?: 'Category';
      id: number;
      name: string;
      favorite: boolean;
    };
    group: { __typename?: 'Group'; id: number; name: string };
  }>;
};

export type DeleteManyBudgetsRecordsMutationVariables = Exact<{
  date: Scalars['String'];
}>;

export type DeleteManyBudgetsRecordsMutation = {
  __typename?: 'Mutation';
  deleteManyBudgetsRecords: {
    __typename?: 'DeleteManyResponse';
    count: number;
  };
};

export type DeleteOperationMutationVariables = Exact<{
  id: Scalars['Int'];
}>;

export type DeleteOperationMutation = {
  __typename?: 'Mutation';
  deleteOperation: { __typename?: 'Operation'; id: number };
};

export type DeleteCurrencyMutationVariables = Exact<{
  deleteCurrencyId: Scalars['Int'];
}>;

export type DeleteCurrencyMutation = {
  __typename?: 'Mutation';
  deleteCurrency: { __typename?: 'Currency'; id: number };
};

export type DeleteGroupMutationVariables = Exact<{
  deleteGroupId: Scalars['Int'];
}>;

export type DeleteGroupMutation = {
  __typename?: 'Mutation';
  deleteGroup: { __typename?: 'Group'; id: number };
};

export type DeleteCategoryMutationVariables = Exact<{
  deleteCategoryId: Scalars['Int'];
}>;

export type DeleteCategoryMutation = {
  __typename?: 'Mutation';
  deleteCategory: { __typename?: 'Category'; id: number };
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
    comment?: string | null;
    currency: { __typename?: 'Currency'; id: number; name: string };
    category: {
      __typename?: 'Category';
      color?: string | null;
      id: number;
      name: string;
      favorite: boolean;
    };
    group: {
      __typename?: 'Group';
      color?: string | null;
      id: number;
      name: string;
    };
  };
};

export type UpdateCurrencyMutationVariables = Exact<{
  updateCurrencyId: Scalars['Int'];
  name: Scalars['String'];
}>;

export type UpdateCurrencyMutation = {
  __typename?: 'Mutation';
  updateCurrency: { __typename?: 'Currency'; id: number; name: string };
};

export type UpdateGroupMutationVariables = Exact<{
  params: GroupUpdateInput;
}>;

export type UpdateGroupMutation = {
  __typename?: 'Mutation';
  updateGroup: {
    __typename?: 'Group';
    color?: string | null;
    id: number;
    name: string;
  };
};

export type UpdateCategoryMutationVariables = Exact<{
  params: CategoryUpdateInput;
}>;

export type UpdateCategoryMutation = {
  __typename?: 'Mutation';
  updateCategory: {
    __typename?: 'Category';
    color?: string | null;
    id: number;
    name: string;
    favorite: boolean;
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
    comment?: string | null;
    currency: { __typename?: 'Currency'; id: number; name: string };
    category: {
      __typename?: 'Category';
      color?: string | null;
      id: number;
      name: string;
      favorite: boolean;
    };
    group: {
      __typename?: 'Group';
      color?: string | null;
      id: number;
      name: string;
    };
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
    color?: string | null;
    id: number;
    name: string;
  };
};

export type CreateCategoryMutationVariables = Exact<{
  params: CategoryCreateInput;
}>;

export type CreateCategoryMutation = {
  __typename?: 'Mutation';
  createCategory: {
    __typename?: 'Category';
    color?: string | null;
    id: number;
    name: string;
    favorite: boolean;
  };
};

export const CategoryBaseFragmentDoc = gql`
  fragment CategoryBase on Category {
    id
    name
    favorite
  }
`;
export const GroupWithCategoriesFragmentDoc = gql`
  fragment GroupWithCategories on Group {
    id
    name
    categories {
      ...CategoryBase
    }
  }
  ${CategoryBaseFragmentDoc}
`;
export const CurrencyBaseFragmentDoc = gql`
  fragment CurrencyBase on Currency {
    id
    name
  }
`;
export const GroupBaseFragmentDoc = gql`
  fragment GroupBase on Group {
    id
    name
  }
`;
export const BudgetRecordBaseFragmentDoc = gql`
  fragment BudgetRecordBase on BudgetRecord {
    amount
    currency {
      ...CurrencyBase
    }
    category {
      ...CategoryBase
    }
    group {
      ...GroupBase
    }
    date
  }
  ${CurrencyBaseFragmentDoc}
  ${CategoryBaseFragmentDoc}
  ${GroupBaseFragmentDoc}
`;
export const OperationBaseFragmentDoc = gql`
  fragment OperationBase on Operation {
    id
    amount
    currency {
      ...CurrencyBase
    }
    category {
      ...CategoryBase
      color
    }
    group {
      ...GroupBase
      color
    }
    dateTime
    withdrawalAmount
    withdrawalCurrencyId
    comment
  }
  ${CurrencyBaseFragmentDoc}
  ${CategoryBaseFragmentDoc}
  ${GroupBaseFragmentDoc}
`;
export const CurrenciesGroupsCategoriesDocument = gql`
  query CurrenciesGroupsCategories {
    currencies {
      ...CurrencyBase
    }
    groups {
      ...GroupBase
      color
    }
    categories {
      ...CategoryBase
      color
    }
  }
  ${CurrencyBaseFragmentDoc}
  ${GroupBaseFragmentDoc}
  ${CategoryBaseFragmentDoc}
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
export const CurrenciesGroupsDocument = gql`
  query CurrenciesGroups {
    currencies {
      ...CurrencyBase
    }
    groups {
      ...GroupWithCategories
    }
  }
  ${CurrencyBaseFragmentDoc}
  ${GroupWithCategoriesFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class CurrenciesGroupsGQL extends Apollo.Query<
  CurrenciesGroupsQuery,
  CurrenciesGroupsQueryVariables
> {
  document = CurrenciesGroupsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const CurrenciesDocument = gql`
  query Currencies {
    currencies {
      ...CurrencyBase
    }
  }
  ${CurrencyBaseFragmentDoc}
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
export const CurrencyDocument = gql`
  query Currency($currencyId: Int!) {
    currency(id: $currencyId) {
      ...CurrencyBase
    }
  }
  ${CurrencyBaseFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class CurrencyGQL extends Apollo.Query<
  CurrencyQuery,
  CurrencyQueryVariables
> {
  document = CurrencyDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const CategoryDocument = gql`
  query Category($categoryId: Int!) {
    category(id: $categoryId) {
      ...CategoryBase
      color
    }
  }
  ${CategoryBaseFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class CategoryGQL extends Apollo.Query<
  CategoryQuery,
  CategoryQueryVariables
> {
  document = CategoryDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const GroupsDocument = gql`
  query Groups {
    groups {
      ...GroupBase
      color
      categories {
        ...CategoryBase
        color
      }
    }
  }
  ${GroupBaseFragmentDoc}
  ${CategoryBaseFragmentDoc}
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
      ...GroupBase
      color
      categories {
        ...CategoryBase
        color
      }
    }
  }
  ${GroupBaseFragmentDoc}
  ${CategoryBaseFragmentDoc}
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
      ...OperationBase
      withdrawalCurrencyName
    }
  }
  ${OperationBaseFragmentDoc}
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
      ...OperationBase
    }
  }
  ${OperationBaseFragmentDoc}
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
      ...BudgetRecordBase
      prevPlannedAmount
      prevSpentAmount
      currentSpentAmount
    }
  }
  ${BudgetRecordBaseFragmentDoc}
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
export const CurrenciesGroupsBudgetsDocument = gql`
  query CurrenciesGroupsBudgets($params: BudgetsParams!) {
    currencies {
      ...CurrencyBase
    }
    groups {
      ...GroupWithCategories
    }
    budgets(params: $params) {
      ...BudgetRecordBase
      prevPlannedAmount
      prevSpentAmount
      currentSpentAmount
    }
  }
  ${CurrencyBaseFragmentDoc}
  ${GroupWithCategoriesFragmentDoc}
  ${BudgetRecordBaseFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class CurrenciesGroupsBudgetsGQL extends Apollo.Query<
  CurrenciesGroupsBudgetsQuery,
  CurrenciesGroupsBudgetsQueryVariables
> {
  document = CurrenciesGroupsBudgetsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const RecreateBudgetsRecordsDocument = gql`
  mutation RecreateBudgetsRecords($input: [CreateBudgetRecordInput!]!) {
    recreateManyBudgetsRecords(input: $input) {
      ...BudgetRecordBase
    }
  }
  ${BudgetRecordBaseFragmentDoc}
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
export const GenerateBudgetsRecordsDocument = gql`
  mutation GenerateBudgetsRecords($input: GenerateBudgetsRecordsInput!) {
    generateManyBudgetsRecords(input: $input) {
      ...BudgetRecordBase
      prevPlannedAmount
      prevSpentAmount
      currentSpentAmount
    }
  }
  ${BudgetRecordBaseFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class GenerateBudgetsRecordsGQL extends Apollo.Mutation<
  GenerateBudgetsRecordsMutation,
  GenerateBudgetsRecordsMutationVariables
> {
  document = GenerateBudgetsRecordsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const DeleteManyBudgetsRecordsDocument = gql`
  mutation DeleteManyBudgetsRecords($date: String!) {
    deleteManyBudgetsRecords(date: $date) {
      count
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class DeleteManyBudgetsRecordsGQL extends Apollo.Mutation<
  DeleteManyBudgetsRecordsMutation,
  DeleteManyBudgetsRecordsMutationVariables
> {
  document = DeleteManyBudgetsRecordsDocument;

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
export const DeleteCurrencyDocument = gql`
  mutation DeleteCurrency($deleteCurrencyId: Int!) {
    deleteCurrency(id: $deleteCurrencyId) {
      id
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class DeleteCurrencyGQL extends Apollo.Mutation<
  DeleteCurrencyMutation,
  DeleteCurrencyMutationVariables
> {
  document = DeleteCurrencyDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const DeleteGroupDocument = gql`
  mutation DeleteGroup($deleteGroupId: Int!) {
    deleteGroup(id: $deleteGroupId) {
      id
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class DeleteGroupGQL extends Apollo.Mutation<
  DeleteGroupMutation,
  DeleteGroupMutationVariables
> {
  document = DeleteGroupDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const DeleteCategoryDocument = gql`
  mutation DeleteCategory($deleteCategoryId: Int!) {
    deleteCategory(id: $deleteCategoryId) {
      id
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class DeleteCategoryGQL extends Apollo.Mutation<
  DeleteCategoryMutation,
  DeleteCategoryMutationVariables
> {
  document = DeleteCategoryDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const UpdateOperationDocument = gql`
  mutation UpdateOperation($params: OperationUpdateInput!) {
    updateOperation(params: $params) {
      ...OperationBase
    }
  }
  ${OperationBaseFragmentDoc}
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
export const UpdateCurrencyDocument = gql`
  mutation UpdateCurrency($updateCurrencyId: Int!, $name: String!) {
    updateCurrency(id: $updateCurrencyId, name: $name) {
      ...CurrencyBase
    }
  }
  ${CurrencyBaseFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class UpdateCurrencyGQL extends Apollo.Mutation<
  UpdateCurrencyMutation,
  UpdateCurrencyMutationVariables
> {
  document = UpdateCurrencyDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const UpdateGroupDocument = gql`
  mutation UpdateGroup($params: GroupUpdateInput!) {
    updateGroup(params: $params) {
      ...GroupBase
      color
    }
  }
  ${GroupBaseFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class UpdateGroupGQL extends Apollo.Mutation<
  UpdateGroupMutation,
  UpdateGroupMutationVariables
> {
  document = UpdateGroupDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const UpdateCategoryDocument = gql`
  mutation UpdateCategory($params: CategoryUpdateInput!) {
    updateCategory(params: $params) {
      ...CategoryBase
      color
    }
  }
  ${CategoryBaseFragmentDoc}
`;

@Injectable({
  providedIn: 'root',
})
export class UpdateCategoryGQL extends Apollo.Mutation<
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables
> {
  document = UpdateCategoryDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const CreateOperationDocument = gql`
  mutation CreateOperation($params: OperationCreateInput!) {
    createOperation(params: $params) {
      ...OperationBase
    }
  }
  ${OperationBaseFragmentDoc}
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
      ...CurrencyBase
    }
  }
  ${CurrencyBaseFragmentDoc}
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
      ...GroupBase
      color
    }
  }
  ${GroupBaseFragmentDoc}
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
      ...CategoryBase
      color
    }
  }
  ${CategoryBaseFragmentDoc}
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
