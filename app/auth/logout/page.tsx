import { getAuth, signOut } from "firebase/auth";

export default function IndexPage() {
  const auth = getAuth();

  signOut(auth).then(() => {
    location.href = '/'
  }).catch((error) => {
    let errorMessage = error.message
    console.log(errorMessage)
  });

  return (
    <>
      <span>로그아웃 중...</span>
    </>
  )
}
