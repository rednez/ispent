import { Category } from '@ispent/shared/data-access';
import { Query, Resolver } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';

@Resolver('Category')
export class CategoriesResolver {
  constructor(private categoriesService: CategoriesService) {}

  @Query()
  async categories(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }
}
