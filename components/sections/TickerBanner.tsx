const TICKER_ITEMS = [
  "POKÉMON • CHAOS RISING",
  "★",
  "MAGIC • SUPERHEROES",
  "+",
  "RIFTBOUND • UNLEASHED",
  "★",
  "NHL 23-24 RETAIL",
  "+",
  "FUNKO POP",
  "★",
  "YU-GI-OH",
  "+",
  "DIGIMON",
  "★",
  "LORCANA",
  "+",
];

const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

export default function TickerBanner() {
  return (
    <div
      className="bg-secondary text-dark py-2.5 overflow-hidden"
      role="marquee"
      aria-label="Collections disponibles"
    >
      <div className="ticker-inner font-heading font-bold text-sm tracking-widest gap-6">
        {items.map((item, i) => (
          <span key={i} className="mx-4 whitespace-nowrap">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
