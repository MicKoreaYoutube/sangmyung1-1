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
  const [suggestions_list, setSuggestionsList] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "suggestions"), (snapshot) => {
      const tags = snapshot.docs.map(doc => doc.data());
      setSuggestionsList(tags); // 상태 업데이트로 수정
    });

    // Clean up subscription when component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <ScrollArea className="h-72 w-48 rounded-md border">
        <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
            {suggestions_list.map((suggestion, index) => (
              <React.Fragment key={index}>
                <div className="text-sm">
                  {suggestion.title}
                </div>
                <Separator className="my-2" />
              </React.Fragment>
            ))}
        </div>
      </ScrollArea>
    </>
  )
}