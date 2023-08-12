'use client';

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
    return (
        <>
            <Tabs defaultValue="profile">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="profile">프로필</TabsTrigger>
                    <TabsTrigger value="email">이메일 등록</TabsTrigger>
                    <TabsTrigger value="password">비밀번호 변경</TabsTrigger>
                </TabsList>
                <TabsContent value="profile">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-KBO-Dia-Gothic_bold text-xl">프로필</CardTitle>
                            <CardDescription className="font-SUITE-Regular text-lg">
                                다른 사람들에게 보여지는 당신의 프로필입니다.
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
                <TabsContent value="email">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-KBO-Dia-Gothic_bold text-xl">Email</CardTitle>
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
                            <CardTitle className="font-KBO-Dia-Gothic_bold text-xl">Password</CardTitle>
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
