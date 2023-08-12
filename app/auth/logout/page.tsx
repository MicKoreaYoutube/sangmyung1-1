'use client';

import { getAuth, signOut } from "firebase/auth";
import { displayError } from "@/public/js/function"
import { auth } from "@/public/js/firebase"

export default function IndexPage() {
  signOut(auth).then(() => {
    location.href = '/'
  }).catch((error) => {
    const errorMessage = error.message
    displayError(errorMessage)
  });

  return (
    <>
      <div id="error" className="hidden">
        <span id="errorMessage">로그아웃 중...</span>
      </div>
    </>
  )
}
