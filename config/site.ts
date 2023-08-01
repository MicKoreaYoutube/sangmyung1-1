export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "상명중 1-1 건의함",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "메인",
      href: "/",
    },
    {
      title: "공지사항",
      href: "/",
    },
    {
      title: "건의 게시판",
      href: "/",
    },
    {
      title: "돈 벌어다주기",
      href: "/",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
  logAbout: {
    login: [
      {
        title: "회원 가입",
        href: "/join",
        variant: "default"
      },
      {
        title: "로그인",
        href: "/login",
        variant: "outline"
      },
    ],
    logout: [
      {
        title: "회원 정보",
        href: "/user",
        variant: "default"
      },
      {
        title: "로그아웃",
        href: "/logout",
        variant: "outline"
      },
    ],
  }
}
