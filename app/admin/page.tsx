'use client';

import Link from "next/link"

import { ChevronRight } from 'lucide-react';

import { collection, doc, getDoc, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/public/js/firebase";
import React, { useState, useEffect } from 'react';

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

export default function IndexPage() {
  return (
    <>
      <h1>Hallu</h1>
    </>
  )
}