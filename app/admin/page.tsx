'use client';

import Link from "next/link"

import { userInfo } from "@/public/js/firebase"
import { accessDenied } from "@/public/js/function";

import { collection, doc, getDoc, getDocs, Timestamp } from "firebase/firestore";
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

  setTimeout(function() {
    userInfo ? (
      userInfo.email.slice(0, 5) == "10103" || userInfo.email.slice(0, 5) == "10132" ? null : accessDenied()
    ) : accessDenied()
  }, 100);
  
  return (
    <>
      <Card className="place-element-center m-4">
      <CardHeader>
        <CardTitle>비밀번호 입력</CardTitle>
        <CardDescription>관리자 페이지에 접근하려면 비밀번호를 입력하세요.</CardDescription>
      </CardHeader>
      <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="pwd">비밀번호 입력</Label>
              <Input placeholder="비밀번호를 입력해주세요..." ref={pwd} />
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
        <Button>접속하기</Button>
      </CardFooter>
    </Card>
    </>
  )
}