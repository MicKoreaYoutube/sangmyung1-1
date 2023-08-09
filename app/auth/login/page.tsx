import Link from "next/link"
import Image from "next/image"
import { getAuth } from "firebase/auth";

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"

export default function IndexPage() {
  return (
    <>
      <div className="md:hidden">
      </div>
      <div className="relative h-[670px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium font-KBO-Dia-Gothic_bold">
            <Image src="logo.png" alt="로고" height={50} width={50} />
            상명중 1-1 건의함
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg font-SUITE-Regular">
                이 곳은 상명중 1학년 1반 건의함입니다!<br />우리반에 원하는 것들을 편하게 건의해주세요!
              </p>
            </blockquote>
          </div>
        </div>
        <div className="p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight font-KBO-Dia-Gothic_bold">
                로그인
              </h1>
            </div>
            <div className="font-SUITE-Regular flex flex-col justify-center space-y-6">
              <Input placeholder="아이디를 입력하세요." />
              <Input placeholder="비밀번호를 입력하세요." />
              <Button>로그인</Button>
            </div>
            <hr />
            <div className="font-SUITE-Regular flex flex-col justify-center space-y-6">
              <span className="px-8 text-center text-sm text-muted-foreground">계정이 없나요? <Link href="/auth/join" className="text-blue-500 hover:text-blue-700">회원가입→</Link></span>
              <p className="px-8 text-center text-sm text-muted-foreground">
                로그인 버튼을 누르실 경우, 당신은 {" "}
                <Link
                  href="/terms"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  이용약관
                </Link>
                과{" "}
                <Link
                  href="/privacy"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  개인정보보호처리방침
                </Link>
                에 동의한 것으로 간주합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
