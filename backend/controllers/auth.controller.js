import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/jwtUtil.js";

export const register = async (req, res) => {
    try {
        const {username, email, password, confirmPassword} = req.body;
        if(!username || !email || !password || !confirmPassword) 
            return res.status(400).json({error: "All fields are required."});

        const emailRegex = /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/;
        if (!emailRegex.test(email))
            return res.status(400).json({error: "Invalid email format."});

        if(password.length < 7)
            return res.status(400).json({error: "Password must have at least 7 characters."});

        if(password !== confirmPassword)
            return res.status(400).json({error: "Passwords do not match."});

        const isEmailTaken = await User.findOne({email});
        if(isEmailTaken)
            return res.status(400).json({error: "Email is taken."});
        const isUsernameTaken = await User.findOne({username});
        if(isUsernameTaken)
            return res.status(400).json({error: "Username is taken."});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({username, email, password: hashedPassword});
        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();

        return res.status(201).json({
            _id: newUser._id,
            email: newUser.email,
            username: newUser.username
        });

    } catch(error) {
        return res.status(500).json({error: "Internal Error Server"});
    }
}

export const login = async(req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect)
            return res.status(400).json({error: "Incorrect email or password."});

        generateTokenAndSetCookie(user._id, res);
        return res.status(200).json({
            _id: user._id,
            email: user.email,
            username: user.username
        })
    } catch(error) {
        return res.status(500).json({error: "Internal Error Server"});
    }
}

export const logout = async(req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        return res.status(200).json({message: "Successfully logged out."});
    } catch(error) {
        return res.status(500).json({error: "Internal Error Server"});
    }
}

