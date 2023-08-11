import { getAuth, signOut } from "firebase/auth";

export default function IndexPage() {
  const auth = getAuth();

  signOut(auth).then(() => {
    location.href = '/'
  }).catch((error) => {
    let errorMessage = error.message
    document.querySelector('#error').innerHTML = errorMessage
  });

  return (
    <>
      <span id="error">로그아웃 중...</span>
    </>
  )
}
