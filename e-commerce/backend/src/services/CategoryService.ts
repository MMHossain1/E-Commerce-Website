import { Category } from '../models/Category';
import { AppError } from '../utils/errors';
import { Category as ICategory } from '../types';

export class CategoryService {
  async getAllCategories(): Promise<ICategory[]> {
    const categories = await Category.find().sort({ name: 1 });
    return categories.map((c) => c.toObject() as ICategory);
  }

  async getCategoryBySlug(slug: string): Promise<ICategory> {
    const category = await Category.findOne({ slug });

    if (!category) {
      throw new AppError(404, 'Category not found');
    }

    return category.toObject() as ICategory;
  }
}

export const categoryService = new CategoryService();
