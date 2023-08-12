'use client'

import "@/styles/globals.css"
import "@/styles/fonts.css"
import "@/styles/media-query.css"

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from '@fortawesome/fontawesome-svg-core'

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

import { initializeApp } from 'firebase/app';
import { app, auth } from "@/public/js/firebase";
import React, { useState } from "react";

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [items, stateChanger] = useState(siteConfig.logAbout.login)

  const user = auth.currentUser;

  if (user) {
    stateChanger(siteConfig.logAbout.login)
  } else {
    stateChanger(siteConfig.logAbout.logout)
  }

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader items={items} />
              <div className="flex-1">{children}</div>
              <SiteFooter />
            </div>
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
