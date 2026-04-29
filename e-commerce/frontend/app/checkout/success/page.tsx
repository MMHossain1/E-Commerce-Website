import Link from 'next/link';

export default function CheckoutSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="mx-auto max-w-md rounded-lg bg-white p-10 text-center shadow-lg">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h1 className="mb-2 text-3xl font-bold text-gray-900">Order Confirmed!</h1>
        <p className="mb-8 text-gray-500">
          Thank you for your purchase. We&apos;ve received your order and will begin processing it shortly.
          You&apos;ll receive a confirmation email with your order details.
        </p>

        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
          >
            Continue Shopping
          </Link>
          <Link
            href="/orders"
            className="block w-full rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            View My Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
