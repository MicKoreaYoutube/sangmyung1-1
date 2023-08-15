'use client'

import { onSnapshot, collection, getDocs } from "firebase/firestore";
import { db } from "@/public/js/firebase";
import React, { useState, useEffect } from 'react';

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

// 이전 코드...

export default function IndexPage() {
  const [suggestions_list, setSuggestionsList] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "suggestions"), (snapshot) => {
      const suggestions = snapshot.docs.map(doc => {
        const suggestionData = doc.data();
        // Timestamp를 Date 객체로 변환
        const changeTime = new Date(suggestionData.changeTime.seconds * 1000);
        return {
          ...suggestionData,
          changeTime: changeTime,
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
        <h1 className="font-KBO-Dia-Gothic_bold text-7xl text-center">이용약관</h1>
        <ScrollArea className="font-SUITE-Regular rounded-md border">
          <div className="p-4">
            {suggestions_list?.length ? (
              <nav className="nav-flex items-center space-x-2">
                {suggestions_list.map((suggestion, index) => (
                  <div key={index} className="items-center h-full">
                    <h3 className="text-xl">{suggestion.title} ·<span className="text-sm text-gray-400">{suggestion.author}</span>·<span className="text-sm text-gray-400">{suggestion.changeTime.toLocaleString()}</span></h3>
                    <span className="text-lg text-gray-700">{suggestion.content.slice(0, 40)}...</span>
                    <Separator className="my-2 w-full" />
                  </div>
                ))}
              </nav>
            ) : null}
          </div>
        </ScrollArea>
      </section>
    </>
  )
}

