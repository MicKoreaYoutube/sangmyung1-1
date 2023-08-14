'use client';

import { onSnapshot, collection, getDocs } from "firebase/firestore";
import { db } from "@/public/js/firebase";
import React, { useState, useEffect } from 'react';

import { Button } from "@/components/ui/button";

export default function IndexPage() {

  useEffect(() => {
    onSnapshot(collection(db, "cities"), (snapshot) => {
      console.log(snapshot.docs);
    })
  })

  return (
    <>
      <h1>Hallu</h1>
    </>
  )
}
