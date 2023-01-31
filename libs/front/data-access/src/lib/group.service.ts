import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular';
import {
  BudgetSummary,
  CreateGroupGQL,
  Group,
  UpdateGroupGQL,
} from './graphql/generated';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(
    private createGroupGQL: CreateGroupGQL,
    private updateGroupGQL: UpdateGroupGQL
  ) {}

  create$(params: { name: string; color: string }) {
    return this.createGroupGQL.mutate(
      { params },
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
                      name
                      color
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

  update$(params: { id: number; name: string; color: string }) {
    return this.updateGroupGQL.mutate(
      { params },
      {
        update: (cache, result) => {
          cache.modify({
            fields: {
              budgetsSummary(existingBudgetsSummaryRefs = []) {
                const item = existingBudgetsSummaryRefs.find(
                  (i: BudgetSummary) =>
                    i.parentId === params.id && i.type === 'GROUP'
                );
                return item
                  ? [
                      {
                        ...item,
                        title: result.data?.updateGroup.name,
                        color: result.data?.updateGroup.color,
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
}
