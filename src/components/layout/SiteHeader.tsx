import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { navigation } from "@/data/site";
import { cn } from "@/lib/utils";

const SiteHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "border-b border-border bg-background/85 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <nav className="container mx-auto flex h-16 items-center justify-between px-4" aria-label="Main">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/15 text-sm font-bold text-primary">
            CV
          </span>
          <span className="text-sm sm:text-base">Christian Velasco</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <li key={item.label} className="group relative">
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-1 rounded-md px-3 py-2 text-sm transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )
                }
              >
                {item.label}
                {item.children && <ChevronDown className="h-3.5 w-3.5 opacity-60" />}
              </NavLink>

              {item.children && (
                <div className="invisible absolute left-0 top-full w-60 translate-y-1 rounded-xl border border-border bg-popover p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      to={child.href}
                      className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background/98 backdrop-blur-xl lg:hidden">
          <ul className="container mx-auto flex flex-col gap-1 px-4 py-4">
            {navigation.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="ml-3 border-l border-border pl-3">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          to={child.href}
                          className="block rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
