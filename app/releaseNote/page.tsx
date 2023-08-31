export default function IndexPage() {
  return (
    <>
      <section className="container grid gap-6 my-28 max-w-[1000px] place-element-center">
        <h1 className="font-KBO-Dia-Gothic_bold text-4xl lg:text-7xl text-center">릴리스 노트</h1>
        <p className="font-SUITE-Regular text-xl whitespace-pre-warp">
            이전 역사 미 작성<br />
            <br />
            2023-08-25 beta 0.5.0 - 로그인 시스템, 공지사항 시스템, 건의 사항 시스템, 이용약관, 릴리스노트 추가<br />
            2023-08-26 beta 0.5.1 - deploy 안 되는 버그 수정<br />
            2023-08-27 beta 0.6.0 - footer 디자인 변경, 게시물 업로드, 수정, 삭제 시 버그 수정<br />
            2023-08-28 beta 0.7.0 - Admin 관리 페이지 제작, 각 페이지 별 권한 설정 최적화<br />
            2023-08-29 beta 0.7.1 - 유저 정지 기능 추가<br />
            2023-08-30 beta 0.7.2 - 유저 정지 기능 정비 및 영구 정지 추가<br />
            2023-08-31 beta 0.8.0 - 버그 수정 및 기능 최적화<br />
            2023-08-31 official release 1.0.0 - 출시<br />
            <br />
            더 업데이트 예정<br />
        </p>
      </section>
    </>
  )
}
