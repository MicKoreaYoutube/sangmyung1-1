'use client';

import { displayError } from "@/public/js/function";

import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db, userInfo } from "@/public/js/firebase";
import { accessDenied } from "@/public/js/function";
import React, { useRef, useEffect, useState } from 'react';

import { Button } from "@/components/ui/button"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function IndexPage({ params }: { params: { suggestionID: string } }) {

    const deleteData = useRef(null);

    useEffect(() => {
        if (deleteData.current) {
            deleteData.current.click();
        }
    }, []);

    function goBack() {
        location.href = '/board/suggestions'
    }

    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchSingleData() {
            const docRef = doc(db, "suggestions", params.suggestionID);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setData({ id: docSnap.id, ...docSnap.data() });
            } else {
                console.log("No such document!");
            }
        }
        fetchSingleData();
    }, []);

    const forceDelete = async () => {
        const docRef = doc(db, "suggestions", params.suggestionID)
        const newData = { status: "delete" };
        try {
            await updateDoc(docRef, newData);
            location.href = '/board/suggestions'
        } catch (error) {
            displayError(error)
        }
    }

    return (
        <>
            {userInfo ? (
                data.author.slice(0, 5) == userInfo.email.slice(0, 5) || userInfo.email.slice(0, 5) == "10103" || userInfo.email.slice(0, 5) == "10132" ? null : accessDenied()
            ) : accessDenied()
            }
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline" ref={deleteData} className="hidden">Show Dialog</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>진짜로 삭제하시겠습니까?</AlertDialogTitle>
                        <AlertDialogDescription>
                            건의 사항을 삭제하시면 건의 사항과 그 게시물의 댓글도 전부 삭제됩니다.
                            그래도 진짜로 삭제하시겠습니까?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={goBack}>취소</AlertDialogCancel>
                        <AlertDialogAction onClick={forceDelete}>삭제</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <Alert variant="destructive" className="hidden" id="error">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription id="errorMessage">
                    Error Message
                </AlertDescription>
            </Alert>
        </>
    )
}
