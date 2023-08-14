'use client';

import { signOut, onAuthStateChanged } from "firebase/auth";
import { displayError, logouted } from "@/public/js/function"
import { auth } from "@/public/js/firebase"

export default function IndexPage() {

  onAuthStateChanged(auth, (user) => {
    if (user) {
      signOut(auth).then(() => {
        location.href = '/'
      }).catch((error) => {
        const errorMessage = error.message
        displayError(errorMessage)
      });
    } else {
        if (typeof window !== 'undefined') {
            alert('로그인을 하셔야 접속 하실 수 있습니다.')
            history.go(-1)
        }
    }
});


  return (
    <>
      <div id="error" className="hidden">
        <span id="errorMessage">로그아웃 중...</span>
      </div>
    </>
  )
}
