'use client';

import Link from "next/link"

import { ChevronRight } from 'lucide-react';

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
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function IndexPage({ params }: { params: { announcementID: string } }) {

    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchSingleData() {
            const docRef = doc(db, "announcements", params.announcementID);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setData({ id: docSnap.id, ...docSnap.data() });
            }
        }
        fetchSingleData();
    }, []);

    const [subcollectionData, setSubcollectionData] = useState([]);

    useEffect(() => {
        async function fetchSubcollectionData() {
            const docRef = doc(db, "announcements", params.announcementID);
            const subcollectionRef = collection(docRef, "comment");
            const subcollectionSnapshot = await getDocs(subcollectionRef);

            const subcollectionArray: any = [];
            subcollectionSnapshot.forEach((doc) => {
                subcollectionArray.push({ id: doc.id, ...doc.data() });
            });

            setSubcollectionData(subcollectionArray);
        }
        fetchSubcollectionData();
    }, []);

    function formatTimestamp(timestamp: Timestamp) {
        const dateObject = new Date(timestamp.seconds * 1000);
        return dateObject.toLocaleString();
    }

    return (
        <>
            {data ? (
            <section className="container grid gap-6 my-28 max-w-[1000px]">
                <Card className="justify-start">
                    <div className="flex justify-end">
                        <Link href="/board/announcements" className={buttonVariants({ variant: "ghost" }) + "font-SUITE-Regular px-2 absolute m-2"}><ChevronRight /></Link>
                    </div>
                            <CardHeader>
                                <CardTitle className="font-KBO-Dia-Gothic_bold md:text-4xl flex justify-between">
                                    <span>{data.title}</span>
                                </CardTitle>
                                <CardDescription className="font-SUITE-Regular md:text-2xl">{data.author} · {formatTimestamp(data.changeTime)}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-lg font-SUITE-Regular whitespace-pre-wrap">{data.content}</p>
                            </CardContent>
                            {/*<CardFooter className="font-SUITE-Regular flex flex-col justify-start w-full">
                                <Input placeholder="댓글을 달아보세요..." />
                                {subcollectionData.map((item) => (
                                    <div key={item.id}>
                                        <Separator className="my-2" />
                                        <h3 className="text-lg">{item.author} · {formatTimestamp(item.changeTime)}</h3>
                                        <p className="text-md">{item.comment}</p>
                                    </div>
                                ))}
                            </CardFooter>*/}
                </Card>
            </section>
            ) : (
                <p>Loading...</p>
            )}
        </>
    )
}
