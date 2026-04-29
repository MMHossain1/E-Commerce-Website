import { Response } from 'express';
import { AuthRequest, asyncHandler } from '../middleware/errorHandler';
import { productService } from '../services/ProductService';

export class ProductController {
  getAll = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { category, search, page, limit } = req.query;
    const result = await productService.getAllProducts({
      category: category as string,
      search: search as string,
      page: page ? parseInt(page as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
    });
    res.json(result);
  });

  getById = asyncHandler(async (req: AuthRequest, res: Response) => {
    const product = await productService.getProductById(req.params.id);
    res.json(product);
  });

  getFeatured = asyncHandler(async (req: AuthRequest, res: Response) => {
    const products = await productService.getFeaturedProducts();
    res.json(products);
  });

  getByCategory = asyncHandler(async (req: AuthRequest, res: Response) => {
    const products = await productService.getProductsByCategory(req.params.slug);
    res.json(products);
  });
}

export const productController = new ProductController();
