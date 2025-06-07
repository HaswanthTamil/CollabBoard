"use client"

import React from "react"
import { usePathname, useRouter } from "next/navigation"
import { Lightbulb, CheckSquare, BookText, User } from "lucide-react"
import clsx from "clsx"

const navItems = [
  { label: "Ideas", icon: Lightbulb, href: "/ideaboard" },
  { label: "Projects", icon: CheckSquare, href: "/projectboard" },
  { label: "Notebook", icon: BookText, href: "/notebook" },
  { label: "Account", icon: User, href: "/account" },
]

// Memoized NavItem component
const NavItem = React.memo(
  ({
    label,
    Icon,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    href,
    isActive,
    onClick,
  }: {
    label: string
    Icon: React.ComponentType<{
      className?: string
      "aria-hidden"?: boolean
      focusable?: boolean
    }>
    href: string
    isActive: boolean
    onClick: () => void
  }) => {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-current={isActive ? "page" : undefined}
        aria-label={label}
        className={clsx(
          "relative flex flex-col items-center justify-center gap-1 rounded-xl p-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500",
          isActive
            ? "bg-gray-200 text-black md:bg-white md:text-black"
            : "text-gray-100 hover:bg-gray-100 hover:text-black <md:text-gray-100 md:text-gray-100 md:hover:bg-zinc-500",
          "md:w-full",
        )}
      >
        {isActive && <span className="sr-only">(current page)</span>}
        <Icon
          className={clsx("h-5 w-5", isActive ? "text-black" : "")}
          aria-hidden={true}
          focusable={false}
        />
        <span className="text-[10px] md:hidden">{label}</span>
      </button>
    )
  },
)

NavItem.displayName = "NavItem"

const NavPanel = () => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <nav
      role="navigation"
      aria-label="Primary navigation"
      className="flex items-center justify-around md:gap-6 bg-white dark:bg-zinc-900 border-t md:border-r md:border-t-0 border-zinc-300 dark:border-zinc-700"
    >
      {navItems.map(({ label, icon: Icon, href }) => {
        const isActive = pathname === href
        return (
          <NavItem
            key={label}
            label={label}
            Icon={Icon}
            href={href}
            isActive={isActive}
            onClick={() => router.push(href)}
          />
        )
      })}
    </nav>
  )
}

export default NavPanel
