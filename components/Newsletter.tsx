'use client';

import { useState } from 'react';

export default function Newsletter({ sourcePage = '/' }: { sourcePage?: string }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setMessage(null);
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source_page: sourcePage }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus('error');
        setMessage(data?.error || 'Something went wrong.');
        return;
      }
      setStatus('sent');
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Something went wrong.');
    }
  }

  return (
    <div className="py-12 text-center border-t border-border">
      <p className="post-category mb-6">Notes from the house</p>

      {status === 'sent' ? (
        <p className="text-sm text-secondary italic max-w-sm mx-auto">
          Look in your inbox — there's a letter to confirm. Click the link
          and you'll be on the list.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="inline-flex max-w-sm">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your email"
            required
            className="flex-1 px-3 py-2 border border-border text-sm font-serif text-body bg-paper outline-none placeholder:text-light"
            style={{ borderRight: 'none' }}
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-5 py-2 border border-border text-xs tracking-widest uppercase font-sans text-muted bg-paper cursor-pointer hover:text-ink hover:border-ink transition-colors disabled:opacity-50"
          >
            {status === 'loading' ? '...' : 'Subscribe'}
          </button>
        </form>
      )}
      {status === 'error' && (
        <p className="text-xs text-muted mt-3 italic">
          {message || 'Something went wrong. Please try again.'}
        </p>
      )}
    </div>
  );
}
