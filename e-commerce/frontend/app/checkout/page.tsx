'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCartStore } from '@/lib/store';
import { ordersAPI, aiAPI } from '@/lib/api';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

interface ShippingForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

function CheckoutForm() {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const { items, getTotal, clearCart } = useCartStore();

  const [formData, setFormData] = useState<ShippingForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [guidance, setGuidance] = useState<string[]>([]);

  useEffect(() => {
    if (items.length === 0) return;
    aiAPI
      .getCheckoutGuidance(items.map((i) => ({ name: i.name, price: i.price, quantity: i.quantity })))
      .then((res) => {
        if (res.data.tips) setGuidance(res.data.tips);
      })
      .catch(() => {});
  }, [items]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setError('');
    setLoading(true);

    try {
      const total = getTotal();
      const grandTotal = total + (total >= 50 ? 0 : 9.99) + total * 0.08;

      // 1. Create order first to get orderId
      const orderRes = await ordersAPI.create({
        ...formData,
        items: items.map((item) => ({
          productId: String(item.id),
          quantity: item.quantity,
          price: item.price,
        })),
      });

      const orderId = orderRes.data.order?._id || orderRes.data._id;

      // 2. Create Stripe payment intent
      const intentRes = await ordersAPI.createPaymentIntent({
        amount: Math.round(grandTotal * 100),
        orderId,
      });

      const { clientSecret } = intentRes.data;

      // 3. Confirm card payment
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error('Card element not found');

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone,
            address: {
              line1: formData.address,
              city: formData.city,
              state: formData.state,
              postal_code: formData.zipCode,
              country: 'US',
            },
          },
        },
      });

      if (stripeError) {
        setError(stripeError.message || 'Payment failed');
        return;
      }

      if (paymentIntent?.status === 'succeeded') {
        await ordersAPI.updatePaymentStatus({
          orderId,
          paymentIntentId: paymentIntent.id,
          status: 'paid',
        });
        clearCart();
        router.push('/checkout/success');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Checkout failed';
      setError((err as any)?.response?.data?.message || msg);
    } finally {
      setLoading(false);
    }
  };

  const total = getTotal();
  const shipping = total >= 50 ? 0 : 9.99;
  const tax = total * 0.08;
  const grandTotal = total + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">Your cart is empty</h2>
          <a href="/" className="text-blue-600 hover:underline">
            Continue shopping
          </a>
        </div>
      </div>
    );
  }

  const inputClass =
    'w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500';

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

        {guidance.length > 0 && (
          <div className="mb-6 rounded-lg bg-blue-50 p-4">
            <h3 className="mb-2 font-semibold text-blue-900">Checkout Tips</h3>
            <ul className="list-inside list-disc text-sm text-blue-800">
              {guidance.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-6 text-xl font-semibold">Shipping Information</h2>

              {error && (
                <div className="mb-4 rounded bg-red-50 p-3 text-red-600">{error}</div>
              )}

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">First Name *</label>
                  <input name="firstName" required value={formData.firstName} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Last Name *</label>
                  <input name="lastName" required value={formData.lastName} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Email *</label>
                  <input name="email" type="email" required value={formData.email} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Phone *</label>
                  <input name="phone" type="tel" required value={formData.phone} onChange={handleChange} className={inputClass} />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-gray-700">Address *</label>
                  <input name="address" required value={formData.address} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">City *</label>
                  <input name="city" required value={formData.city} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">State *</label>
                  <input name="state" required value={formData.state} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">ZIP Code *</label>
                  <input name="zipCode" required value={formData.zipCode} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Country</label>
                  <input name="country" value={formData.country} onChange={handleChange} className={inputClass} />
                </div>
              </div>

              <h2 className="mb-6 mt-8 text-xl font-semibold">Payment Information</h2>
              <div className="rounded-md border p-4">
                <CardElement
                  options={{
                    style: {
                      base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4' } },
                      invalid: { color: '#9e2146' },
                    },
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading || !stripe}
                className="mt-6 w-full rounded-lg bg-gray-900 py-3 font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
              >
                {loading ? 'Processing...' : `Pay $${grandTotal.toFixed(2)}`}
              </button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-4 rounded-lg bg-white p-6 shadow">
              <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>

              <div className="mb-4 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t pt-2 text-lg font-bold">
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {total < 50 && (
                <p className="mt-4 text-sm text-green-600">
                  Add ${(50 - total).toFixed(2)} more for free shipping!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
