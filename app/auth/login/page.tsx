import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function IndexPage() {
  return (
    <>
      <div className="h-screen bg-gradient-to-br from-blue-300 to-blue-600 flex items-center justify-center">
        <div className="flex flex-1 h-full p-10 bg-white transform -skew-x-12">
          {/* 사진 혹은 로고 칸 */}
          <div className="h-full w-1/2 bg-cover bg-center hidden md:block" style={{ backgroundImage: "url('your-image-url')" }}></div>

          {/* 로그인 창 칸 */}
          <div className="md:w-1/2 p-6 bg-gray-200 rounded-lg transform skew-x-12">
            <form className="space-y-4">
              <label className="block text-lg font-semibold" htmlFor="username">사용자명</label>
              <input className="w-full px-3 py-2 border rounded" type="text" id="username" name="username" required />

              <label className="block text-lg font-semibold" htmlFor="password">비밀번호</label>
              <input className="w-full px-3 py-2 border rounded" type="password" id="password" name="password" required />

              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition duration-300 ease-in-out" type="submit">로그인</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
