import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function IndexPage() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-4 p-8 bg-gray-100">
          <div className="flex items-center justify-center">
            {/* 로고 또는 사진 */}
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-semibold">Create an account</h1>
              <p className="text-sm text-gray-500">Enter your email below to create your account</p>
            </div>
            <form className="grid gap-4">
              <label htmlFor="email" className="sr-only">Email</label>
              <input type="email" id="email" name="email" className="rounded-md border p-2" placeholder="name@example.com" />
              <button className="py-2 px-4 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:opacity-50" type="submit">Sign In with Email</button>
              <div className="flex items-center justify-center border-t pt-4">
                <span className="text-gray-500 text-sm">Or continue with</span>
              </div>
              <button className="py-2 px-4 rounded-md border hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:opacity-50" type="button">
                Github
              </button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-4">
              By clicking continue, you agree to our <a className="text-blue-500 hover:underline" href="/terms">Terms of Service</a> and <a className="text-blue-500 hover:underline" href="/privacy">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>

    </>
  )
}
