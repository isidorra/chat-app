import { Link } from "react-router-dom"
import { TbMessageFilled } from "react-icons/tb";

const Logo = () => {
  return (
    <Link to={"/"} className="text-xl sm:text-3xl text-accent-purple">
        <TbMessageFilled />
    </Link>
  )
}

export default Logo