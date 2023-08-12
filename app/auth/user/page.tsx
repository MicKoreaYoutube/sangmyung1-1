'use client';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/public/js/firebase";

import React, { useState } from "react"

import { SiteConfig, siteConfig } from "@/config/site";

import { Button } from "@/components/ui/button"
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
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

export default function IndexPage() {

    const [statusMessage, messageChanger] = useState('')

    let userId

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const msg = user.displayName
            messageChanger(msg)
            user.email.slice(0, 5)
            const cutEmail = user.email.slice(0, 5)
            const id = siteConfig.member.filter(item => item.toString().includes(cutEmail.toString()));
            userId = id[0]
            console.log(userId, statusMessage)
        } else {
            // User is signed out
            // ...
        }
    });

    const changeMessage = () => {
        messageChanger(statusMessage)
    }

    return (
        <>
            <Tabs defaultValue="profile">
                <TabsList className="grid w-full grid-cols-3 font-KBO-Dia-Gothic_bold text-2xl">
                    <TabsTrigger value="profile">프로필</TabsTrigger>
                    <TabsTrigger value="email">이메일 등록</TabsTrigger>
                    <TabsTrigger value="password">비밀번호 변경</TabsTrigger>
                </TabsList>
                <TabsContent value="profile">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-KBO-Dia-Gothic_bold text-2xl">프로필</CardTitle>
                            <CardDescription className="font-SUITE-Regular text-lg">
                                다른 사람들에게 보여지는 당신의 프로필입니다.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 font-SUITE-Regular text-lg">
                            <div className="space-y-1">
                                <Label htmlFor="name">아이디</Label>
                                <Input id="name" defaultValue={userId} disabled value={userId} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="statusMessage">상태메시지</Label>
                                <Input id="statusMessage" defaultValue={statusMessage} onChange={changeMessage} value={statusMessage} />
                            </div>
                            <div className="relative">
                                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="bg-white px-3 text-gray-500 text-sm">미리보기</span>
                                </div>
                            </div>
                            <h2 className="text-3xl">{userId}</h2>
                            <span className="text-xl">{statusMessage}</span>
                        </CardContent>
                        <CardFooter>
                            <Button className="font-SUITE-Regular text-lg">Save changes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="email">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-KBO-Dia-Gothic_bold text-2xl">Email</CardTitle>
                            <CardDescription className="font-SUITE-Regular text-lg">
                                Make changes to your account here. Click save when you&#39;re done.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 font-SUITE-Regular text-lg">
                            <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" defaultValue="Pedro Duarte" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" defaultValue="@peduarte" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="font-SUITE-Regular text-lg">Save changes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="password">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-KBO-Dia-Gothic_bold text-2xl">Password</CardTitle>
                            <CardDescription className="font-SUITE-Regular text-lg">
                                Change your password here. After saving, you&#39;ll be logged out.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 font-SUITE-Regular text-lg">
                            <div className="space-y-1">
                                <Label htmlFor="current">Current password</Label>
                                <Input id="current" type="password" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="new">New password</Label>
                                <Input id="new" type="password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="font-SUITE-Regular text-lg">Save password</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </>
    )
}
