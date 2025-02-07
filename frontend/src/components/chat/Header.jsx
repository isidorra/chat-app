import { Link } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io";
import useGetById from "../../hooks/user/useGetById";
import User from "../../components/user/User";

const Header = ({receiverId}) => {
  const {loading, user} = useGetById(receiverId);

  return (
    <div className="flex items-center gap-2 sm:gap-5 bg-[#222] w-full p-2 rounded-md">
      <Link to={"/"} className="bg-secondary/20 p-1 sm:p-2 rounded-md block w-fit">
        <IoIosArrowBack />
      </Link>

      {!loading && user && 
        <User user={user}/>
      }
    </div>
  )
}

export default Header