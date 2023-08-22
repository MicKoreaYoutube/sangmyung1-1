'use client'

import Link from "next/link"

import { displayError } from "@/public/js/function";

import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";
import { db, auth } from "@/public/js/firebase";
import React, { useState, useRef } from 'react';
import { onAuthStateChanged } from "firebase/auth";

import { siteConfig } from "@/config/site";

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Button, buttonVariants } from "@/components/ui/button"
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
import { Textarea } from "@/components/ui/textarea"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

export default function IndexPage() {

    const title = useRef(null);
    const content = useRef(null);

    async function addNewDocument() {
        const collectionRef = collection(db, "announcements");
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const cutEmail = user.email.slice(0, 5)
                const id = siteConfig.member.filter(item => item.toString().includes(cutEmail.toString()));
                const currentDate = new Date(); 
                const newData = { author: id[0], changeTime: Timestamp.fromDate(currentDate), content: content.current.value, status: "all", title: title.current.value, uploadTime: Timestamp.fromDate(currentDate) }
                try {
                    await addDoc(collectionRef, newData);
                    const suggestionId = collectionRef.id;
                    const commentsCollection = collection(db, 'suggestions', suggestionId, 'comments');
        
                    await addDoc(commentsCollection, {});
                    location.href = "/board/suggestions"
                } catch (error) {
                    displayError(error)
                }
            }
        });
        
    }

    return (
        <>
            <section className="container grid gap-6 my-28 max-w-[1000px]">
                <h1 className="font-KBO-Dia-Gothic_bold text-4xl md:text-7xl text-center">나도 건의하기</h1>
                <Card>
                    <CardHeader>
                        <CardTitle className="font-KBO-Dia-Gothic_bold md:text-4xl">건의사항 입력하기</CardTitle>
                        <CardDescription className="font-SUITE-Regular md:text-2xl">여러분이 생각하는 우리반에서 고쳐야 할 점이나 사이트에 대한 것 등을 건의해주세요!</CardDescription>
                    </CardHeader>
                    <CardContent className="font-SUITE-Regular">
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">제목</Label>
                                <Input ref={title} placeholder="제목을 입력하세요..." max={127} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="message-2">건의 할 내용</Label>
                                <Textarea ref={content} placeholder="건의할 내용을 입력하세요..." maxLength={1000} />
                                <p className="text-sm text-muted-foreground">
                                    건의하기 버튼을 누르실 경우, 당신은 {" "}
                                    <Link
                                        href="/terms"
                                        className="underline underline-offset-4 hover:text-primary"
                                    >
                                        이용약관
                                    </Link>
                                    에 동의한 것으로 간주합니다.
                                </p>
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
                        <Button className="font-SUITE-Regular" onClick={addNewDocument}>건의하기</Button>
                    </CardFooter>
                </Card>
            </section>
        </>
    )
}
