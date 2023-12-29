import Login from "./Form/Login"
import Signup from "./Form/Signup"
import Home from "./Home/Home"
import { Route, Routes } from "react-router-dom"
import Search from "./Search/Search"

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />}
      </Routes>
    </>
  )
}

export default App
