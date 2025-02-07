import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext"
import User from "../user/User"
import FormattedDate from "../layout/FormattedDate";

const ChatCard = ({chat}) => {
    const {authUser} = useAuthContext();
    const otherParticipant = chat.participants.find(p => p._id !== authUser._id);
  return (
    <Link to={`/chat/${otherParticipant._id}`} className="flex items-center justify-between hover:bg-secondary/10 duration-200 py-5 px-1 rounded-md w-full block">
        {otherParticipant && <User user={otherParticipant} />}

        <FormattedDate date={chat.updatedAt}/>
    </Link>
  )
}

export default ChatCard