'use client';

import { cn } from "@/lib/utils"

import { userInfo } from "@/public/js/firebase"
import { accessDenied, displayError } from "@/public/js/function";

import { siteConfig } from "@/config/site";

import { collection, getDocs, Timestamp, updateDoc } from "firebase/firestore";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@/public/js/firebase";
import React, { useState, useEffect, useRef } from 'react';

import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function IndexPage({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {

  const today = new Date();
  const convertedDate = `${today.getFullYear()}, ${today.getMonth() + 1}, ${today.getDate()}`;

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(convertedDate),
    to: addDays(new Date(convertedDate), 2),
  })

  const pwdCard = useRef(null)
  const pwd = useRef(null)
  const dateRange = useRef(null)
  const banReasonInput = useRef(null)
  const userName = useRef(null)

  const [adminState, adminStateChanger] = useState(true)

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

  let userBanData: any
  let userBanStartTime: any
  let userBanEndTime: any

  async function banUser() {
    if (dateRange.current.innerHTML == "Pick a date") {
      userBanData = {
        userBanStartTime: null,
        userBanEndTime: null,
        userBanReason: "해당 없음"
      }
    } else {
      if (dateRange.current.innerHTML.includes("-")) {
        let dateObject = new Date(dateRange.current.innerHTML.split(" - ")[0]);
        userBanStartTime = Timestamp.fromDate(dateObject)
  
        dateObject = new Date(dateRange.current.innerHTML.split(" - ")[1]);
        userBanEndTime = Timestamp.fromDate(dateObject)
      } else {
        let dateObject = new Date(dateRange.current.innerHTML);
        userBanStartTime = Timestamp.fromDate(dateObject)
  
        userBanEndTime = "영구 정지"
      }
      userBanData = {
        userBanStartTime: userBanStartTime,
        userBanEndTime: userBanEndTime,
        userBanReason: banReasonInput.current.value
      }
    }

    // console.log(dateRange.current.innerHTML.split(" - "), banReasonInput.current.value, userName.current.innerHTML)

    const docRef = doc(db, "user", userName.current.innerHTML)
    try {
      await updateDoc(docRef, userBanData);
      history.go(0)
    } catch (error) {
      displayError(error)
    }
  }

  /*async function TempFunc(user: any) {
    try {
      const docRef = doc(db, "user", user);
      await setDoc(docRef, { userBanStartTime: null, userBanEndTime: null, userBanReason: "해당 없음", userBanCount: 0 });
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

  addUser()*/

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
                        <TableHead className="w-56">정지 시작 시간</TableHead>
                        <TableHead className="w-56">정지 종료 시간</TableHead>
                        <TableHead className="w-80">정지 사유</TableHead>
                        <TableHead className="place-self-end">{" "}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userData.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.id}</TableCell>
                          <TableCell>{user.userBanStartTime}</TableCell>
                          <TableCell>{user.userBanEndTime}</TableCell>
                          <TableCell>{user.userBanReason}</TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="destructive" className="place-self-end ">정지 시키기</Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle className="font-KBO-Dia-Gothic_bold">유저 정지시키기</DialogTitle>
                                  <DialogDescription className="font-SUITE-Regular">
                                    잘못된 정지는 유저에게 피해가 될 뿐입니다. 유저 정지는 심사숙고 하여 판단해주세요.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="flex flex-col space-y-1.5">
                                  <span>정지 할 유저: <span ref={userName}>{user.id}</span></span>
                                </div>
                                <div className={cn("flex flex-col space-y-1.5", className)}>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button
                                        id="date"
                                        variant={"outline"}
                                        className={cn(
                                          "w-[300px] justify-start text-left font-normal",
                                          !date && "text-muted-foreground"
                                        )}
                                      >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date?.from ? (
                                          date.to ? (
                                            <span ref={dateRange}>
                                              {format(date.from, "LLL dd, y")} -{" "}
                                              {format(date.to, "LLL dd, y")}
                                            </span>
                                          ) : (
                                            <span ref={dateRange}>{format(date.from, "LLL dd, y")}</span>
                                          )
                                        ) : (
                                          <span ref={dateRange}>Pick a date</span>
                                        )}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                      <Calendar
                                        initialFocus
                                        mode="range"
                                        defaultMonth={date?.from}
                                        selected={date}
                                        onSelect={setDate}
                                        numberOfMonths={2}
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                  <Label htmlFor="name">정지 사유</Label>
                                  <Input ref={banReasonInput} placeholder="정지 사유를 입력하세요..." />
                                </div>
                                <Alert variant="destructive" className="hidden" id="error">
                                  <AlertTitle>Error</AlertTitle>
                                  <AlertDescription id="errorMessage">
                                    Error Message
                                  </AlertDescription>
                                </Alert>
                                <DialogFooter className="font-SUITE-Regular">
                                  <Button type="submit" onClick={banUser}>정지 시키기</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
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