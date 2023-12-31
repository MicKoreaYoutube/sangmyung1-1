'use client';

import Link from "next/link"

import { ChevronRight } from 'lucide-react';

import { siteConfig } from "@/config/site";

import { doc, updateDoc, Timestamp, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import { auth, db, userInfo } from "@/public/js/firebase";
import { accessDenied, displayError, isDateInRange } from "@/public/js/function";
import React, { useRef, useState, useEffect } from 'react';

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

export default function IndexPage({ params }: { params: { suggestionID: string } }) {

    const title = useRef(null);
    const content = useRef(null);
    const status = useRef(null);
    const BanDialogButton = useRef(null);

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
                    }
                }
            })

        }
        fetchSingleData();
    }, [userBanData])

    function formatTimestamp(timestamp: any) {
        if (timestamp !== null) {
            const dateObject = new Date(timestamp?.seconds * 1000);
            return dateObject
        } else {
            return timestamp
        }

    }

    const updateDocument = async () => {
        if (isDateInRange(formatTimestamp(userBanData.userBanStartTime), formatTimestamp(userBanData.userBanEndTime)) || userBanData.userBanEndTime == "영구 정지") {
            BanDialogButton.current.click();
        } else {
            if (title.current.value == "" || content.current.value == "" || status.current.innerHTML == "익명 여부") {
                displayError("모든 칸을 다 채워주세요.")
            } else {
                const docRef = doc(db, "suggestions", params.suggestionID)
                const currentDate = new Date();
                const status_list = { 공개: "all", 익명: "anonymous" }
                const statusValue: "공개" | "익명" = status.current.innerHTML
                const newData = { changeTime: Timestamp.fromDate(currentDate), content: content.current.value, status: status_list[statusValue], title: title.current.value };
                try {
                    await updateDoc(docRef, newData);
                    location.href = '/board/suggestions'
                } catch (error) {
                    displayError(error)
                }
            }
        }
    }

    return (
        <>
            <section className="container grid gap-6 my-28 max-w-[1000px]">
                <h1 className="font-KBO-Dia-Gothic_bold text-4xl md:text-7xl text-center">나도 건의하기</h1>
                <Card>
                    {data ? (
                        <>
                            <div className="flex justify-end">
                                <Link href="/board/suggestions" className={buttonVariants({ variant: "ghost" }) + "font-SUITE-Regular px-2 absolute m-2"}><ChevronRight /></Link>
                            </div>
                            {userInfo ? (
                                data.author.slice(0, 5) == userInfo.email.slice(0, 5) || userInfo.email.slice(0, 5) == "10103" || userInfo.email.slice(0, 5) == "10132" ? null : accessDenied()
                            ) : accessDenied()
                            }
                            <CardHeader>
                                <CardTitle className="font-KBO-Dia-Gothic_bold md:text-4xl">건의사항 수정하기</CardTitle>
                                <CardDescription className="font-SUITE-Regular md:text-2xl">여러분이 생각하는 우리반에서 고쳐야 할 점이나 사이트에 대한 것 등을 건의해주세요!</CardDescription>
                            </CardHeader>
                            <CardContent className="font-SUITE-Regular">
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name">제목</Label>
                                        <Input ref={title} placeholder="제목을 입력하세요..." min={3} max={127} defaultValue={data.title} />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="message-2">건의 할 내용</Label>
                                        <Textarea ref={content} placeholder="건의할 내용을 입력하세요..." minLength={3} maxLength={1000} defaultValue={data.content} rows={8} />
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
                                <Button className="font-SUITE-Regular" onClick={updateDocument}>수정하기</Button>
                            </CardFooter>
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </Card>
            </section>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline" className="hidden" ref={BanDialogButton}>Show Dialog</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="font-KBO-Dia-Gothic_bold md:text-3xl">귀하는 현재 정지 상태 입니다.</AlertDialogTitle>
                        {userBanData ? (
                            <AlertDialogDescription className="font-SUITE-Regular md:text-xl">
                                귀하는 이용약관 위반으로 현재 정지 상태이십니다.<br />
                                정지 사유: <span>{userBanData.userBanReason}</span><br />
                                정지 기간: <span>{formatTimestamp(userBanData.userBanStartTime).toLocaleString()} ~ {userBanData.userBanEndTime == "영구 정지" ? "영구 정지" : formatTimestamp(userBanData.userBanEndTime).toLocaleString()}</span>
                            </AlertDialogDescription>
                        ) : null}
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>확인</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
