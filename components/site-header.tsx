import Link from "next/link"

import { LogAboutItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import "../public/css/media-query.css"

interface LogAboutProps {
  items?: LogAboutItem[]
}

export function SiteHeader({ items }: LogAboutProps) {
  items = siteConfig.logAbout.login
  const setVariant = [buttonVariants(), buttonVariants({ variant: "outline" })]
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          {items?.length ? (
            <nav className="nav-flex items-center space-x-2">
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
          <Sheet>
            <SheetTrigger asChild>
              <Button className="nav-hidden" variant="ghost"><FontAwesomeIcon icon={faBars} /></Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you&#39re done.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  1
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  2
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
