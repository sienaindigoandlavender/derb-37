import { marked } from 'marked';
import type { Entry } from '@/lib/content';

export default function RecipeCard({ entry }: { entry: Entry }) {
  if (!entry.has_recipe) return null;
  const sections = entry.recipe_sections || [];
  const methodHtml = entry.recipe_method
    ? (marked.parse(entry.recipe_method, { async: false }) as string)
    : '';

  return (
    <div className="px-6">
      <aside className="recipe-card">
        <span aria-hidden className="corner-tr" />
        <span aria-hidden className="corner-bl" />

        <p className="eyebrow text-center mb-5">A Recipe</p>

        <h3 className="font-display italic text-[30px] md:text-[34px] leading-tight text-center text-ink mb-2">
          {entry.recipe_title}
        </h3>

        {entry.recipe_yield && (
          <p className="text-center font-display italic text-secondary text-[15px] mb-6">
            {entry.recipe_yield}
          </p>
        )}

        <div className="ornament-rule mb-8">
          <span className="ornament">✦</span>
        </div>

        {sections.map((section, idx) => (
          <div key={idx} className="mb-7">
            <p className="eyebrow mb-3">{section.label}</p>
            <ul className="space-y-0">
              {section.ingredients.map((ing, i) => (
                <li key={i} className="recipe-ingredient-row">
                  <span className="text-ink-soft text-[16px]">{ing}</span>
                  <span className="dot-leader" aria-hidden />
                </li>
              ))}
            </ul>
          </div>
        ))}

        {methodHtml && (
          <>
            <div className="ornament-rule my-8">
              <span className="ornament">✦</span>
            </div>
            <p className="eyebrow text-center mb-5">The Method</p>
            <div
              className="entry-body !text-[17px] !leading-[1.7] [&>p]:mb-4 [&>p:first-of-type::first-letter]:!float-none [&>p:first-of-type::first-letter]:!text-inherit [&>p:first-of-type::first-letter]:!font-inherit [&>p:first-of-type::first-letter]:!color-inherit"
              dangerouslySetInnerHTML={{ __html: methodHtml }}
            />
          </>
        )}
      </aside>
    </div>
  );
}
