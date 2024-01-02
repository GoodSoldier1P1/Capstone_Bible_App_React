import React, { useEffect, useState } from 'react'
import { collection, orderBy, query, onSnapshot } from 'firebase/firestore'
import { auth, db } from '../firebase'
import "./Feed.css"
import { Link } from '@mui/material';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

interface FeedEntry {
    user: {
        firstName: string;
        lastName: string;
    };
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
    const [visiblePosts, setVisiblePosts] = useState(5); // number of initially shown posts
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchFeedData = async () => {
            const q = query(collection(db, 'activityFeed'), orderBy('timestamp', 'desc'));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const data: FeedEntry[] = [];
                querySnapshot.forEach((doc) => {
                    data.push(doc.data() as FeedEntry);
                });
                setFeedData(data);
                setLoading(false);
            });

            return unsubscribe;
        };

        fetchFeedData();
    }, []);

    const loadMore = () => {
        setLoading(true);
        setVisiblePosts((prev) => prev + 5); // increase number of visible posts
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const navigate = useNavigate()

    const handleLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault()
        signOut(auth)
            .then(() => {
                navigate("/")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(`${errorCode}: ${errorMessage}`)
            })
    }

    return (
        <>

            <div>
                <Link rel="stylesheet" href="/" >
                    <img src="./src/assets/Emanuel.jpg" alt="Emanuel" id="logo" />
                </Link>
            </div>
            <div className="nav">
                <div>
                    <Link href="/search" variant="body2" id="searchBtn">
                        {' Search '}
                    </Link>

                    <Link href="#" variant="body2" id="profile">
                        {' Profile '}
                    </Link>

                    <Link href="#" variant="body2" id="logout" onClick={handleLogout}>
                        {' Logout '}
                    </Link>
                </div>
            </div>
            <div className="feedMargin">
                <h2 className="feedInfo">Activity Feed</h2>
                <ul>
                    {feedData.slice(0, visiblePosts).map((entry, index) => (
                        <li key={index} className="feedItem">
                            <p className="feedComment">User Comment: {entry.comment}</p>
                            <p className="verseInfo">{entry.verseData.verseText}</p>
                            <p className="verseInfo">{entry.verseData.reference}</p>
                            <p className="timestamp">{entry.timestamp.toDate().toLocaleString()}</p>
                            <hr />
                        </li>
                    ))}
                </ul>
                {loading && <button className='loading' onClick={scrollToTop}>
                    Back to Top
                </button>}
                {visiblePosts < feedData.length && (
                    <button onClick={loadMore} disabled={loading} className='loadBtn'>
                        Show More
                    </button>
                )}
            </div>
        </>
    )
}
export default Feed