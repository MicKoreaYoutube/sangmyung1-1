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
  const [suggestions_list, setSuggestionsList] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "suggestions"), (snapshot) => {
      const suggestions = snapshot.docs.map(doc => {
        const suggestionData = doc.data();
        const changeTime = new Date(suggestionData.changeTime.seconds * 1000);
        return {
          ...suggestionData,
          changeTime: changeTime,
          id: doc.id,
        };
      });
      setSuggestionsList(suggestions);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <section className="container grid gap-6 my-28 max-w-[1000px]">
        <h1 className="font-KBO-Dia-Gothic_bold text-7xl text-center">건의사항</h1>
        <Card>
          <CardHeader>
            <CardTitle className="font-KBO-Dia-Gothic_bold">건의사항 목록</CardTitle>
            <CardDescription className="font-SUITE-Regular">최근에 올라온 건의들 입니다!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4">
              {suggestions_list?.length ? (
                <nav className="flex flex-col space-x-2 w-full">
                  {suggestions_list.map((suggestion, index) => (
                    <Link key={index} href={`/board/suggestions/${suggestion.id}`} className="hover:underline hover:underline-offset-2 w-full">
                      <h1 className="text-2xl block font-KBO-Dia-Gothic_bold">{suggestion.title} ·<span className="text-gray-400">{suggestion.author} · {suggestion.changeTime.toLocaleString()}</span></h1>
                      <span className="text-lg text-gray-700 font-SUITE-Regular">{suggestion.content.slice(0, 40)}...</span>
                      <Separator className="my-2" />
                    </Link>
                  ))}
                </nav>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Link href="/board/suggestions/create" className={buttonVariants({ variant: "default" }) + "font-SUITE-Regular"}>+나도 건의하기</Link>
          </CardFooter>
        </Card>
      </section >
    </>
  )
}

