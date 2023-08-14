import { doc, getDoc } from "firebase/firestore";
import { db } from "@/public/js/firebase";

import { Button } from "@/components/ui/button";

export default function IndexPage() {

  const docRef = doc(db, "suggestions", "8XyqHAA1pgbF1KcYOidR");

  console.log(docRef)

  async function fetchData() {

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  fetchData()

  return (
    <>
      <h1>Hallu</h1>
    </>
  )
}
