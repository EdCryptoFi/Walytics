"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, MessageSquare, Search, FileText, CodeXml, BookOpen, BookOpenText } from "lucide-react"

const navItems = [
  { href: "/", label: "Dashboard", icon: BarChart3 },
  { href: "/explorer", label: "Blob Explorer", icon: Search },
  { href: "/chat", label: "AI Analytics", icon: MessageSquare },
  { href: "/docs", label: "Docs", icon: BookOpenText },
  { href: "/tutorial", label: "Tutorial", icon: BookOpen },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-64 flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 lg:flex">
      <div className="flex h-14 items-center gap-2 border-b border-zinc-200 px-6 dark:border-zinc-800">
        <FileText className="h-6 w-6 text-blue-600" />
        <span className="text-xl font-bold tracking-tight">Walytics</span>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
        <a
          href="https://github.com/EdCryptoFi/Walytics"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
        >
          <CodeXml className="h-4 w-4" />
          Walytics
        </a>
      </div>
    </aside>
  )
}
