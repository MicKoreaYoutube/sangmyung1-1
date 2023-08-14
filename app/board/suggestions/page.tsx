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
    onSnapshot(collection(db, "suggestions"), (snapshot) => {
      const tags = snapshot.docs.map(
        doc => doc.data()
      )
      suggestions_list = tags
    })
  })

  return (
    <>
      <ScrollArea className="h-72 w-48 rounded-md border">
        <div className="p-4">
          {suggestions_list.map((suggestions_list: any) => (
            <React.Fragment>
              <div className="text-sm" key={suggestions_list}>
                {suggestions_list.title}
              </div>
              <Separator className="my-2" />
            </React.Fragment>
          ))}
        </div>
      </ScrollArea >
    </>
  )
}
