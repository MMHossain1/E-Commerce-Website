'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { productsAPI } from '@/lib/api';
import { useCartStore } from '@/lib/store';

interface Product {
  id: number;
  name: string;
  price: string;
  compare_at_price: string | null;
  image: string | null;
  category: { name: string };
  is_on_sale: boolean;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, featuredRes, categoriesRes] = await Promise.all([
          productsAPI.getAll(),
          productsAPI.getFeatured(),
          productsAPI.getCategories(),
        ]);
        setProducts(productsRes.data.results || productsRes.data);
        setFeaturedProducts(featuredRes.data);
        setCategories(categoriesRes.data.results || categoriesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      quantity: 1,
      image: product.image || undefined,
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-700 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-2xl">
            <h1 className="mb-6 text-5xl font-bold leading-tight">
              Discover Amazing Products
            </h1>
            <p className="mb-8 text-xl text-gray-200">
              Shop the latest trends with our curated collection. 
              Fast shipping, easy returns, and 24/7 support.
            </p>
            <div className="flex gap-4">
              <Link
                href="#products"
                className="rounded-full bg-white px-8 py-3 font-semibold text-gray-900 transition hover:bg-gray-100"
              >
                Shop Now
              </Link>
              <Link
                href="/auth/signup"
                className="rounded-full border-2 border-white px-8 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-3xl font-bold">Shop by Category</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {categories.slice(0, 8).map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="group flex flex-col items-center rounded-lg border p-6 transition hover:border-gray-400 hover:shadow-lg"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-2xl">
                  🛍️
                </div>
                <span className="font-medium group-hover:text-gray-600">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link href="/products" className="text-gray-600 hover:text-gray-900">
              View All →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.slice(0, 8).map((product) => (
              <div
                key={product.id}
                className="group overflow-hidden rounded-lg bg-white shadow-sm transition hover:shadow-lg"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-4xl">
                      📦
                    </div>
                  )}
                  {product.is_on_sale && (
                    <span className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
                      SALE
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <p className="mb-1 text-xs text-gray-500">{product.category?.name}</p>
                  <h3 className="mb-2 font-semibold">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">${product.price}</span>
                    {product.compare_at_price && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.compare_at_price}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-3 w-full rounded bg-gray-900 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Products */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-3xl font-bold">All Products</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 12).map((product) => (
              <div
                key={product.id}
                className="group overflow-hidden rounded-lg border shadow-sm transition hover:shadow-lg"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-4xl">
                      📦
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="mb-1 text-xs text-gray-500">{product.category?.name}</p>
                  <h3 className="mb-2 font-semibold">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">${product.price}</span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-3 w-full rounded border border-gray-900 py-2 text-sm font-medium transition hover:bg-gray-900 hover:text-white"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 text-4xl">🚚</div>
              <h3 className="mb-2 text-xl font-bold">Free Shipping</h3>
              <p className="text-gray-400">On orders over $50</p>
            </div>
            <div className="text-center">
              <div className="mb-4 text-4xl">🛡️</div>
              <h3 className="mb-2 text-xl font-bold">Secure Payment</h3>
              <p className="text-gray-400">100% secure transactions</p>
            </div>
            <div className="text-center">
              <div className="mb-4 text-4xl">↩️</div>
              <h3 className="mb-2 text-xl font-bold">Easy Returns</h3>
              <p className="text-gray-400">30-day return policy</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
