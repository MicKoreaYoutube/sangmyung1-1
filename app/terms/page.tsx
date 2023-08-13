import '@/styles/fonts.css'

import Link from 'next/link'
import { Button, buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <>
      <section className="container grid gap-6 my-28 max-w-[1000px]">
        <h1 className="font-KBO-Dia-Gothic_bold text-7xl text-center">이용약관</h1>
        <span className="whitespace-pre-wrap font-SUITE-Regular text-xl" style={{ whiteSpace: 'pre-wrap' }}>
          제 0장 정의
          1. 관리자는 상명중학교 1학년 1반 2학기 학급 회장을 의미한다.
          2. 유저는 이 건의함을 이용하는 모든 사람을 의미한다.
          3. 피의자는 위법행위에 대해 판결을 기다리는 자를 의미한다.
          4. 피고인은 1차 심사에서 유죄의 판결을 받고 재심의 결과를 기다리는 자를 의미한다.

          제 1장 총강
          제 1조 상명중학교 1학년 1반 건의함은 민주주의적인 학급 관리에 따라 2학기 회장의 뜻을 받들어 세워진 건의함이다.
          제 2조 특별한 사유가 있지 않는 한 그 누구도 건의사항을 제시하는데에 불이익이 없어야 한다.

          제 2장 처벌의 성립
          제 3조 ‘이후의 이용약관에 서술되어 있는 규칙’(이하 ‘규칙’이라 한다)에 따라서만 처벌 할 수 있다.
          제 4조 약관이 개정되어 더 이상 해당 행위가 처벌의 대상이 아니거나 처벌의 수위가 감형 되었을 때에는 이에 따른다.
          제 5조 관리자는 규칙에 따른 제재를 받지 아니한다.

          제 3장 처벌 가능한 사항
          제 6조 처벌의 종류는 다음과 같다. 1. 사이트 접속 차단
          2. 가석방 없는 영구정지
          3. 영구 정지
          4. 건의 정지
          5. 댓글 작성 정지
          제 7조 ①건의사항 게시판(이하 ‘게시판’ 이라고 한다)에 욕설, 폭언을 작성한 경우에는 초범과 1차 재범에 한하여 1주일 건의사항 게시 정지에 처한다.
          ②게시판에 모욕행위, 비방행위, 인신공격행위, 여론 조작, 명예훼손에 해당되는 것을 작성했을 경우에 초범과 1차 재범에 한하여 2주일 건의 정지에 처한다.
          ③게시판에 음란행위에 해당되는 것을 작성했을 경우에 초범과 1차 재범에 한하여 3개월 건의 정지에 처한다.
          제 8조 ①댓글창(이하 ‘댓글’이라 한다)에 욕설, 폭언을 작성한 경우에는 초범과 1차 재범에 한하여 3일 건의사항 게시 정지에 처한다.
          ②댓글에 모욕행위, 비방행위, 인신공격행위, 여론 조작, 명예훼손에 해당되는 것을 작성했을 경우에 초범과 1차 재범에 한하여 1주일 건의 정지에 처한다.
          ③댓글에 음란행위에 해당되는 것을 작성했을 경우에 초범과 1차 재범에 한하여 1개월 건의 정지에 처한다.
          제 9조 ①제 7조, 제 8조의 행위를 3회 이상 한 경우 게시판과 댓글에서 전부 영구 정지에 처한다.
          ②다른 사람의 명의를 도용하여 다른 사람이 행위를 일으킨 것처럼 하는 행위를 할 경우에도 영구 정지에 처한다.
          제 10조 규칙 제 12조에 따라 영구 정지를 감형 받은 경우에도 이후 재범을 할 경우 가석방 없는 영구 정지에 처한다.
          제 11조 웹사이트에 운영에 방해되는 행위(예. 웹사이트 해킹, 스크립트 공격)에 대하여는 해당 행위를 한 IP와 유저를 웹사이트에서 차단한다.

          제 4장 감형의 성립과 사유
          제 12조 중범죄에 해당하여 선고받은 1번과 2번, 형의 길이가 있는 제 6조 3번과 4번은 감형을 받아들이지 않는다.
          제 13조 영구 정지에 경우 7줄 이상의 반성문을 자필로 작성하여 관리자에게 제출하면 관리자가 검토하여 감형의 선고를 결정한다.
          제 14조 약관의 무지는 감형의 사유가 되지 아니한다.

          제 5장 처벌 심사의 과정
          제 15조 처벌 결정의 과정은 다음과 같다 1. 유저의 신고 또는 관리자의 발견으로 위법 행위가 적발된다.
          2. 관리자 전원이 회의를 통하여 처벌을 결정한다.
          3. 선고 사항을 피의자에게 전달한다.
          4. 만약 피의자가 선고사항에 대해 부당함을 느낄 경우 항소의 사실을 관리자에게 전달한다.
          5. 관리자가 항소를 기각하지 아니하였다면, 관리자는 해당 사항에 대해 재심사를 하여 선고 사항을 다시 피고인에게 전달한다.
          6. 5번 사항에서 피고인의 요청에 따라 전체 학급원의 투표를 실시 할 수 있다.

          제 6장 부당한 판결을 선고 받은 경우
          제 16조 위법행위가 아니지만 관리자의 오판으로 인해 위법행위로 인한 유죄를 선고 받은 경우 관리자에게로부터 적절한 보상을 받을 수 있다.
          제 17조 보상은 상명중학교 매점에서 구매할 수 있는 항목으로 제한한다.
          제 18조 보상 항목은 관리자와 부당한 선고를 받은 자가 서로 합의를 통해 정한다.

          제 7조 약관의 개정
          제 19조 ①상명중 1학년 1반 건의함 이용약관(이하 ‘약관’이라고 한다)은 유저 3명 이상이 서명한 증명서를 제출함으로써 관리자가 개정을 검토한다.
          ②증명서에는 개정 사항, 개정 사유 그리고 유저 3명 이상의 자필 서명이 있어야 효력을 발휘한다.
          제 20조 최종 개정안이 나오면 학급원 전원 투표를 부쳐 결과를 토대로 시행한다.
          제 21조 이용약관은 최종 개정안으로 결정된 다음 날부터 그 효력을 발휘한다.


          부칙
          제 1조 관리자에게 상습적이고 지속적인 폭행, 절도 행위, 비방행위 등을 할 경우에 영구 정지 이상의 형에 처한다.
        </span>
      </section>
    </>
  )
}
