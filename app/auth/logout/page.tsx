import { getAuth, signOut } from "firebase/auth";
export default function IndexPage() {
  const auth = getAuth();

  signOut(auth).then(() => {
    location.href = '/'
  }).catch((error) => {
    // An error happened.
  });

  return (
    <>
      <span>로그아웃 중...</span>
    </>
  )
}
