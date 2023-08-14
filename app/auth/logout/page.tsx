'use client';

import { signOut } from "firebase/auth";
import { displayError, logouted } from "@/public/js/function"
import { auth } from "@/public/js/firebase"

export default function IndexPage() {

  logouted()

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
