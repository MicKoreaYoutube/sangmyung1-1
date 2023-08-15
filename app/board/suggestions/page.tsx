'use client'

import Link from "next/link"

import { onSnapshot, collection, getDocs } from "firebase/firestore";
import { db } from "@/public/js/firebase";
import React, { useState, useEffect } from 'react';

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

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
      <section className="container grid gap-6 my-28 max-w-[1000px] place-element-center">
        <h1 className="font-KBO-Dia-Gothic_bold text-7xl text-center">건의사항</h1>
        <ScrollArea className="font-SUITE-Regular rounded-lg border">
          <div className="p-4">
            {suggestions_list?.length ? (
              <nav className="flex flex-col items-center space-x-2">
                {suggestions_list.map((suggestion, index) => (
                  <Link key={index} href={`/board/suggestions/${suggestion.id}`} className="underline hover:underline-offset-2">
                    <h1 className="text-2xl block font-KBO-Dia-Gothic_bold">{suggestion.title} ·<span className="text-gray-400">{suggestion.author} · {suggestion.changeTime.toLocaleString()}</span></h1>
                    <span className="text-lg text-gray-700">{suggestion.content.slice(0, 40)}...</span>
                    <Separator className="my-2"/>
                  </Link>
                ))}
              </nav>
            ) : (
              <p>Loading...</p>
          )}
          </div>
        </ScrollArea>
      </section>
    </>
  )
}

