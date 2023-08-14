import { doc, getDoc } from "firebase/firestore";
import { db } from "@/public/js/firebase";

import { Button } from "@/components/ui/button";

export default function IndexPage() {
  async function fetchData() {
    const docRef = doc(db, "suggestions", "8XyqHAA1pgbF1KcYOidR");
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
