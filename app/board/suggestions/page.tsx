'use client'

import Link from "next/link"

import { collection, getDocs, orderBy, query } from "firebase/firestore";
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

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
            <div className="p-4">
              {suggestionsList?.length ? (
                <nav className="flex flex-col space-x-2 w-full">
                  {suggestionsList.map((suggestion, index) => {
                    if (suggestion.status !== "delete") {
                      return (
                        <>
                          <div className="flex justify-between">
                            <Link key={index} href={`/board/suggestions/${suggestion.id}`} className="hover:underline hover:underline-offset-2 w-full">
                              <h1 className="text-2xl block font-KBO-Dia-Gothic_bold">{suggestion.title}</h1>
                            </Link>
                            <Select>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="⋮" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="apple">수정</SelectItem>
                                  <SelectItem value="banana">삭제</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                          <span className="text-lg text-gray-700 font-SUITE-Regular">{suggestion.content.slice(0, 40)}...</span>
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
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Link href="/board/suggestions/create" className={buttonVariants({ variant: "default" }) + "font-SUITE-Regular px-2"}>+나도 건의하기</Link>
          </CardFooter>
        </Card>
      </section >
    </>
  )
}
