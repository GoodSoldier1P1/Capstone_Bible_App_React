import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Bible {
    verseText: string;
    book: string;
    chapter: number;
    verse: number;
}
const Search = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [verse, setVerse] = useState<Bible>({
        verseText: '',
        book: '',
        chapter: 0,
        verse: 0
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

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="text">What verse would you like to search? </label>
                    <input type="text"
                    value={searchQuery}
                    onChange={handleChange}
                    />
                    <button type="submit">Search</button>
                </form>
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
export default Search