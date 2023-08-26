'use client';

import Link from "next/link"

import { userInfo } from "@/public/js/firebase"
import { accessDenied, displayError } from "@/public/js/function";

import { siteConfig } from "@/config/site";

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
  return (
    <>
      <Card className="place-element-center m-4" ref={pwdCard}>
        {adminState == false ? (
          <>
            <CardHeader>
              <CardTitle className="font-KBO-Dia-Gothic_bold">비밀번호 입력</CardTitle>
              <CardDescription className="font-SUITE-Regular">관리자 페이지에 접근하려면 비밀번호를 입력하세요.</CardDescription>
            </CardHeader>
            <CardContent className="font-SUITE-Regular">
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
            <CardFooter className="flex justify-end SUITE-Regular">
              <Button onClick={accessAdmin}>접속하기</Button>
            </CardFooter>
          </>
        ) : (
          <>
            <CardHeader>
              <CardTitle className="font-KBO-Dia-Gothic_bold">관리자 페이지</CardTitle>
              <CardDescription className="font-SUITE-Regular">관리자가 유저를 관리, 정지 등을 할 수 있는 페이지입니다. 조심해서 다뤄주세요!</CardDescription>
            </CardHeader>
            <CardContent className="font-SUITE-Regular">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                      <TableCell className="font-medium">{invoice.invoice}</TableCell>
                      <TableCell>{invoice.paymentStatus}</TableCell>
                      <TableCell>{invoice.paymentMethod}</TableCell>
                      <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </>
        )}
      </Card>
    </>
  )
}