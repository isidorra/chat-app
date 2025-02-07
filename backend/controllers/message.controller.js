import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const getMessages = async(req, res) => {
    try {
        const {receiverId} = req.params;
        const senderId = req.user._id;

        const chat = await Chat.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages");

        if(!chat)
            return res.status(200).json([]);

        return res.status(200).json(chat.messages);

    } catch(error){
        return res.status(500).json({error: "Internal Error Server"});
    }
}

export const sendMessage = async(req, res) => {
    try {
        const {text} = req.body;
        const {receiverId} = req.params;
        const senderId = req.user._id;

        if(!text)
            return res.status(400).json({error: "Message can not be empty."});

        let chat = await Chat.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if(!chat) {
            chat = await Chat.create({
                participants: [senderId, receiverId]
            });
        }

        const newMessage = new Message({senderId, receiverId, text});

        if(newMessage) {
            chat.messages.push(newMessage._id);
        }

        //instead of this
        // await chat.save();
        // await newMessage.save();

        //do this in parallel
        await Promise.all([chat.save(), newMessage.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        return res.status(201).json(newMessage);

    } catch(error) {
        return res.status(500).json({error: "Internal Error Server"});
    }
};

