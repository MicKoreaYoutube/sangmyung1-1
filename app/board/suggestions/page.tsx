import { collection, getDocs } from "firebase/firestore";
import { db } from "@/public/js/firebase";

import { Button } from "@/components/ui/button";

export default function IndexPage() {
  async function fetchData () {
    const querySnapshot = await getDocs(collection(db, "suggestions"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  }

  fetchData()

  return (
    <>
      <h1>Hallu</h1>
      <Button onClick={fetchData}>Hallu</Button>
    </>
  )
}
