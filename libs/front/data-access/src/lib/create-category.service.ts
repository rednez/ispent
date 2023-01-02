import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular';
import { CreateCategoryGQL } from './graphql/generated';

@Injectable({
  providedIn: 'root',
})
export class CreateCategoryService {
  constructor(private createCategoryGQL: CreateCategoryGQL) {}

  create$(params: { groupId: number; name: string }) {
    const { name, groupId } = params;
    return this.createCategoryGQL.mutate(
      {
        params: {
          name,
          groupId,
        },
      },
      {
        update: (cache, { data }) => {
          cache.modify({
            id: cache.identify({
              __typename: 'Group',
              id: groupId,
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
}
