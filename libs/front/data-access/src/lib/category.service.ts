import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular';
import {
  BudgetSummary,
  CreateCategoryGQL,
  Group,
  UpdateCategoryGQL,
} from './graphql/generated';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(
    private createCategoryGQL: CreateCategoryGQL,
    private updateCategoryGQL: UpdateCategoryGQL
  ) {}

  create$(params: {
    groupId: number;
    name: string;
    color: string;
    favorite: boolean;
  }) {
    return this.createCategoryGQL.mutate(
      { params },
      {
        update: (cache, { data }) => {
          cache.modify({
            id: cache.identify({
              __typename: 'Group',
              id: params.groupId,
            }),
            fields: {
              categories(existingCategoriesRef = []) {
                const newCategoryRef = cache.writeFragment({
                  data: data?.createCategory,
                  fragment: gql`
                    fragment NewCategory on Category {
                      id
                      name
                      color
                    }
                  `,
                });
                return [...existingCategoriesRef, newCategoryRef];
              },
            },
          });
        },
      }
    );
  }

  update$(params: {
    id: number;
    name: string;
    color: string;
    favorite: boolean;
  }) {
    return this.updateCategoryGQL.mutate(
      { params },
      {
        update: (cache, result) => {
          cache.modify({
            fields: {
              budgetsSummary(existingBudgetsSummaryRefs = []) {
                const item = existingBudgetsSummaryRefs.find(
                  (i: BudgetSummary) =>
                    i.parentId === params.id && i.type === 'CATEGORY'
                );
                return item
                  ? [
                      {
                        ...item,
                        title: result.data?.updateCategory.name,
                        color: result.data?.updateCategory.color,
                      },
                    ]
                  : existingBudgetsSummaryRefs;
              },
            },
          });
        },
      }
    );
  }

  findParentGroupId(categoryId: number, groups: Group[]): number | undefined {
    const categories = groups.reduce((acc, val) => {
      const valCategories = val.categories || [];
      return [
        ...acc,
        ...valCategories.map((c) => ({
          ...c,
          groupId: val.id,
        })),
      ];
    }, [] as Array<{ id: number; name: string; groupId: number }>);
    const category = categories.find((i) => i.id === categoryId);
    return category?.groupId;
  }
}
