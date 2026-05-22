"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WalrusHeadMini } from "@/components/Mascot/WalrusHeadMini";
import { IconCompass, IconLoupe, IconChat, IconBook } from "@/components/Mascot/DetectiveIcons";

const links = [
  { id: "dashboard", href: "/",         label: "Dashboard",    Icon: IconCompass },
  { id: "explorer",  href: "/explorer", label: "Blob Explorer", Icon: IconLoupe },
  { id: "chat",      href: "/chat",     label: "AI Analytics", Icon: IconChat },
  { id: "tutorial",  href: "/tutorial", label: "Tutorial",     Icon: IconBook },
];

export function Nav() {
  const pathname = usePathname();
  const current = links.find(l => l.href === pathname)?.id ?? "dashboard";

  return (
    <nav className="nav">
      <Link className="nav-logo" href="/">
        <WalrusHeadMini size={42}/>
        <span>Walytics</span>
        <span className="nav-tag">Case 0042</span>
      </Link>
      <div className="nav-links">
        {links.map(l => (
          <Link key={l.id} href={l.href}
               aria-current={current === l.id ? "page" : undefined}
               className="nav-link">
            <l.Icon size={14}/>
            <span>{l.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
