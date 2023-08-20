'use client';

import { displayError } from "@/public/js/function";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/public/js/firebase";
import React, { useRef, useEffect } from 'react';

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

export default function IndexPage({ params }: { params: { anouncementID: string } }) {

    const deleteData = useRef(null);

    useEffect(() => {
        if (deleteData.current) {
            deleteData.current.click();
        }
    }, []);

    function goBack() {
        location.href = '/board/suggestions'
    }

    const forceDelete = async () => {
        const docRef = doc(db, "suggestions", params.anouncementID)
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
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline" ref={deleteData}>Show Dialog</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>진짜로 삭제하시겠습니까?</AlertDialogTitle>
                        <AlertDialogDescription>
                            건의 사항을 삭제하시면 관리자에게 요청하지 않는 이상 복구 할 수 없습니다.
                            관리자에게 요청하여도 복구하지 못 하실 수도 있습니다. 그래도 진짜로 삭제하시겠습니까?
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
