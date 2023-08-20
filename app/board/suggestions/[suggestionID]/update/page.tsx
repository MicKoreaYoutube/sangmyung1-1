'use client';

import Link from "next/link"

import { displayError } from "@/public/js/function";

import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "@/public/js/firebase";
import React, { useRef } from 'react';

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

export default function IndexPage({ params }: { params: { suggestionID: string } }) {

    const title = useRef(null);
    const content = useRef(null);
    const status = useRef(null);

    const updateDocument = async () => {
        const docRef = doc(db, "suggestions", params.suggestionID)
        const currentDate = new Date();
        const status_list = { 전체: "onlyStudent", 학생들만: "onlyAdmin", 관리자에게만: "onlyTeacher", 선생님에게만: "all", 익명: "anonymous" }
        const statusValue: "전체" | "학생들만" | "관리자에게만" | "선생님에게만" | "익명" = status.current.innerHTML
        const newData = { changeTime: Timestamp.fromDate(currentDate), content: content.current.value, status: status_list[statusValue], title: title.current.value };
        try {
            await updateDoc(docRef, newData);
            location.href = '/board/suggestions'
        } catch (error) {
            displayError(error)
        }
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
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="framework">공개 범위</Label>
                                <Select>
                                    <SelectTrigger id="framework">
                                        <SelectValue placeholder="공개 범위 지정하기" ref={status} />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="all">전체</SelectItem>
                                        <SelectItem value="onlyStudent">학생들만</SelectItem>
                                        <SelectItem value="onlyAdmin">관리자에게만</SelectItem>
                                        <SelectItem value="onlyTeacher">선생님에게만</SelectItem>
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
                        <Button className="font-SUITE-Regular" onClick={updateDocument}>건의하기</Button>
                    </CardFooter>
                </Card>
            </section>
        </>
    )
}
