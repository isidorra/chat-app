import Chat from "../models/chat.model.js";

export const getChats = async(req, res) => {
    try {
        const loggedInUser = req.user._id;

        const chats = await Chat.find({ 
            participants: { $in: [loggedInUser] }
        }).populate("participants", "-password")
           .sort({updatedAt: -1});

        return res.status(200).json(chats);
    } catch(error) {
        return res.status(500).json({error: "Internal Error Server"});
    }
}