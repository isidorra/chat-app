import {useAuthContext} from "../../context/AuthContext";
import FormattedDate from "../layout/FormattedDate";

const Message = ({message}) => {
  const {authUser} = useAuthContext();
  return (
    <div className={`${message.senderId === authUser._id ? 'bg-accent-purple/30 ml-auto rounded-2xl rounded-br-none' : 'bg-[#222] rounded-2xl rounded-tl-none'} p-5 w-2/3 sm:w-1/2 my-3`}>
      <FormattedDate date={message.createdAt}/>
      <p className="text-sm sm:text-base">{message.text}</p>
    </div>
  )
}

export default Message