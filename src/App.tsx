import Login from "./Form/Login"
import Signup from "./Form/Signup"
import Home from "./Home/Home"
import { Route, Routes } from "react-router-dom"
import Search from "./Search/Search"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import Feed from "./Feed/Feed"
import { auth } from "./firebase"

function App() {

  const [userId, setUserId] = useState<string | null>(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
    console.log(user)
  } else {
    console.log("User Did Not Sign In.....")
  }
})

  console.log(userId)
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/activityFeed" element={<Feed />} />
      </Routes>
    </>
  )
}

export default App