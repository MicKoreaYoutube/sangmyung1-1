import { collection, getDocs } from "firebase/firestore";
import { db } from "@/public/js/firebase";

import { Button } from "@/components/ui/button";

export default function IndexPage() {
  async function fetchData () {
    const querySnapshot = await getDocs(collection(db, "suggestions"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      console.log('이게 이렇게 오래 끌 부분이냐?')
    });
  }

  fetchData()
  console.log('이게 이렇게 오래 끌 부분이냐?')

  return (
    <>
      <h1>Hallu</h1>
    </>
  )
}
