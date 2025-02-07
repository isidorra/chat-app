import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import connectToMongoDb from "./database/mongoDbConfig.js";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js"; 

dotenv.config();

//Middlewares
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/users", userRoutes);


server.listen(5000, () => {
    connectToMongoDb();
    console.log("Server is running on port 5000.");
});