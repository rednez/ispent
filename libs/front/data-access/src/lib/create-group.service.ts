import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular';
import { CreateGroupGQL } from './graphql/generated';

@Injectable({
  providedIn: 'root',
})
export class CreateGroupService {
  constructor(private createGroupGQL: CreateGroupGQL) {}

  create$(name: string) {
    return this.createGroupGQL.mutate(
      { params: { name } },
      {
        update: (cache, { data }) => {
          cache.modify({
            fields: {
              groups(existingGroupsRef = []) {
                const newGroupRef = cache.writeFragment({
                  data: data?.createGroup,
                  fragment: gql`
                    fragment NewGroup on Group {
                      id
                    }
                  `,
                });
                return [...existingGroupsRef, newGroupRef];
              },
            },
          });
        },
      }
    );
  }
}
