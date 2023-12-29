import { useEffect, useState, useRef } from "react";
import './Home.css'
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";


interface Bible {
    verseText: string;
    book: string;
    chapter: number;
    verse: number;
}

const Home = () => {
    const [verse, setVerse] = useState<Bible>({
        verseText: '',
        book: '',
        chapter: 0,
        verse: 0
    });

    const navigate = useNavigate()

    const isMounted = useRef(true);

    useEffect(() => {
        if (isMounted.current) {
            const getVerse = async () => {
                try {
                    const response = await fetch(`http://127.0.0.1:5000`);
                    if (response.ok) {
                        const data = await response.json();
                        setVerse({
                            verseText: data.randomVerseText,
                            book: data.RandomBook,
                            chapter: data.RandomChapter,
                            verse: data.randomVerse
                        });
                    }
                } catch (error) {
                    console.error("An error occurred during the fetch:", error);
                }
            };

            getVerse();
            isMounted.current = false; // Set isMounted to false after the initial run.
        }
    }, []); // Empty dependency array means the effect runs only once.

    return (
        <>
            <div>
                <Link rel="stylesheet" href="/" >
                    <img src="./src/assets/Emanuel.jpg" alt="Emanuel" id="logo" />
                </Link>
            </div>

            <div className="nav">
                <div>
                    <Link href="/login" variant="body2" id="login">
                        {" Login "}
                    </Link>

                    <Link href="/signup" variant="body2" id="signup">
                        {" Signup"}
                    </Link>
                </div>
            </div>

            {verse.verseText &&
                <div className="card" style={{ width: '18rem' }}>
                    <div className="card-body mx-auto">
                        <h1 className="card-text">{verse.verseText}</h1>
                        <h3 className="card-title">{verse.book} {verse.chapter}: {verse.verse}</h3>
                    </div>
                </div>
            }

            <div className="footer">
                <p className="Copy">
                    © GoodSoldier1P1_7, 2023 | Verse Credit: <a href="https://bible-api.com" target="_blank">https://bible-api.com</a>
                </p>
            </div>

        </>
    )
}
export default Home