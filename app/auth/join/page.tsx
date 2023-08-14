'use client';

import Link from "next/link"
import Image from "next/image"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

import { displayError, logined } from "@/public/js/function"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function IndexPage() {

  const codeError = () => {
    displayError('옳지 않은 코드 입니다')
  }

  logined()

  return (
    <>
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
                이곳은 상명중 1학년 1반 건의함입니다!<br />우리반에 원하는 것들을 편하게 건의해주세요!
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
              <span className="px-8 text-center text-sm text-muted-foreground font-SUITE-Regular">회원가입을 위해 관리자에게 받은 코드를 입력하세요</span>
            </div>
            <div className="font-SUITE-Regular flex flex-col justify-center space-y-6">
              <Input placeholder="코드를 입력하세요." type="number"/>
              <Alert variant="destructive" className="hidden" id="error">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription id="errorMessage">
                  Error Message
                </AlertDescription>
              </Alert>
              <Button onClick={codeError}>로그인</Button>
            </div>
            <hr />
            <div className="font-SUITE-Regular flex flex-col justify-center space-y-6">
              <span className="px-8 text-center text-sm text-muted-foreground">계정이 이미 있나요?<Link href="/auth/login" className="text-blue-500 hover:text-blue-700">로그인→</Link></span>
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
