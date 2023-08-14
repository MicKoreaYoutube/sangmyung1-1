import { collection, getDocs } from "firebase/firestore";
import { db } from "@/public/js/firebase";

export default function IndexPage() {
  async function fetchData() {
    const querySnapshot = await getDocs(collection(db, "suggestions"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  }

  async function fetchAndLogData() {
    await fetchData();
    console.log("Data fetched and logged.");
  }

  fetchAndLogData();

  return (
    <>
      <h1>Hallu</h1>
    </>
  )
}
