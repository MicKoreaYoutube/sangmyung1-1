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
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Create project</CardTitle>
                        <CardDescription>Deploy your new project in one-click.</CardDescription>
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
                                    <Label htmlFor="framework">Framework</Label>
                                    <Select>
                                        <SelectTrigger id="framework">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                            <SelectItem value="next">Next.js</SelectItem>
                                            <SelectItem value="sveltekit">SvelteKit</SelectItem>
                                            <SelectItem value="astro">Astro</SelectItem>
                                            <SelectItem value="nuxt">Nuxt.js</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline">Cancel</Button>
                        <Button>Deploy</Button>
                    </CardFooter>
                </Card>
            </section>
        </>
    )
}

