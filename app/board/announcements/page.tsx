'use client'

import Link from "next/link"

import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db, userInfo } from "@/public/js/firebase";
import React, { useState, useEffect } from 'react';

import { Separator } from "@/components/ui/separator"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function IndexPage() {
  const [announcementsList, setAnnouncementsList] = useState([]);

  useEffect(() => {
    async function fetchSortedData() {
      const collectionRef = collection(db, "announcements");
      const q = query(collectionRef, orderBy("changeTime", "desc"));

      const querySnapshot = await getDocs(q);
      const sortedData: any = [];

      querySnapshot.forEach((doc) => {
        const suggestionData = doc.data();
        const changeTime = new Date(suggestionData.changeTime.seconds * 1000);
        sortedData.push({
          id: doc.id,
          ...suggestionData,
          changeTime: changeTime,
        });
      });

      setAnnouncementsList(sortedData);
    }

    fetchSortedData();
  }, []);

  return (
    <>
      <section className="container grid gap-6 my-28 max-w-[1000px]">
        <h1 className="font-KBO-Dia-Gothic_bold text-4xl md:text-7xl text-center">공지사항</h1>
        <Card>
          <CardHeader>
            <CardTitle className="font-KBO-Dia-Gothic_bold md:text-4xl">공지사항 목록</CardTitle>
            <CardDescription className="font-SUITE-Regular md:text-2xl">관리자가 올린 공지사항입니다! 중요한 내용이 있을 수 있으니 자주자주 확인해주세요!</CardDescription>
          </CardHeader>
          <CardContent>
            {announcementsList?.length ? (
              <nav className="flex flex-col space-x-2 w-full">
                {announcementsList.map((announcements, index) => {
                  if (announcements.status !== "delete") {
                    return (
                      <>
                        <div className={`flex justify-between items-start ${index == 0 ? "ml-2" : ""}`}>
                          <Link key={index} href={`/board/announcements/${announcements.id}`} className="hover:underline hover:underline-offset-2 w-full">
                            <h1 className="text-xl md:text-3xl font-KBO-Dia-Gothic_bold tracking-tighter inline-block">{announcements.title}</h1>
                          </Link>
                          {announcements.author.slice(0, 5) == userInfo?.email.slice(0, 5) || userInfo?.email.slice(0, 5) == "10103" || userInfo?.email.slice(0, 5) == "10132" ? (
                            <div className="flex flex-row space-x-3">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline">⋮</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-1">
                                  <DropdownMenuGroup>
                                    <Link href={`/board/announcements/${announcements.id}/update`}>
                                      <DropdownMenuItem>
                                        <span>수정</span>
                                      </DropdownMenuItem>
                                    </Link>
                                    <Link href={`/board/announcements/${announcements.id}/delete`}>
                                      <DropdownMenuItem>
                                        <span>삭제</span>
                                      </DropdownMenuItem>
                                    </Link>
                                  </DropdownMenuGroup>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          ) : null}
                        </div>
                        <span className="text-lg text-gray-700 font-SUITE-Regular">{announcements.content.slice(0, 40)}...</span>
                        <Separator className="my-2" />
                      </>
                    );
                  }
                  return null;
                })}
              </nav>
            ) : (
              <p>Loading...</p>
            )}
          </CardContent>
          {userInfo ? (
            userInfo.email.slice(0, 5) == "10103" || userInfo.email.slice(0, 5) == "10132" ? (
              <CardFooter className="flex justify-end">
                <Link href="/board/announcements/create" className={buttonVariants({ variant: "default" }) + "font-SUITE-Regular px-2"}>+공지사항 추가하기</Link>
              </CardFooter>
            ) : null
          ) : null}
        </Card>
      </section >
    </>
  )
}
