export default function PageHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="px-6 pt-6 pb-14 text-center">
      <p className="eyebrow mb-5">{eyebrow}</p>
      <h1 className="display-headline italic text-[44px] md:text-[60px] mb-4">
        {title}
      </h1>
      {subtitle && (
        <p className="font-display italic text-secondary text-[19px] max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="ornament-rule mt-8 mx-auto max-w-md">
        <span className="ornament">✦</span>
      </div>
    </header>
  );
}
