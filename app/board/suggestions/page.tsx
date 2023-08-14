'use client';

import { onSnapshot, collection, getDocs } from "firebase/firestore";
import { db } from "@/public/js/firebase";
import React, { useState, useEffect } from 'react';

import { Button } from "@/components/ui/button";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export default function IndexPage() {

  let suggestions_list: any

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "suggestions"), (snapshot) => {
      const tags = snapshot.docs.map(doc => doc.data());
      suggestions_list = tags
    });

    // Clean up subscription when component unmounts
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
            {suggestions_list.map((suggestion: any, index: any) => (
              <React.Fragment key={index}>
                <div>
                  <h3 className="text-xl">{suggestion.title} ·<span className="text-sm text-gray-400">{suggestion.author}</span>·<span className="text-sm text-gray-400">{suggestion.changeTime}</span></h3>
                  <span className="text-lg text-gray-700">{suggestion.content.slice(0, 40)}...</span>
                </div>
                <Separator className="my-2" />
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      </section>
    </>
  )
}