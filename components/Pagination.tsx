import Link from 'next/link';

export default function Pagination({
  basePath,
  page,
  total,
  perPage,
}: {
  basePath: string;
  page: number;
  total: number;
  perPage: number;
}) {
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  if (totalPages <= 1) return null;

  const prevHref = page > 1 ? (page === 2 ? basePath : `${basePath}?page=${page - 1}`) : null;
  const nextHref = page < totalPages ? `${basePath}?page=${page + 1}` : null;

  return (
    <nav className="px-6 pb-20 mx-auto max-w-3xl flex items-center justify-between font-sc text-[11px] tracking-[0.32em] uppercase text-secondary">
      <div>
        {prevHref ? (
          <Link href={prevHref} className="hover:text-rust transition-colors">
            ← Newer
          </Link>
        ) : (
          <span className="opacity-30">← Newer</span>
        )}
      </div>
      <div className="font-display italic text-[15px] tracking-normal normal-case">
        {page} of {totalPages}
      </div>
      <div>
        {nextHref ? (
          <Link href={nextHref} className="hover:text-rust transition-colors">
            Older →
          </Link>
        ) : (
          <span className="opacity-30">Older →</span>
        )}
      </div>
    </nav>
  );
}
