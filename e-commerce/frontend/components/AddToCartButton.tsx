'use client';

import { useCartStore } from '@/lib/store';

interface Props {
  product: {
    id: string;
    name: string;
    price: number;
    image?: string;
  };
  variant?: 'primary' | 'outline';
}

export default function AddToCartButton({ product, variant = 'primary' }: Props) {
  const addItem = useCartStore((state) => state.addItem);

  const handleClick = () => {
    addItem({
      id: product.id as unknown as number,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
  };

  return (
    <button
      onClick={handleClick}
      className={
        variant === 'primary'
          ? 'mt-3 w-full rounded bg-gray-900 py-2 text-sm font-medium text-white transition hover:bg-gray-700'
          : 'mt-3 w-full rounded border border-gray-900 py-2 text-sm font-medium transition hover:bg-gray-900 hover:text-white'
      }
    >
      Add to Cart
    </button>
  );
}
