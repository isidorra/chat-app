import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./components/layout/Layout"
import Home from "./pages/home/Home"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import {Toaster} from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext"
import Search from "./pages/search/Search"
import Chat from "./pages/chat/Chat"

const App = () => {
  const {authUser} = useAuthContext();
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>}>
          {/* Protected routes */}
          <Route index element={authUser ? <Home/> : <Navigate to={"/register"}/>}/>
          <Route path="/search" element={authUser ? <Search/> : <Navigate to={"/register"}/>}/>
          <Route path="/chat/:receiverId" element={authUser ? <Chat/> : <Navigate to={"/register"}/>}/>

          {/* Public routes */}
          <Route path="/login" element={!authUser ? <Login/> : <Navigate to={"/"}/>}/>
          <Route path="/register" element={!authUser ? <Register/> : <Navigate to={"/"}/>}/>
        </Route>
      </Routes>
      <Toaster 
        toastOptions={{
          style: {
            backgroundColor: "#222222",
            color: "#D4D4D4",
          },
        }}
      />
    </>
  )
}

export default App