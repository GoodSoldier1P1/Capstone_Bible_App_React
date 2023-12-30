import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Search.css'
import Link from '@mui/material/Link';
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { addDoc, collection, getDocs, doc, setDoc } from "firebase/firestore";

interface Bible {
    verseText: string;
    book: string;
    chapter: number;
    verse: number;
    reference: string
}
const Search = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [verse, setVerse] = useState<Bible>({
        verseText: '',
        book: '',
        chapter: 0,
        verse: 0,
        reference: ''
    });

    const navigate = useNavigate()
    const isMounted = useRef(true)

    const getVerse = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/search`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ bible_search: searchQuery }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setVerse({
                    verseText: data.text,
                    book: data.book,
                    chapter: data.chapter,
                    verse: data.verse,
                    reference: data.reference
                });
                
                await setDoc(doc(db, 'verses', data.reference), {
                    text: data.text,
                    book: data.book,
                    chapter: data.chapter,
                    verse: data.verse
                });
            }
        } catch (error) {
            console.error("An error occurred during the fetch:", error);
        }
    };

    useEffect(() => {
        if (isMounted.current) {
            getVerse();
            isMounted.current = false;
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        getVerse(); // Now getVerse is accessible within handleFormSubmit
    };

    const handleChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleClick = (event) => {
        event.preventDefault();
    }

    const handleLogout = (event) => {
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
                    <Link href="#" variant="body2" id="profile">
                        {" Profile "}
                    </Link>

                    <Link href="#" variant="body2" id="logout" onClick={handleLogout}>
                        {" Logout "}
                    </Link>
                </div>
            </div>

            <div>
                <form onSubmit={handleSubmit} className="searchBar">
                    <label htmlFor="text" className="searchLabel">What verse would you like to search? </label>
                    <input type="text"
                        value={searchQuery}
                        onChange={handleChange}
                        className="searchInput"
                        placeholder="2 timothy 2:3"
                    />
                    <button type="submit" className="searchBtn">Search</button>
                </form>
            </div>

            {verse.verseText &&
                <div className="card" style={{ width: '18rem' }}>
                    <div className="card-body mx-auto">
                        <h1 className="card-text">{verse.verseText}</h1>
                        <h3 className="card-title">{verse.reference}</h3>
                    </div>

                </div>
            }
            <Link href="#" id="shareBtn" onClick={handleClick}>
                {" Share "}
            </Link>

            <Link href="#" id="saveBtn" onClick={handleClick}>
                {" Save "}
            </Link>

            <Link href="#" id="favoriteBtn" onClick={handleClick}>
                {" Favorite "}
            </Link>

            <div className="footer">
                <p className="Copy">
                    © GoodSoldier1P1_7, 2023 | Verse Credit: <a href="https://bible-api.com" target="_blank">https://bible-api.com</a>
                </p>
            </div>
        </>
    )
}
export default Search