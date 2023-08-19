export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "상명중 1-1 건의함",
  logo: "https://github.com/MicKoreaYoutube/img/assets/118183460/d6e23741-e2c2-442b-ab87-f7e2bdc52c8a",
  logoDark: "https://github.com/MicKoreaYoutube/img/assets/118183460/642e7957-ec81-4d49-9e8d-8ba94a194c3f",
  mainNav: [
    {
      title: "메인",
      href: "/",
      disabled: false
    },
    {
      title: "공지사항",
      href: "/board/announcements",
      disabled: false
    },
    {
      title: "건의 게시판",
      href: "/board/suggestions",
      disabled: false
    },
    {
      title: "돈 벌어다주기",
      href: "/giveMeMoney",
      disabled: false
    }
  ],
  links: {
    instagram: "https://www.instagram.com/leejunsibal",
    github: "https://github.com/MicKoreaYoutube/sangmyung1-1",
    docs: "https://ui.shadcn.com"
  },
  logAbout: {
    login: [
      {
        title: "회원 가입",
        href: "/auth/join"
      },
      {
        title: "로그인",
        href: "/auth/login"
      },
    ],
    logout: [
      {
        title: "회원 정보",
        href: "/auth/user"
      },
      {
        title: "로그아웃",
        href: "/auth/logout"
      }
    ],
  },
  member: ['10101강채원', '10102김경서', '10103김나경', '10104김다온', '10105박소민', '10106박시윤', '10107박주아', '10108서원희', '10109오서하', '10110이채은', '10111전아연', '10112정시윤', '10113하효린', '10114황정율', '10121강민규', '10122강희창', '10123구현우', '10124김민준', '10125박수호', '10126박유민', '10127백건', '10128백준규', '10129오동권', '10130이도윤', '10131이은호', '10132이준영', '10133임형진', '10134전지율', '10135정지욱', '10136차현서', '10100김국현선생님', '19072김두한']
}
