'use client';

import { signOut } from "firebase/auth";
import { displayError, logouted } from "@/public/js/function"
import { auth } from "@/public/js/firebase"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export default function IndexPage() {

  signOut(auth).then(() => {
    location.href = '/'
  }).catch((error) => {
    const errorMessage = error.message
    displayError(errorMessage)
  });

  return (
    <>
      <Alert variant="destructive" className="hidden" id="error">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription id="errorMessage">
          Error Message
        </AlertDescription>
      </Alert>
    </>
  )
}
