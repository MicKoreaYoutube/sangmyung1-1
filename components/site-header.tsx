import Link from "next/link"

import { LogAboutItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

interface LogAboutProps {
  items?: LogAboutItem[]
}

export function SiteHeader({ items }: LogAboutProps) {
  items = siteConfig.logAbout.login
  const setVariant = [buttonVariants(), buttonVariants({ variant: "outline" })]
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          {items?.length ? (
            <nav className="flex items-center space-x-2 sm:hidden">
              {items?.map(
                (item, index) =>
                  item.href && (
                    <Link
                      key={index}
                      href={item.href}
                      rel="noreferrer"
                      className={setVariant[index]}
                    >
                      {item.title}
                    </Link>
                  )
              )}
            </nav>
          ) : null}
          <Button className="md:hidden">임시 햄버거 버튼</Button>
        </div>
      </div>
    </header>
  )
}
