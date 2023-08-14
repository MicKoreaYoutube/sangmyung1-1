import { collection, getDocs } from "firebase/firestore";
import { db } from "@/public/js/firebase";

import { Button } from "@/components/ui/button";

async function IndexPage() {
  const querySnapshot = await getDocs(collection(db, "suggestions"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });

  return (
    <>
      <h1>Hallu</h1>
      <Button>Hallu</Button>
    </>
  )
}

export default IndexPage
