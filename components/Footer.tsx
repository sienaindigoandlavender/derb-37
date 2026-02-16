import Link from 'next/link';
import { getNexusContentSites } from '@/lib/data';

export default async function Footer() {
  const contentSites = await getNexusContentSites();

  return (
    <footer>
      {/* Level 1 */}
      <div className="bg-[#1f1f1f] px-6 pt-12 pb-9">
        <div className="max-w-column mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="font-serif text-lg text-white/60 mb-2">Derb 37</p>
            <p className="text-xs text-white/30 leading-relaxed font-sans">
              A food and life journal from inside a 300-year-old house in the Marrakech medina.
            </p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-white/20 mb-3 font-sans">Sections</p>
            <div className="space-y-2">
              <Link href="/kitchen" className="block text-xs text-white/40 hover:text-white/70 transition-colors font-sans">Kitchen</Link>
              <Link href="/culture" className="block text-xs text-white/40 hover:text-white/70 transition-colors font-sans">My Morocco</Link>
              <Link href="/behind-the-walls" className="block text-xs text-white/40 hover:text-white/70 transition-colors font-sans">Behind the Walls</Link>
            </div>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-white/20 mb-3 font-sans">Elsewhere</p>
            <div className="space-y-2">
              <a href="https://instagram.com/derb37" target="_blank" rel="noopener noreferrer" className="block text-xs text-white/40 hover:text-white/70 transition-colors font-sans">Instagram</a>
              <a href="https://pinterest.com/derb37" target="_blank" rel="noopener noreferrer" className="block text-xs text-white/40 hover:text-white/70 transition-colors font-sans">Pinterest</a>
              <a href="https://riaddisiena.com" target="_blank" rel="noopener noreferrer" className="block text-xs text-white/40 hover:text-white/70 transition-colors font-sans">Riad di Siena</a>
            </div>
          </div>
        </div>
      </div>

      {/* Level 2 — Content Network */}
      <div className="bg-[#161616] px-6 py-4 flex gap-6 flex-wrap justify-center">
        {contentSites.length > 0
          ? contentSites.map((site) => (
              <a key={site.id} href={`https://${site.site_url}`} target="_blank" rel="noopener noreferrer" className="text-[10px] text-white/25 hover:text-white/45 tracking-[0.04em] font-sans transition-colors">{site.site_label}</a>
            ))
          : (
            <>
              <a href="https://architectureofmorocco.com" target="_blank" rel="noopener noreferrer" className="text-[10px] text-white/25 hover:text-white/45 tracking-[0.04em] font-sans transition-colors">Architecture of Morocco</a>
              <a href="https://cuisinesofmorocco.com" target="_blank" rel="noopener noreferrer" className="text-[10px] text-white/25 hover:text-white/45 tracking-[0.04em] font-sans transition-colors">Cuisines of Morocco</a>
              <a href="https://musicinmorocco.com" target="_blank" rel="noopener noreferrer" className="text-[10px] text-white/25 hover:text-white/45 tracking-[0.04em] font-sans transition-colors">Music in Morocco</a>
              <a href="https://beforetheword.com" target="_blank" rel="noopener noreferrer" className="text-[10px] text-white/25 hover:text-white/45 tracking-[0.04em] font-sans transition-colors">Before the Word</a>
              <a href="https://derb.so" target="_blank" rel="noopener noreferrer" className="text-[10px] text-white/25 hover:text-white/45 tracking-[0.04em] font-sans transition-colors">derb</a>
            </>
          )
        }
      </div>

      {/* Level 3 — Legal + Google Translate */}
      <div className="bg-[#0e0e0e] px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="flex gap-6">
          <Link href="/privacy" className="text-[10px] text-white/18 hover:text-white/40 tracking-[0.04em] font-sans transition-colors">Privacy</Link>
          <Link href="/terms" className="text-[10px] text-white/18 hover:text-white/40 tracking-[0.04em] font-sans transition-colors">Terms</Link>
          <span className="text-[10px] text-white/18 tracking-[0.04em] font-sans">
            &copy; {new Date().getFullYear()}{' '}
            <a href="https://riaddisiena.com" target="_blank" rel="noopener noreferrer" className="text-white/18 hover:text-white/40 transition-colors">Riad di Siena</a>
          </span>
        </div>
        <div id="google_translate_element" />
        <GoogleTranslateScript />
      </div>
    </footer>
  );
}

function GoogleTranslateScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          function googleTranslateElementInit() {
            new google.translate.TranslateElement({
              pageLanguage: 'en',
              layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false
            }, 'google_translate_element');
          }
          (function() {
            var s = document.createElement('script');
            s.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            document.head.appendChild(s);
          })();
        `,
      }}
    />
  );
}
