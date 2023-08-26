'use client';

import Link from "next/link"

import { userInfo } from "@/public/js/firebase"
import { accessDenied, displayError } from "@/public/js/function";

import { siteConfig } from "@/config/site";

import { collection, getDocs } from "firebase/firestore";
import { setDoc, Timestamp, doc } from "firebase/firestore";
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

  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ]

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

  useEffect(() => {
    async function getAllData() {
      const querySnapshot = await getDocs(collection(db, 'user')); // 컬렉션 이름에 맞게 수정하세요
      const data: any = [];

      querySnapshot.forEach((doc) => {
        const userPropsData = doc.data();
        const userBanStartTime = new Date(userPropsData.userBanStartTime.seconds * 1000);
        const userBanEndTime = new Date(userPropsData.userBanEndTime.seconds * 1000);
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

  async function TempFunc(user: any) {
    try {
      const docRef = doc(db, "user", user);
      await setDoc(docRef, {userBanStartTime: null, userBanEndTime: null});
      console.log("Document added or updated successfully!");
    } catch (error) {
      console.error("Error adding document:", error);
    }
  }
  function addUser() {
    siteConfig.member.forEach((user) => {
      TempFunc(user)
    })
  }

  addUser()

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
                        <TableHead className="w-[100px]">학번이름</TableHead>
                        <TableHead>정지 시작 시간</TableHead>
                        <TableHead>정지 종료 시간</TableHead>
                        <TableHead className="text-right">{" "}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userData.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.id}</TableCell>
                          <TableCell>{user.userBanStartTime}</TableCell>
                          <TableCell>{user.userBanEndTime}</TableCell>
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