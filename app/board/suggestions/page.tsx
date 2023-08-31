'use client'

import Link from "next/link"

import { userInfo } from "@/public/js/firebase"

import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/public/js/firebase";
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
  const [suggestionsList, setSuggestionsList] = useState([]);

  useEffect(() => {
    async function fetchSortedData() {
      const collectionRef = collection(db, "suggestions");
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

      setSuggestionsList(sortedData);
    }

    fetchSortedData();
  }, []);

  const suggestionsListFilterd = suggestionsList.filter(suggestion => suggestion.status == "delete")

  return (
    <>
      <section className="container grid gap-6 my-28 max-w-[1000px]">
        <h1 className="font-KBO-Dia-Gothic_bold text-4xl md:text-7xl text-center">건의사항</h1>
        <Card>
          <CardHeader>
            <CardTitle className="font-KBO-Dia-Gothic_bold md:text-4xl">건의사항 목록</CardTitle>
            <CardDescription className="font-SUITE-Regular md:text-2xl">최근에 올라온 건의들 입니다!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-1 md:p-4">
              {suggestionsListFilterd?.length ? (
                <nav className="flex flex-col space-x-2 w-full">
                  {suggestionsListFilterd.map((suggestion, index) => (
                    suggestion.status !== "delete" ? (
                      <>
                        <div className={`flex justify-between items-start ${index == 0 ? "ml-2" : ""}`} key={index}>
                          <Link href={`/board/suggestions/${suggestion.id}`} className="hover:underline hover:underline-offset-2 w-full">
                            <h1 className="text-xl md:text-3xl font-KBO-Dia-Gothic_bold tracking-tighter inline-block">{suggestion.title}</h1>
                          </Link>
                          {suggestion.author.slice(0, 5) == userInfo?.email.slice(0, 5) || userInfo?.email.slice(0, 5) == "10103" || userInfo?.email.slice(0, 5) == "10132" ? (
                            <div className="flex flex-row space-x-3">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline">⋮</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-1">
                                  <DropdownMenuGroup>
                                    <Link href={`/board/suggestions/${suggestion.id}/update`}>
                                      <DropdownMenuItem>
                                        <span>수정</span>
                                      </DropdownMenuItem>
                                    </Link>
                                    <Link href={`/board/suggestions/${suggestion.id}/delete`}>
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
                        <span className="text-lg text-gray-700 font-SUITE-Regular">{suggestion.content.slice(0, 40)}...</span>
                        <Separator className="my-2" />
                      </>
                    ) : null
                  ))}
                </nav>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </CardContent>
          {userInfo ? (
            <CardFooter className="flex justify-end">
              <Link href="/board/suggestions/create" className={buttonVariants({ variant: "default" }) + "font-SUITE-Regular px-2"}>+나도 건의하기</Link>
            </CardFooter>
          ) : null}
        </Card>
      </section >
    </>
  )
}
