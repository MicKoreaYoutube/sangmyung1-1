'use client'

import Link from "next/link"

import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/public/js/firebase";
import React, { useState, useEffect } from 'react';

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function IndexPage() {
  const [suggestionsList, setSuggestionsList] = useState([]);

  useEffect(() => {
    async function fetchSortedData() {
      const collectionRef = collection(db, "suggestions");
      const q = query(collectionRef, orderBy("changeTime", "desc"));

      const querySnapshot = await getDocs(q);
      const sortedData: any = [];

      querySnapshot.forEach((doc) => {
        const suggestionData = doc.data();
        const changeTime = new Date(suggestionData.changeTime.seconds * 1000);
        sortedData.push({
          id: doc.id,
          ...suggestionData,
          changeTime: changeTime,
        });
      });

      setSuggestionsList(sortedData);
    }

    fetchSortedData();
  }, []);

  return (
    <>
      <section className="container grid gap-6 my-28 max-w-[1000px]">
        <h1 className="font-KBO-Dia-Gothic_bold text-4xl md:text-7xl text-center">건의사항</h1>
        <Card>
          <CardHeader>
            <CardTitle className="font-KBO-Dia-Gothic_bold md:text-4xl">건의사항 목록</CardTitle>
            <CardDescription className="font-SUITE-Regular md:text-2xl">최근에 올라온 건의들 입니다!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4">
              {suggestionsList?.length ? (
                <nav className="flex flex-col space-x-2 w-full">
                  {suggestionsList.map((suggestion, index) => {
                    if (suggestion.status !== "delete") {
                      return (
                        <>
                          <div className="flex justify-between">
                            <Link key={index} href={`/board/suggestions/${suggestion.id}`} className="hover:underline hover:underline-offset-2 w-full">
                              <h1 className="text-2xl block font-KBO-Dia-Gothic_bold">{suggestion.title}</h1>
                            </Link>
                            <div className="flex flex-row space-x-3">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline">Open</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                      <User className="mr-2 h-4 w-4" />
                                      <span>Profile</span>
                                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <CreditCard className="mr-2 h-4 w-4" />
                                      <span>Billing</span>
                                      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Settings className="mr-2 h-4 w-4" />
                                      <span>Settings</span>
                                      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Keyboard className="mr-2 h-4 w-4" />
                                      <span>Keyboard shortcuts</span>
                                      <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                  </DropdownMenuGroup>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                      <Users className="mr-2 h-4 w-4" />
                                      <span>Team</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSub>
                                      <DropdownMenuSubTrigger>
                                        <UserPlus className="mr-2 h-4 w-4" />
                                        <span>Invite users</span>
                                      </DropdownMenuSubTrigger>
                                      <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                          <DropdownMenuItem>
                                            <Mail className="mr-2 h-4 w-4" />
                                            <span>Email</span>
                                          </DropdownMenuItem>
                                          <DropdownMenuItem>
                                            <MessageSquare className="mr-2 h-4 w-4" />
                                            <span>Message</span>
                                          </DropdownMenuItem>
                                          <DropdownMenuSeparator />
                                          <DropdownMenuItem>
                                            <PlusCircle className="mr-2 h-4 w-4" />
                                            <span>More...</span>
                                          </DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                      </DropdownMenuPortal>
                                    </DropdownMenuSub>
                                    <DropdownMenuItem>
                                      <Plus className="mr-2 h-4 w-4" />
                                      <span>New Team</span>
                                      <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                  </DropdownMenuGroup>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <Github className="mr-2 h-4 w-4" />
                                    <span>GitHub</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <LifeBuoy className="mr-2 h-4 w-4" />
                                    <span>Support</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem disabled>
                                    <Cloud className="mr-2 h-4 w-4" />
                                    <span>API</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                          <span className="text-lg text-gray-700 font-SUITE-Regular">{suggestion.content.slice(0, 40)}...</span>
                          <Separator className="my-2" />
                        </>
                      );
                    }
                    return null;
                  })}
                </nav>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Link href="/board/suggestions/create" className={buttonVariants({ variant: "default" }) + "font-SUITE-Regular px-2"}>+나도 건의하기</Link>
          </CardFooter>
        </Card>
      </section >
    </>
  )
}
