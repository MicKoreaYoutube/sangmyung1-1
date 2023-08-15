'use client';

import { onSnapshot, doc, getDoc } from "firebase/firestore";
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
        // 단일 문서 가져오기 (getDoc 사용)
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

    return (
        <>
            <section className="container grid gap-6 my-28 max-w-[1000px] place-element-center">
                {data ? (
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>{data.title}</CardTitle>
                                <CardDescription>{data.author}·{new Date(data.changeTime).toLocaleString()}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form>
                                    <div className="grid w-full items-center gap-4">
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="name">Name</Label>
                                            <Input id="name" placeholder="Name of your project" />
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="framework">Framework</Label>
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline">Cancel</Button>
                                <Button>Deploy</Button>
                            </CardFooter>
                        </Card>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </section>
        </>
    )
}