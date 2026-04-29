import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { AppError } from '../utils/errors';
import { Product as IProduct } from '../types';

export class ProductService {
  async getAllProducts(filters?: { category?: string; search?: string; page?: number; limit?: number }) {
    let query: any = { isActive: true };

    if (filters?.category) {
      const category = await Category.findOne({ slug: filters.category });
      if (category) {
        query.category = category._id;
      }
    }

    if (filters?.search) {
      query.$text = { $search: filters.search };
    }

    const page = filters?.page || 1;
    const limit = filters?.limit || 20;
    const skip = (page - 1) * limit;

    const products = await Product.find(query)
      .populate('category')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(query);

    return {
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getProductById(id: string): Promise<IProduct> {
    const product = await Product.findById(id).populate('category');

    if (!product) {
      throw new AppError(404, 'Product not found');
    }

    return product.toObject() as IProduct;
  }

  async getFeaturedProducts(limit = 8): Promise<IProduct[]> {
    const products = await Product.find({ isActive: true })
      .populate('category')
      .sort({ createdAt: -1 })
      .limit(limit);

    return products.map((p) => p.toObject() as IProduct);
  }

  async getProductsByCategory(categorySlug: string): Promise<IProduct[]> {
    const category = await Category.findOne({ slug: categorySlug });

    if (!category) {
      throw new AppError(404, 'Category not found');
    }

    const products = await Product.find({ category: category._id, isActive: true }).populate('category');

    return products.map((p) => p.toObject() as IProduct);
  }
}

export const productService = new ProductService();
