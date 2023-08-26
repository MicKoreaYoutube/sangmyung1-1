'use client';

import Link from "next/link"

import { userInfo } from "@/public/js/firebase"
import { accessDenied, displayError } from "@/public/js/function";

import { siteConfig, SiteConfig } from "@/config/site";

import { collection, setDoc, Timestamp, doc } from "firebase/firestore";
import { db } from "@/public/js/firebase";
import React, { useState, useEffect, useRef } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export default function IndexPage() {

  const pwd = useRef(null)
  const Temp = useRef(null)

  const currentDate = new Date()

  async function TempFunc(user: any) {
    try {
      const docRef = doc(db, "user", user);
      await setDoc(docRef, {userBanStartTime: Timestamp.fromDate(currentDate), userBanEndTime: Timestamp.fromDate(currentDate)});
      console.log("Document added or updated successfully!");
    } catch (error) {
      console.error("Error adding document:", error);
    }
  }

  
  const addUser = () => siteConfig.member.forEach((user) => {
    TempFunc(user)
  });

  setTimeout(function() {
    userInfo ? (
      userInfo.email.slice(0, 5) == "10103" || userInfo.email.slice(0, 5) == "10132" ? null : accessDenied()
    ) : accessDenied()
  }, 500);

  function accessAdmin() {
    pwd.current.value == "MTxgdTBrl59RGGKV8OtH" ? (
      console.log("Success!")
    ) : displayError("옳지 않은 비밀번호입니다.")
  }
  return (
    <>
      <Card className="place-element-center m-4">
        <CardHeader>
          <CardTitle>비밀번호 입력</CardTitle>
          <CardDescription>관리자 페이지에 접근하려면 비밀번호를 입력하세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-1.5">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="pwd">비밀번호 입력</Label>
                <Input placeholder="비밀번호를 입력해주세요..." ref={pwd} />
              </div>
            </div>
          </div>
          <Alert variant="destructive" className="hidden" id="error">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription id="errorMessage">
              Error Message
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={accessAdmin}>접속하기</Button>
        </CardFooter>
      </Card>
      <Input ref={Temp} onClick={addUser}/>
    </>
  )
}