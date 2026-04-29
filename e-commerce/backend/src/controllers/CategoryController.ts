import { Response } from 'express';
import { AuthRequest, asyncHandler } from '../middleware/errorHandler';
import { categoryService } from '../services/CategoryService';

export class CategoryController {
  getAll = asyncHandler(async (req: AuthRequest, res: Response) => {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  });

  getBySlug = asyncHandler(async (req: AuthRequest, res: Response) => {
    const category = await categoryService.getCategoryBySlug(req.params.slug);
    res.json(category);
  });
}

export const categoryController = new CategoryController();
