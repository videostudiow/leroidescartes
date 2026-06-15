import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
      {/* Big 404 */}
      <div className="relative mb-8">
        <p className="font-heading font-black text-[clamp(8rem,25vw,18rem)] leading-none text-border select-none">
          404
        </p>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="badge-primary text-sm px-4 py-2">PAGE INTROUVABLE</span>
        </div>
      </div>

      <h1 className="font-heading text-3xl md:text-5xl font-black uppercase mb-4">
        Cette page n&apos;existe pas
      </h1>
      <p className="text-muted max-w-md mb-8 leading-relaxed">
        On a cherché partout dans le binder — elle n&apos;est pas là. Retournez à l&apos;accueil
        ou explorez nos collections.
      </p>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/" className="btn-primary text-sm px-7 py-3.5">
          ← Retour à l&apos;accueil
        </Link>
        <Link href="/collections" className="btn-outline border-dark text-dark text-sm px-7 py-3.5">
          Voir les collections
        </Link>
      </div>
    </div>
  );
}
