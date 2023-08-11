import * as React from "react"
import Link from "next/link"
import Image from 'next/image'

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { LogOut } from "lucide-react"

interface MainNavProps {
  navItems?: NavItem[]
}

export function MainNav({ navItems }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Image src="logo.png" alt="로고" className="h-6 w-6" />
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
      {navItems?.length ? (
        <nav className="nav-flex gap-6">
          {navItems?.map(
            (navItems, index) =>
            navItems.href && (
                <Link
                  key={index}
                  href={navItems.href}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground hover:text-black",
                    navItems.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {navItems.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  )
}
