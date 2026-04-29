'use client';

import { useState, FormEvent } from 'react';

type Status = 'idle' | 'submitting' | 'sent' | 'confirmed' | 'error';

export default function SubscribeForm({ sourcePage = '/letters' }: { sourcePage?: string }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('submitting');
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

  if (status === 'sent') {
    return (
      <p className="font-display italic text-[19px] text-ink-soft text-center max-w-md mx-auto">
        Look in your inbox — there's a letter to confirm. Click the link
        and you'll be on the list.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto" noValidate>
      <label htmlFor="subscribe-email" className="sr-only">
        Email address
      </label>
      <input
        id="subscribe-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your email"
        className="field-input text-center"
        disabled={status === 'submitting'}
      />
      <div className="mt-8 text-center">
        <button type="submit" className="button-letterpress" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Subscribe'}
        </button>
      </div>
      {status === 'error' && message && (
        <p className="mt-6 text-center text-rust font-display italic text-[15px]">{message}</p>
      )}
    </form>
  );
}
