'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="py-12 text-center border-t border-border">
      <p className="post-category mb-4">Notes from the house</p>

      {status === 'success' ? (
        <p className="text-sm text-muted italic">Thank you. You&apos;ll hear from me when the season changes.</p>
      ) : (
        <form onSubmit={handleSubmit} className="inline-flex max-w-sm">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your email"
            required
            className="flex-1 px-3 py-2 border border-border text-sm font-serif text-body bg-white outline-none placeholder:text-light"
            style={{ borderRight: 'none' }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-5 py-2 border border-border text-xs tracking-widest uppercase font-sans text-muted bg-white cursor-pointer hover:text-ink hover:border-ink transition-colors disabled:opacity-50"
          >
            {status === 'loading' ? '...' : 'Subscribe'}
          </button>
        </form>
      )}
      {status === 'error' && (
        <p className="text-xs text-muted mt-2">Something went wrong. Please try again.</p>
      )}
    </div>
  );
}
