"use client"

import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Lightbulb, CheckSquare, BookText, User } from "lucide-react"
import clsx from "clsx"

const navItems = [
  { label: "Ideas", icon: Lightbulb, href: "/ideaboard" },
  { label: "Projects", icon: CheckSquare, href: "/projectboard" },
  { label: "Notebook", icon: BookText, href: "/notebook" },
  { label: "Account", icon: User, href: "/account" },
]

const NavPanel = () => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <nav
      role="navigation"
      aria-label="Primary navigation"
      className="md:fixed md:left-0 md:top-0 md:h-full md:w-16 md:flex-col fixed bottom-0 w-full h-16 z-50 bg-white border-t md:border-r md:border-t-0 flex items-center justify-around md:justify-start md:gap-6"
    >
      {navItems.map(({ label, icon: Icon, href }) => {
        const isActive = pathname === href

        return (
          <button
            key={label}
            type="button"
            onClick={() => router.push(href)}
            aria-current={isActive ? "page" : undefined}
            aria-label={label}
            className={clsx(
              "relative flex flex-col md:flex-row items-center justify-center gap-1 rounded-xl p-2 transition-colors md:w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500",
              isActive
                ? "bg-gray-200 text-black"
                : "text-gray-500 hover:bg-gray-100",
            )}
          >
            {isActive && (
              <motion.div
                layoutId="active-dot"
                className={clsx(
                  "absolute bg-black rounded-full",
                  "md:left-2 md:top-1/2 md:-translate-y-1/2 md:h-2 md:w-2",
                  "bottom-0 h-2 w-2 md:bottom-auto md:right-auto",
                )}
                aria-hidden="true"
              />
            )}
            <Icon
              className={clsx("h-5 w-5", isActive ? "text-black" : "")}
              aria-hidden="true"
              focusable="false"
            />
            <span className="text-[10px] md:hidden">{label}</span>
          </button>
        )
      })}
    </nav>
  )
}

export default NavPanel
