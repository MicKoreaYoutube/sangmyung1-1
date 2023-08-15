'use client'

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { displayError } from "@/public/js/function";

import { getFirestore, collection, addDoc } from "firebase/firestore";
import { db, auth } from "@/public/js/firebase";
import React, { useState, useRef } from 'react';
import { onAuthStateChanged } from "firebase/auth";

import { siteConfig } from "@/config/site";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
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
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"

export default function IndexPage() {

    const FormSchema = z.object({
        email: z
            .string({
                required_error: "Please select an email to display.",
            })
            .email(),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    const title = useRef(null);
    const content = useRef(null);
    const status = useRef(null);

    const [newDocumentData, setNewDocumentData] = useState({ author: "", changeTime: "", content: "", status: "", title: "", uploadTime: "" } as any);

    async function addNewDocument() {
        const collectionRef = collection(db, "suggestions");
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const cutEmail = user.email.slice(0, 5)
                const id = siteConfig.member.filter(item => item.toString().includes(cutEmail.toString()));
                const currentDate = new Date(); // 현재 시간을 나타내는 Date 객체 생성

                const milliseconds = currentDate.getTime(); // 밀리초 단위로 현재 시간을 얻기

                const seconds = Math.floor(milliseconds / 1000); // 밀리초를 초로 변환
                console.log(id)
                console.log(seconds)
                console.log(content.current.value)
                console.log(status.current.value)
                console.log(title.current.value)
                setNewDocumentData({ author: id, changeTime: seconds, content: content.current.value, status: status.current.value, title: title.current.value, uploadTime: seconds })
                console.log(newDocumentData)
            }
        });
        // try {
        //     await addDoc(collectionRef, newDocumentData);
        //     const suggestionId = collectionRef.id;
        //     const commentsCollection = collection(db, 'suggestions', suggestionId, 'comments');

        //     await addDoc(commentsCollection, {});
        //     location.href = "/board/suggestions"
        // } catch (error) {
        //     displayError(error)
        // }
    }

    return (
        <>
            <section className="container grid gap-6 my-28 max-w-[1000px]">
                <h1 className="font-KBO-Dia-Gothic_bold text-7xl text-center">나도 건의하기</h1>
                <Card>
                    <CardHeader>
                        <CardTitle className="font-KBO-Dia-Gothic_bold">건의사항 입력하기</CardTitle>
                        <CardDescription className="font-SUITE-Regular">여러분이 생각하는 우리반에서 고쳐야 할 점이나 사이트에 대한 것 등을 건의해주세요!</CardDescription>
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
                                <Form {...form}>
                                    <CardContent className="font-SUITE-Regular">
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Email</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <SelectTrigger id="framework">
                                                                <SelectValue placeholder="공개 범위 지정하기" />
                                                            </SelectTrigger>
                                                            <SelectContent ref={status} position="popper">
                                                                <SelectItem value="all">전체</SelectItem>
                                                                <SelectItem value="onlyStudent">학생들만</SelectItem>
                                                                <SelectItem value="onlyAdmin">관리자에게만</SelectItem>
                                                                <SelectItem value="onlyTeacher">선생님에게만</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormItem>
                                                )}
                                            />
                                            <Button type="submit">Submit</Button>
                                        </form>
                                    </CardContent>
                                </Form>
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

