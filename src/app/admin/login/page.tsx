'use client';

import { useState, useTransition } from 'react';
import { Leaf } from 'lucide-react';
import Link from 'next/link';
import { signIn } from '@/lib/auth/actions';

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await signIn(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF8E1] px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Brand */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#2D5016]/10 mb-4">
              <Leaf className="w-7 h-7 text-[#2D5016]" />
            </div>
            <h1 className="text-2xl font-bold text-[#2D5016] tracking-tight">
              Murphy&apos;s Turf
            </h1>
            <p className="text-sm text-[#5D4037] mt-1">Admin Portal</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#212121] mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="admin@murphysturf.com"
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-[#212121] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7CB342] focus:border-transparent transition"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#212121] mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="Enter your password"
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-[#212121] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7CB342] focus:border-transparent transition"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-lg bg-[#2D5016] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#7CB342] focus:outline-none focus:ring-2 focus:ring-[#7CB342] focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition cursor-pointer"
            >
              {isPending ? 'Signing in...' : 'Sign In to Admin'}
            </button>
          </form>

          {/* Back link */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-[#5D4037] hover:text-[#2D5016] transition"
            >
              &larr; Back to website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
