import React, { useEffect, useState } from 'react'
import { collection, getDocs, orderBy, query, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

interface FeedEntry {
    userId: string;
    verseData: {
        verseText: string;
        book: string;
        chapter: number;
        verse: number;
        reference: string;
    };
    comment: string;
    timestamp: {
        toDate: () => Date;
    };
}

const Feed = () => {
    const [feedData, setFeedData] = useState<FeedEntry[]>([]);

    useEffect(() => {
        const fetchFeedData = async () => {
            const q = query(collection(db, 'activityFeed'), orderBy('timestamp', 'desc'));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const data: FeedEntry[] = [];
                querySnapshot.forEach((doc) => {
                    data.push(doc.data() as FeedEntry);
                });
                setFeedData(data);
            });

            return unsubscribe;
        };

        fetchFeedData();
    }, []);

    return (
        <>
            <div>
                <h2>Activity Feed</h2>
                <ul>
                    {feedData.map((entry, index) => (
                        <li key={index}>
                            {/* Render your shared verse and comment data here */}
                            <p>Shared Verse: {entry.verseData.verseText}</p>
                            <p>User Comment: {entry.comment}</p>
                            <p>Timestamp: {entry.timestamp.toDate().toLocaleString()}</p>
                            <hr />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
export default Feed