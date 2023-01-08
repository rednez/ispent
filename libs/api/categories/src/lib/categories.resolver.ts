import { CurrentUserId } from '@ispent/api/auth';
import {
  Category,
  CategoryCreateInput,
  CategoryUpdateInput,
} from '@ispent/api/data-access';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';

@Resolver('Category')
export class CategoriesResolver {
  constructor(private categoriesService: CategoriesService) {}

  @Query()
  async categories(@CurrentUserId() uid): Promise<Category[]> {
    return this.categoriesService.findAll(uid);
  }

  @Mutation()
  async createCategory(
    @Args('params') params: CategoryCreateInput,
    @CurrentUserId() uid
  ): Promise<Category> {
    return this.categoriesService.create(params, uid);
  }

  @Mutation()
  async updateCategory(
    @Args('params') params: CategoryUpdateInput
  ): Promise<Category> {
    return this.categoriesService.update(params);
  }

  @Mutation()
  async deleteCategory(@Args('id') id: number): Promise<Category> {
    return this.categoriesService.deleteCategory(id);
  }
}
