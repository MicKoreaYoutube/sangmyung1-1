import Link from "next/link"
import Image from "next/image"

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { LogAboutItem, NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

// import "@/styles/media-query.css"

interface LogAboutProps {
  items?: LogAboutItem[]
}

export function SiteHeader({ items }: LogAboutProps) {
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      items = siteConfig.logAbout.logout;
      const uid = user.uid;
      const email = user.email;
      console.log(email)
    } else {
      items = siteConfig.logAbout.login;
    }
  });

  const NavItems = siteConfig.mainNav
  const setVariant = [buttonVariants(), buttonVariants({ variant: "outline" })]

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b dark:bg-gray-900">
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
                <SheetTitle>
                  <Link href="/" className="flex items-center space-x-2">
                    <Image src="logo.png" alt="로고" className="h-6 w-6" />
                    <span className="inline-block font-bold">{siteConfig.name}</span>
                  </Link>
                </SheetTitle>
                <SheetDescription>
                  <span className="text-lg font-SUITE-Regular leading-4 text-left">
                    상명중학교 1학년 1반은 여러분의 건의로 완성됩니다. 언제나 편하게 건의해주세요!
                  </span>
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div>
                  {NavItems?.length ? (
                    <nav className="flex flex-col gap-3">
                      {NavItems?.map(
                        (NavItems, index) =>
                          NavItems.href && (
                            <Link
                              key={index}
                              href={NavItems.href}
                              className={cn(
                                "flex items-center text-sm font-medium text-muted-foreground hover:text-black",
                                NavItems.disabled && "cursor-not-allowed opacity-80"
                              )}
                            >
                              {NavItems.title}
                            </Link>
                          )
                      )}
                    </nav>
                  ) : null}
                </div>
              </div>
              <SheetFooter>
                <div className="flex flex-1 items-center space-x-4">
                  {items?.length ? (
                    <nav className="flex items-center space-x-2">
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
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
