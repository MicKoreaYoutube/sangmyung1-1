'use client'

import Link from "next/link"

import { onSnapshot, collection, getDocs } from "firebase/firestore";
import { db } from "@/public/js/firebase";
import React, { useState, useEffect } from 'react';

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function IndexPage() {

    return (
        <>
            <section className="container grid gap-6 my-28 max-w-[1000px]">
                <h1 className="font-KBO-Dia-Gothic_bold text-7xl text-center">나도 건의하기</h1>
                <Card>
                    <CardHeader>
                        <CardTitle>건의사항 입력하기</CardTitle>
                        <CardDescription>여러분이 생각하는 우리반에서 고쳐야 할 점이나 사이트에 대한 것 등을 건의해주세요!</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">제목</Label>
                                    <Input placeholder="제목을 입력하세요..." max={127} />
                                    <Label htmlFor="message-2">건의 할 내용</Label>
                                    <Textarea placeholder="건의할 내용을 입력하세요..." />
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
                                            <SelectValue placeholder="공개 범위 지정하기" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value="all">전체</SelectItem>
                                            <SelectItem value="onlyStudent">학생들만</SelectItem>
                                            <SelectItem value="onlyAdmin">관리자에게만</SelectItem>
                                            <SelectItem value="onlyTeacher">선생님에게만</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button>건의하기</Button>
                    </CardFooter>
                </Card>
            </section>
        </>
    )
}

