'use client';

import Link from "next/link"

import { userInfo } from "@/public/js/firebase"
import { accessDenied, displayError } from "@/public/js/function";

import { siteConfig } from "@/config/site";

import { collection, getDocs, Timestamp } from "firebase/firestore";
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function IndexPage() {
  const pwdCard = useRef(null)

  const [adminState, adminStateChanger] = useState(false)

  const pwd = useRef(null)

  setTimeout(function () {
    userInfo ? (
      userInfo.email.slice(0, 5) == "10103" || userInfo.email.slice(0, 5) == "10132" ? null : accessDenied()
    ) : accessDenied()
  }, 500);

  function accessAdmin() {
    pwd.current.value == "MTxgdTBrl59RGGKV8OtH" ? (
      adminStateChanger(true)
    ) : displayError("옳지 않은 비밀번호입니다.")
  }

  const [userData, setUserData] = useState([])

  function formatTimestamp(timestamp: Timestamp) {
    const dateObject = new Date(timestamp.seconds * 1000);
    return dateObject.toLocaleString();
  }

  useEffect(() => {
    async function getAllData() {
      const querySnapshot = await getDocs(collection(db, 'user')); 
      const data: any = [];

      querySnapshot.forEach((doc) => {
        const userListData = doc.data();

        let userBanStartTime = userListData.userBanStartTime ? formatTimestamp(userListData.userBanStartTime) : "해당 없음";
        let userBanEndTime = userListData.userBanEndTime ? formatTimestamp(userListData.userBanEndTime) : "해당 없음";

        data.push({
          id: doc.id,
          ...doc.data(),
          userBanStartTime: userBanStartTime,
          userBanEndTime: userBanEndTime,
        });
      });

      setUserData(data)

    }

    getAllData()

  }, []);

  return (
    <>
      <Card className="place-element-center m-4" ref={pwdCard}>
        {adminState == false ? (
          <>
            <CardHeader>
              <CardTitle className="font-KBO-Dia-Gothic_bold md:text-4xl">비밀번호 입력</CardTitle>
              <CardDescription className="font-SUITE-Regular md:text-2xl">관리자 페이지에 접근하려면 비밀번호를 입력하세요.</CardDescription>
            </CardHeader>
            <CardContent className="font-SUITE-Regular">
              <div className="grid w-full items-center gap-4">
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
              </div>
            </CardContent>
            <CardFooter className="flex justify-end SUITE-Regular">
              <Button onClick={accessAdmin}>접속하기</Button>
            </CardFooter>
          </>
        ) : (
          <>
            {userData ? (
              <>
                <CardHeader>
                  <CardTitle className="font-KBO-Dia-Gothic_bold md:text-4xl">관리자 페이지</CardTitle>
                  <CardDescription className="font-SUITE-Regular md:text-2xl">관리자가 유저를 관리, 정지 등을 할 수 있는 페이지입니다. 조심해서 다뤄주세요!</CardDescription>
                </CardHeader>
                <CardContent className="font-SUITE-Regular">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-40">학번이름</TableHead>
                        <TableHead className="w-80">정지 시작 시간</TableHead>
                        <TableHead className="w-80">정지 종료 시간</TableHead>
                        <TableHead>정지 횟수</TableHead>
                        <TableHead>정지 사유</TableHead>
                        <TableHead className="text-right">{" "}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userData.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.id}</TableCell>
                          <TableCell>{user.userBanStartTime}</TableCell>
                          <TableCell>{user.userBanEndTime}</TableCell>
                          <TableCell>{user.userBanCount}</TableCell>
                          <TableCell>{user.userBanReason}</TableCell>
                          <TableCell className="place-self-end"><Button>정지시키기</Button></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </>
            ) : (
              <p>Loding...</p>
            )}
          </>
        )}
      </Card>
    </>
  )
}