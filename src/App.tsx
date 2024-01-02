import Login from "./Form/Login"
import Signup from "./Form/Signup"
import Home from "./Home/Home"
import { Route, Routes } from "react-router-dom"
import Search from "./Search/Search"
import { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"

function App() {
  
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.uid)
        setUserId(user.uid);
      }
    });
  }, []);
  
  console.log(userId)
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </>
  )
}

export default App