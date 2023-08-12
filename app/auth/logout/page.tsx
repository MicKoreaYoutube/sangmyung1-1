import { getAuth, signOut } from "firebase/auth";
import { displayError } from "@/public/js/function"

export default function IndexPage() {
  const auth = getAuth();

  signOut(auth).then(() => {
    location.href = '/'
  }).catch((error) => {

  });

  return (
    <>
      <div id="error" className="hidden">
      <span id="errorMessage">로그아웃 중...</span>
      </div>
    </>
  )
}
