"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setJoined(true);
  };

  if (joined) {
    return (
      <p className="text-xs text-green-600 font-semibold pt-1">
        ✓ You&apos;re on the list!
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="bg-white border border-slate-200 text-xs px-3 py-2 rounded flex-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 text-xs font-bold rounded hover:bg-blue-700 transition-colors"
      >
        JOIN
      </button>
    </form>
  );
}
