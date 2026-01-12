import { useMemo, useState } from "react";
import { RuleList } from "../components/RuleList";
import { SECTION_ORDER, SECTION_RULES, SECTION_TITLES, type SectionId } from "../features/grammar/c23Grammar";

export default function App() {
  const [query, setQuery] = useState("");

  const filterNames = (names: string[]) => {
    const q = query.trim().toLowerCase();
    if (!q) return names;
    return names.filter((n) => n.toLowerCase().includes(q));
  };

  const filteredBySection: Record<SectionId, string[]> = useMemo(() => {
    const out = {} as Record<SectionId, string[]>;
    for (const s of SECTION_ORDER) out[s] = filterNames(SECTION_RULES[s]);
    return out;
  }, [query]);

  return (
    <>
      <header>
        <h1 style={{ margin: 0 }}>C (C23) Language Syntax – Railroad Diagrams</h1>
        <div className="subtitle">
          Rendered from a diagram-friendly transcription of Annex A–style grammar rules (left recursion removed where needed).
        </div>

        <div className="toolbar">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter rules by name (e.g., declarator, pp-tokens)…"
            aria-label="Filter rules"
          />
        </div>

        <nav>
          {SECTION_ORDER.map((s) => (
            <a key={s} href={`#${s}`}>
              {SECTION_TITLES[s]}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {SECTION_ORDER.map((s) => (
          <section key={s} id={s}>
            <h2>{SECTION_TITLES[s]}</h2>
            <RuleList names={filteredBySection[s]} />
          </section>
        ))}
      </main>

      <footer>
        <div>
          Tip: Use <code>npm run dev</code> for local development, or <code>npm run build</code> then <code>npm run preview</code> to serve a production build.
        </div>
      </footer>
    </>
  );
}
