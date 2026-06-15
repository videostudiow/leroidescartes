"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  LayoutDashboard,
  Type,
  Palette,
  Info,
  ImageIcon,
  Calendar,
  MessageSquare,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Loader2,
} from "lucide-react";

const NAV_SECTIONS = [
  { label: "Tableau de bord", href: "/admin", icon: LayoutDashboard },
  { label: "Mes textes", href: "/admin/textes", icon: Type },
  { label: "Mes couleurs", href: "/admin/couleurs", icon: Palette },
  { label: "Mes informations", href: "/admin/infos", icon: Info },
  { label: "Mes images", href: "/admin/images", icon: ImageIcon },
  { label: "Mes événements", href: "/admin/evenements", icon: Calendar },
  { label: "Messages reçus", href: "/admin/messages", icon: MessageSquare },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checking, setChecking] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Page /admin/login ne doit PAS être gardée ici
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setChecking(false);
      return;
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          router.push("/admin/login");
        } else {
          setUserEmail(session.user.email ?? null);
        }
        setChecking(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push("/admin/login");
      else setUserEmail(session.user.email ?? null);
      setChecking(false);
    });

    return () => subscription.unsubscribe();
  }, [isLoginPage, router]);

  if (isLoginPage) return <>{children}</>;

  if (checking) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 h-screen w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col z-30 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-zinc-800">
          <Link href="/" className="flex items-center gap-2 mb-1">
            <Image
              src="https://leroidescartes.ca/cdn/shop/files/LeRoiDesCartes_LOGO.png?v=1745604164"
              alt="Le Roi Des Cartes"
              width={100}
              height={36}
              className="h-8 w-auto object-contain filter brightness-0 invert"
            />
          </Link>
          <p className="text-xs text-zinc-500">Espace administration</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {NAV_SECTIONS.map(({ label, href, icon: Icon }) => {
            const active =
              href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={`admin-nav-item ${active ? "active" : "text-zinc-400"}`}
              >
                <Icon size={16} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-zinc-800 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="admin-nav-item text-zinc-400"
          >
            <ExternalLink size={16} />
            <span>Voir mon site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="admin-nav-item text-zinc-400 w-full text-left"
          >
            <LogOut size={16} />
            <span>Déconnexion</span>
          </button>
          {userEmail && (
            <p className="text-xs text-zinc-600 px-4 pt-2 truncate">{userEmail}</p>
          )}
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar mobile */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-zinc-900 border-b border-zinc-800 sticky top-0 z-10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-zinc-400 hover:text-white"
            aria-label="Ouvrir le menu"
          >
            <Menu size={22} />
          </button>
          <span className="font-heading font-bold text-sm uppercase">Administration</span>
        </div>

        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
