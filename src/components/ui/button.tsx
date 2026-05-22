import { cn } from "@/lib/utils"
import { type ButtonHTMLAttributes, forwardRef } from "react"

const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "outline" | "ghost"; size?: "sm" | "md" | "lg" }>(
  ({ className, variant = "default", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 disabled:opacity-50 disabled:pointer-events-none",
        variant === "default" && "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200",
        variant === "outline" && "border border-zinc-300 bg-transparent hover:bg-zinc-100 dark:border-zinc-600 dark:hover:bg-zinc-800",
        variant === "ghost" && "bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800",
        size === "sm" && "h-8 px-3 text-xs",
        size === "md" && "h-10 px-4 text-sm",
        size === "lg" && "h-12 px-6 text-base",
        className
      )}
      {...props}
    />
  )
)
Button.displayName = "Button"

export { Button }
