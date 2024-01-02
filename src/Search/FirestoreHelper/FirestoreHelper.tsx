import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../../firebase";

interface VerseData {
    verseText: string;
    book: string;
    chapter: number;
    verse: number;
    reference: string;
}

export const addToActivityFeed = async (verseData: VerseData, userId: string, comment: string) => {
    const activityFeedRef = collection(db, 'activityFeed')

    // console.log("userId: ", userId)
    // console.log("verseData: ", verseData)
    // console.log("comment: ", comment)

    try {
        await addDoc(activityFeedRef, {
            verseData: verseData,
            comment: comment,
            timestamp: serverTimestamp(),
        });
    } catch (error) {
        console.error('Error adding to activity feed: ', error)
    }
}