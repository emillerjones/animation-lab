import { useMemo, useState } from "react";
import { animations } from "../data/animations";
import "./HomePage.css";

function matches(animation, query) {
  const text = `${animation.title} ${animation.category}`.toLowerCase();
  return !query || text.includes(query.toLowerCase());
}

function Collection({ title, provider, animations: list, selectedId, onSelect }) {
  const [expanded, setExpanded] = useState(true);
  const listId = `${provider}-animation-list`;

  return (
    <section className={`library-nav__collection library-nav__collection--${provider} ${expanded ? "is-expanded" : "is-collapsed"}`}>
      <button
        className="library-nav__collection-toggle"
        type="button"
        aria-expanded={expanded}
        aria-controls={listId}
        onClick={() => setExpanded((current) => !current)}
      >
        <span className="library-nav__collection-title"><i aria-hidden="true" />{title}</span>
        <span className="library-nav__collection-count">{list.length}</span>
      </button>
      <nav id={listId} aria-label={`${title} animations`} hidden={!expanded}>
        {list.map((animation) => (
          <a
            href={`#/animation/${animation.id}`}
            className={selectedId === animation.id ? "is-active" : ""}
            aria-current={selectedId === animation.id ? "page" : undefined}
            onClick={onSelect}
            key={animation.id}
            style={{ "--accent": animation.accent, "--accent-rgb": animation.accentRgb }}
          >
            <span>{String(animation.index + 1).padStart(2, "0")}</span>
            <span><strong>{animation.title}</strong><small>{animation.category}</small></span>
          </a>
        ))}
      </nav>
    </section>
  );
}

export default function HomePage({ selectedId, open, onToggle, onSelect }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => animations.filter((animation) => matches(animation, query)), [query]);
  const standardAnimations = filtered.filter((animation) => animation.collection !== "advanced");
  const advancedAnimations = filtered.filter((animation) => animation.collection === "advanced");

  return (
    <>
      <button className={`library-nav__toggle ${open ? "is-open" : ""}`} type="button" onClick={onToggle} aria-expanded={open} aria-controls="animation-library">
        <i /><i /><i /><span>{open ? "Hide" : "Experiments"}</span>
      </button>
      <aside className={`library-nav ${open ? "is-open" : ""}`} id="animation-library">
        <div className="library-nav__brand"><span>Animation</span><strong>Lab</strong><small>{animations.length} experiments</small></div>
        <label className="library-nav__search"><span aria-hidden="true">&#9906;</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find an animation" /></label>
        <div className="library-nav__scroll">
          <Collection title="Primary" provider="library" animations={standardAnimations} selectedId={selectedId} onSelect={onSelect} />
          <Collection title="Secondary" provider="advanced" animations={advancedAnimations} selectedId={selectedId} onSelect={onSelect} />
        </div>
      </aside>
    </>
  );
}
