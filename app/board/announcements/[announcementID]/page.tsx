import { collection, doc, getDoc, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/public/js/firebase";
import React, { useState, useEffect } from 'react';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function IndexPage({ params }: { params: { announcementID: string } }) {

    const [data, setData] = useState(null);
    const [subcollectionData, setSubcollectionData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const docRef = doc(db, "announcements", params.announcementID);

            try {
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setData({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.log("No such document!");
                }

                const subcollectionRef = collection(docRef, "comment");
                const subcollectionSnapshot = await getDocs(subcollectionRef);

                const subcollectionArray = [];
                subcollectionSnapshot.forEach((doc) => {
                    subcollectionArray.push({ id: doc.id, ...doc.data() });
                });

                setSubcollectionData(subcollectionArray);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);

    function formatTimestamp(timestamp: Timestamp) {
        const dateObject = new Date(timestamp.seconds * 1000);
        return dateObject.toLocaleString();
    }

    return (
        <>
            <section className="container grid gap-6 my-28 max-w-[1000px]">
                <Card className="justify-start">
                    {data ? (
                        <>
                            <CardHeader>
                                <CardTitle className="font-KBO-Dia-Gothic_bold md:text-4xl">{data.title}</CardTitle>
                                <CardDescription className="font-SUITE-Regular md:text-2xl">{data.author} · {formatTimestamp(data.changeTime)}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-lg font-SUITE-Regular whitespace-pre-wrap">{data.content}</p>
                            </CardContent>
                            {/* 서브컬렉션 댓글 관련 내용 */}
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </Card>
            </section>
        </>
    )
}
