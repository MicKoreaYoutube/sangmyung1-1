import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <>
      <section className="container grid items-center gap-6 my-28 max-w-[1000px] text-center place-element-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-extrabold leading-tight tracking-tighter font-KBO-Dia-Gothic_bold">
            안녕하세요. 이곳은 <br />
            상명중학교 1학년 1반 건의함 사이트 입니다.
          </h1>
          <p className="text-2xl text-muted-foreground font-SUITE-Regular">
            상명중학교 1학년 1반은 여러분의 건의로 완성됩니다. 언제나 편하게 건의해주세요!
          </p>
        </div>
        <div className="flex gap-4 place-content-center font-SUITE-Regular">
          <Link
            href={siteConfig.links.docs}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants()}
          >
            바로 사용해보기
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github}
            className={buttonVariants({ variant: "outline" })}
          >
            최근 건의사항 확인하기
          </Link>
        </div>
      </section>
      {/*<section className="container grid items-center gap-6 pb-8 pt-6 md:py-10 bg-black dark:bg-white">
        <div className="flex max-w-[980px] flex-col items-start gap-2 text-white dark:text-black">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Beautifully designed components <br className="hidden sm:inline" />
            built with Radix UI and Tailwind CSS.
          </h1>
          <p className="max-w-[700px] text-lg">
            Accessible and customizable components that you can copy and paste
            into your apps. Free. Open Source. And Next.js 13 Ready.
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            href={siteConfig.links.docs}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ variant: "outline" })}
          >
            Documentation
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github}
            className={buttonVariants({ variant: "outline" })}
          >
            GitHub
          </Link>
        </div>
      </section>*/}
    </>
  )
}
