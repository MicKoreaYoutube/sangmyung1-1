'use client'

import Link from "next/link"

import { ChevronRight } from 'lucide-react';

import { displayError, logouted, isDateInRange } from "@/public/js/function";

import { collection, addDoc, Timestamp, doc, getDoc } from "firebase/firestore";
import { db, auth, userInfo } from "@/public/js/firebase";
import React, { useRef, useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";

import { siteConfig } from "@/config/site";

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
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function IndexPage() {

    const title = useRef(null);
    const content = useRef(null);
    const status = useRef(null);
    const BanDialogButton = useRef(null);
    const userBanReason = useRef(null);
    const userBanRange = useRef(null);

    const [userBanData, setUserBanData] = useState(null)

    useEffect(() => {
        function fetchSingleData() {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const cutEmail = user.email.slice(0, 5)
                    const id = siteConfig.member.filter(item => item && item.toString().includes(cutEmail.toString()));

                    const docRef = doc(db, "user", "19072김두한");
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setUserBanData({ id: docSnap.id, ...docSnap.data() })
                        console.log(userBanData)
                    } else {
                        console.log("그딴거 없음 ㅅㄱ")
                    }
                }
            })

        }
        fetchSingleData();
    }, [])

    function formatTimestamp(timestamp: Timestamp) {
        const dateObject = new Date(timestamp.seconds * 1000);
        return dateObject
    }

    async function addNewDocument() {

        /*if (isDateInRange(formatTimestamp(data.userBanStartTime), formatTimestamp(data.userBanEndTime))) {
            BanDialogButton.current.click();

            userBanReason.current.innerHTML = data.userBanReason
            userBanRange.current.innerHTML = `${data.userBanStartTime} ~ ${data.userBanEndTime}`
        } else {*/
        /*if (title.current.value == "" || content.current.innerHTML == "" || status.current.innerHTML == "익명 여부") {
            displayError("모든 칸을 다 채워주세요.")
        } else {*/
        const collectionRef = collection(db, "suggestions");
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const cutEmail = user.email.slice(0, 5)
                const id = siteConfig.member.filter(item => item && item.toString().includes(cutEmail.toString()));
                const currentDate = new Date();
                const status_list = { 공개: "all", 익명: "anonymous" }
                const statusValue: "공개" | "익명" = status.current.innerHTML
                const newData = { author: id[0], changeTime: Timestamp.fromDate(currentDate), content: content.current.value, status: status_list[statusValue], title: title.current.value, uploadTime: Timestamp.fromDate(currentDate) }
                try {
                    const newDocRef = await addDoc(collectionRef, newData);
                    const commentsCollection = collection(newDocRef, 'comments');
                    const commentData = { status: "delete" };
                    const newCommentDocRef = await addDoc(commentsCollection, commentData);

                    location.href = '/board/suggestions'
                } catch (error) {
                    displayError(error)
                }
            }
        });
        //}
        //}
    }

    return (
        <>
            {userInfo ? null : logouted()}
            <section className="container grid gap-6 my-28 max-w-[1000px]">
                <h1 className="font-KBO-Dia-Gothic_bold text-4xl md:text-7xl text-center">나도 건의하기</h1>
                <Card>
                    <div className="flex justify-end">
                        <Link href="/board/suggestions" className={buttonVariants({ variant: "ghost" }) + "font-SUITE-Regular px-2 absolute m-2"}><ChevronRight /></Link>
                    </div>
                    <CardHeader>
                        <CardTitle className="font-KBO-Dia-Gothic_bold md:text-4xl">건의사항 입력하기</CardTitle>
                        <CardDescription className="font-SUITE-Regular md:text-2xl">여러분이 생각하는 우리반에서 고쳐야 할 점이나 사이트에 대한 것 등을 건의해주세요!</CardDescription>
                    </CardHeader>
                    <CardContent className="font-SUITE-Regular">
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">제목</Label>
                                <Input ref={title} placeholder="제목을 입력하세요..." min={3} max={127} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="message-2">건의 할 내용</Label>
                                <Textarea ref={content} placeholder="건의할 내용을 입력하세요..." minLength={3} maxLength={1000} rows={8} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="framework">익명 여부</Label>
                                <Select>
                                    <SelectTrigger id="framework">
                                        <SelectValue placeholder="익명 여부" ref={status} />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="all">공개</SelectItem>
                                        <SelectItem value="anonymous">익명</SelectItem>
                                    </SelectContent>
                                </Select>
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
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline" className="hidden" ref={BanDialogButton}>Show Dialog</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="font-KBO-Dia-Gothic_bold">귀하는 현재 정지 상태 입니다.</AlertDialogTitle>
                        <AlertDialogDescription className="font-SUITE-Regular">
                            귀하는 이용약관 위반으로 현재 정지 상태이십니다.
                            정지 사유: <span ref={userBanReason}>정지사유</span><br />
                            정지 기간: <span ref={userBanRange}>정지기간</span>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>확인</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
