import Link from "next/link"

import { LogAboutItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

interface LogAboutProps {
  items?: LogAboutItem[]
}

export function SiteHeader({ items }: LogAboutProps) {
  items = siteConfig.logAbout.login
  const setVariant = ["primary", "outline"]
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          {items?.length ? (
            <nav className="flex items-center space-x-1">
              {items?.map(
                (item, index) =>
                  item.href && (
                    <Link
                      key={index}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className={buttonVariants({ variant: setVariant[index] })}
                    >
                      {item.title}
                    </Link>
                  )
              )}
            </nav>
          ) : null}
        </div>
      </div>
    </header>
  )
}
