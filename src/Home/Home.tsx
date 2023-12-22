import { useState } from "react"

interface Random {
    randomText: string,
    randomVerse: number,
    randomChapter: number,
    randomBook: string,
}

const Home = () => {

    const [random, setRandom] = useState<Random>({
        randomText: '',
        randomVerse: 0,
        randomChapter: 0,
        randomBook: '',
    })

    const randomVerse = async () => {
        const randomResponse = await fetch('http://127.0.0.1:5000', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(randomVerse)
        })

        const randomData = await randomResponse.json()
        console.log(randomData)
        let text = setRandom({...random, randomText: randomData.verses[0].text})
        let verse = setRandom({...random, randomVerse: randomData.verses[0].verse})
        let chapter = setRandom({...random, randomChapter: randomData.verses[0].chapter})
        let book = setRandom({...random, randomBook: randomData.verses[0].book_name})
    }

    return (
        <>
            <div id="verseText">
                
            </div>

            <div id="verseInfo">

            </div>
        </>
    )
}
export default Home