import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <>
      <section className="container grid items-center gap-6 my-28 max-w-[1000px] text-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tighter font-KBO-Dia-Gothic_bold">
            안녕하세요. 이곳은 <br />
            상명중학교 1학년 1반 건의함 사이트 입니다.
          </h1>
          <p className="text-lg md:text-2xl text-muted-foreground font-SUITE-Regular">
            상명중학교 1학년 1반은 여러분의 건의로 완성됩니다. 언제나 편하게 건의해주세요!
          </p>
        </div>
        <div className="flex gap-4 place-content-center font-SUITE-Regular">
          <Link
            href="/board/suggestions"
            rel="noreferrer"
            className={buttonVariants()}
          >
            바로 사용해보기
          </Link>
          <Link
            href="/board/announcements"
            rel="noreferrer"
            className={buttonVariants({ variant: "outline" })}
          >
            최근 건의사항 확인하기
          </Link>
        </div>
      </section>
      {/* <section className="container grid items-center gap-6 text-start text-white bg-black dark:bg-white dark:text-black m-0 p-28">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tighter font-KBO-Dia-Gothic_bold">
            최신 공지사항을 확인해보세요!
          </h1>
          <p className="text-lg md:text-2xl text-muted-foreground font-SUITE-Regular">
            최근에 올라온 공지사항은 뭐가 있을까요?
          </p>
        </div>
      </section> */}
    </>
  )
}
