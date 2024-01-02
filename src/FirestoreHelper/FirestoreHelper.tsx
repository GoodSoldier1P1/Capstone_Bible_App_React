import { setDoc, serverTimestamp, doc } from "firebase/firestore"
import { db } from "../firebase";

interface VerseData {
    verseText: string;
    book: string;
    chapter: number;
    verse: number;
    reference: string;
}

interface User {
    firstName: string;
    lastName: string;
}

export const addToActivityFeed = async (verseData: VerseData, user: User, comment: string) => {
    try {
        await setDoc(doc(db, 'activityFeed', comment), {
            verseData: verseData,
            comment: comment,
            timestamp: serverTimestamp(),
        });
    } catch (error) {
        console.error('Error adding to activity feed: ', error)
    }
}