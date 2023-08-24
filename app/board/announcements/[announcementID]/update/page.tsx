'use client';

import Link from "next/link"

import { displayError } from "@/public/js/function";
import { auth } from "@/public/js/firebase"

import { onAuthStateChanged } from "firebase/auth"
import { doc, updateDoc, Timestamp, collection, getDoc, getDocs } from "firebase/firestore";
import { db, userInfo } from "@/public/js/firebase";
import { accessDenied } from "@/public/js/function";
import React, { useRef, useState, useEffect } from 'react';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

export default function IndexPage({ params }: { params: { announcementID: string } }) {

    const title = useRef(null);
    const content = useRef(null);

    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchSingleData() {
            const docRef = doc(db, "anouncements", params.announcementID);
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

    const updateDocument = async () => {
        const docRef = doc(db, "anouncements", params.announcementID)
        const currentDate = new Date();
        const newData = { changeTime: Timestamp.fromDate(currentDate), content: content.current.value, status: "all", title: title.current.value };
        try {
            await updateDoc(docRef, newData);
            location.href = '/board/anouncements'
        } catch (error) {
            displayError(error)
        }
    }

    return (
        <>
            {userInfo ? (
                userInfo.email.slice(0, 5) == "10103" || userInfo.email.slice(0, 5) == "10132" ? null : accessDenied()
            ) : accessDenied()
            }
            <section className="container grid gap-6 my-28 max-w-[1000px]">
                <h1 className="font-KBO-Dia-Gothic_bold text-4xl md:text-7xl text-center">공지사항 작성하기</h1>
                <Card>
                    {data ? (
                        <>
                            <CardHeader>
                                <CardTitle className="font-KBO-Dia-Gothic_bold md:text-4xl">공지사항 입력하기</CardTitle>
                                <CardDescription className="font-SUITE-Regular md:text-2xl">공지사항은 관리자가 올리는 게시물입니다. 한 단어 한 단어 주의해가며 작성해주세요!</CardDescription>
                            </CardHeader>
                            <CardContent className="font-SUITE-Regular">
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name">제목</Label>
                                        <Input ref={title} placeholder="제목을 입력하세요..." max={127} />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="message-2">공지사항 내용</Label>
                                        <Textarea ref={content} placeholder="작성할 내용을 입력하세요..." maxLength={1000} />
                                    </div>
                                    <Alert variant="destructive" className="hidden" id="error">
                                        <AlertTitle>Error</AlertTitle>
                                        <AlertDescription id="errorMessage">
                                            Error Message
                                        </AlertDescription>
                                    </Alert>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                <Button className="font-SUITE-Regular" onClick={updateDocument}>업로드하기</Button>
                            </CardFooter>
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </Card>
            </section>
        </>
    )
}
