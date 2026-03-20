"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Leaf,
  LayoutDashboard,
  Users,
  MessageSquare,
  Star,
  MapPin,
  Wrench,
  FileText,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { signOut } from "@/lib/auth/actions";

const navLinks = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Leads", href: "/admin/leads", icon: Users },
  { label: "Contacts", href: "/admin/contacts", icon: MessageSquare },
  { label: "Testimonials", href: "/admin/testimonials", icon: Star },
  { label: "Locations", href: "/admin/locations", icon: MapPin },
  { label: "Services", href: "/admin/services", icon: Wrench },
  { label: "Blog Posts", href: "/admin/blog", icon: FileText },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Don't render the admin chrome on the login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  function handleSignOut() {
    signOut();
  }

  const sidebarContent = (
    <div className="flex h-full flex-col" style={{ backgroundColor: "#212121" }}>
      {/* Header */}
      <div className="flex items-center gap-2 px-6 py-5">
        <Leaf className="h-6 w-6" style={{ color: "#7CB342" }} />
        <span className="text-lg font-bold" style={{ color: "#7CB342" }}>
          Murphy&apos;s Turf Care Admin
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
              }`}
              style={isActive ? { backgroundColor: "#2D5016" } : undefined}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-700 px-3 py-4">
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-400 transition-colors hover:bg-gray-800 hover:text-gray-200"
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 flex-shrink-0 md:block">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile slide-out drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 ease-in-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute right-2 top-3 rounded-md p-1 text-gray-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
        {sidebarContent}
      </aside>

      {/* Main area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-md p-1 text-gray-600 hover:bg-gray-100 md:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-semibold text-gray-800">Admin Panel</h1>
          </div>
          <span className="text-sm text-gray-500">admin@murphysturfcare.com</span>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
