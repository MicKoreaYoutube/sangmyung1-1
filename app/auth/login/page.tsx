import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function IndexPage() {
  return (
    <>
      <div className="container relative min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <a className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 absolute right-4 top-4 md:right-8 md:top-8" href="/examples/authentication">Login</a>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900"></div>
          <div className="relative z-20 flex items-center text-lg font-medium">
            {/* 로고 넣는 곳 */}
          </div>
        </div>
        <div className="lg:p-8 flex-grow">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">로그인</h1>
              <p className="text-sm text-muted-foreground">Enter your email below to create your account</p>
            </div>
            <div className="grid gap-6">
              <form>
                <div className="grid gap-2">
                  <div className="grid gap-1">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only" htmlFor="email">Email</label>
                    <input className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" id="email" placeholder="name@example.com" autoCapitalize="none" autoComplete="email" autoCorrect="off" type="email" />
                  </div>
                  <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">Sign In with Email</button>
                </div>
              </form>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2" type="button">
                Github
              </button>
            </div>
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our <a className="underline underline-offset-4 hover:text-primary" href="/terms">Terms of Service</a> and <a className="underline underline-offset-4 hover:text-primary" href="/privacy">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
