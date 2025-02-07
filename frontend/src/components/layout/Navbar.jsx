import { Link } from "react-router-dom"
import Logo from "./Logo"
import {useAuthContext} from "../../context/AuthContext";
import Logout from "../auth/Logout";
import User from "../user/User";
import { IoSearch } from "react-icons/io5";


const Navbar = () => {
  const {authUser} = useAuthContext();
  return (
    <div className="max-container p-5 w-full">
        <div className="flex items-center justify-between">
            <div className="flex items-start gap-2">
              <Logo/>
              {authUser && <User user={authUser}/>}
            </div>

            {!authUser && 
                <div className="flex items-center gap-3 text-xs sm:text-base">
                  <Link to={"/login"} className="hover:text-accent-purple duration-200">Log in</Link>
                  <div>|</div>
                  <Link to={"/register"} className="hover:text-accent-purple duration-200">Register</Link>
                </div>
            }
            {authUser && 
                <div className="flex items-center gap-3 text-xs sm:text-base">
                  <Link to={"/search"} className="flex items-center gap-2 hover:opacity-50 duration-200">
                      <IoSearch/> Search
                  </Link>
                  <div>|</div>
                  <Logout/>
                </div>
            }
            
        </div>
    </div>
  )
}

export default Navbar