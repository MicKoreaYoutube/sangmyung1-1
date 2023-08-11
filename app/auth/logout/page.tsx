'use client';

import { getAuth, signOut } from "firebase/auth";

export default function IndexPage() {
  const auth = getAuth();

  signOut(auth).then(() => {
    location.href = '/'
  }).catch((error) => {
    location.href = '/fuckyou'
  });

  return (
    <>
      <span id="error">로그아웃 중...</span>
    </>
  )
}
