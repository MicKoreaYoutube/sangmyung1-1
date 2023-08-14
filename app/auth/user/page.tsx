'use client';

import { onAuthStateChanged, updateProfile, updatePassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/public/js/firebase";
import { displayError, logouted } from "@/public/js/function";

import React, { useState, useRef } from "react"

import { siteConfig } from "@/config/site";

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
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

export default function IndexPage() {

    const statusMessageInput = useRef(null);
    const current = useRef(null);
    const newPwd = useRef(null);
    const newPwdCheck = useRef(null);

    const [statusMessage, messageChanger] = useState('')

    const [userId, idDefiner] = useState('')

    onAuthStateChanged(auth, (user) => {
        if (user) {
            messageChanger(user.displayName)
            const cutEmail = user.email.slice(0, 5)
            const id = siteConfig.member.filter(item => item.toString().includes(cutEmail.toString()));
            idDefiner(id[0])
        }
    });

    const changeStatusMessage = () => {
        updateProfile(auth.currentUser, {
            displayName: statusMessageInput.current.value
        }).then(() => {
            history.go(0);
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            displayError(errorMessage)
        });
    }

    const codeError = () => {
        displayError('옳지 않은 코드 입니다')
    }

    const changePwd = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const email = user.email
                signInWithEmailAndPassword(auth, email, current.current.value)
                    .then((userCredential) => {
                        if (newPwd.current.value == newPwdCheck.current.value) {
                            const user = auth.currentUser;
                            const newPassword = newPwd.current.value;

                            updatePassword(user, newPassword).then(() => {
                                location.href = '/auth/logout'
                            }).catch((error) => {
                                const errorCode = error.code;
                                const errorMessage = error.message;
                                displayError(errorMessage)
                            });
                        } else {
                            displayError('새로운 비밀번호 입력창과 비밀번호 확인 입력창이 일치하지 않습니다')
                        }
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        displayError(errorMessage)
                    });
            }
        });
    }

    logouted()

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
                                <Input id="name" value={userId} disabled />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="statusMessage">상태메시지</Label>
                                <Input ref={statusMessageInput} defaultValue={statusMessage} placeholder="상태메시지를 입력하세요..." />
                            </div>
                            <Alert variant="destructive" className="hidden" id="error">
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription id="errorMessage">
                                    Error Message
                                </AlertDescription>
                            </Alert>
                        </CardContent>
                        <CardFooter>
                            <Button className="font-SUITE-Regular text-lg" onClick={changeStatusMessage}>Save changes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="email">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-KBO-Dia-Gothic_bold text-2xl">이메일 등록</CardTitle>
                            <CardDescription className="font-SUITE-Regular text-lg">
                                이메일을 등록하시면 최신 건의함 소식을 이메일로 빠르게 받아보실 수 있습니다!
                                이메일을 등록하시기 전, 관리자에게 받은 코드를 입력해주세요.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 font-SUITE-Regular text-lg">
                            <div className="space-y-1">
                                <Label htmlFor="code">코드 입력</Label>
                                <Input type="number" id="code" placeholder="코드를 입력하세요..." />
                            </div>
                            <Alert variant="destructive" className="hidden" id="error">
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription id="errorMessage">
                                    Error Message
                                </AlertDescription>
                            </Alert>
                        </CardContent>
                        <CardFooter>
                            <Button className="font-SUITE-Regular text-lg" onClick={codeError}>Save changes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="password">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-KBO-Dia-Gothic_bold text-2xl">비밀번호 변경</CardTitle>
                            <CardDescription className="font-SUITE-Regular text-lg">
                                비밀번호를 변경하세요! 변경 후에는 자동으로 로그아웃 됩니다.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 font-SUITE-Regular text-lg">
                            <div className="space-y-1">
                                <Label htmlFor="current">현재 비밀번호</Label>
                                <Input ref={current} type="password" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="new">새로운 비밀번호</Label>
                                <Input ref={newPwd} type="password" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="newCheck">새로운 비밀번호 확인</Label>
                                <Input ref={newPwdCheck} type="password" />
                            </div>
                            <Alert variant="destructive" className="hidden" id="error">
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription id="errorMessage">
                                    Error Message
                                </AlertDescription>
                            </Alert>
                        </CardContent>
                        <CardFooter>
                            <Button className="font-SUITE-Regular text-lg" onClick={changePwd}>Save password</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </>
    )
}
