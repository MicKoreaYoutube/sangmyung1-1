'use client';

import { onSnapshot, doc, getDoc, Timestamp } from "firebase/firestore";
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
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function IndexPage({
    params,
}: {
    params: { suggestionID: string };
}) {

    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchSingleData() {
            const docRef = doc(db, "suggestions", params.suggestionID);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setData({ id: docSnap.id, ...docSnap.data() });
            } else {
                console.log("No such document!");
            }
        }
        fetchSingleData();
    }, []);

    function formatTimestamp(timestamp: Timestamp) {
        const dateObject = new Date(timestamp.seconds * 1000);
        return dateObject.toLocaleString();
    }

    return (
        <>
            <section className="container grid gap-6 my-28 max-w-[1000px] place-element-center">
                {data ? (
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-KBO-Dia-Gothic_bold">{data.title}</CardTitle>
                                <CardDescription className="font-SUITE-Regular">{data.author} · {formatTimestamp(data.changeTime)}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-lg font-SUITE-Regular whitespce-pre-line">{data.content}</p>
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </section>
        </>
    )
}