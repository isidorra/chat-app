import User from "../models/user.model.js";

export const searchUsers = async(req, res) => {
    try {
        const { query } = req.query; 
        const loggedInUser = req.user._id;

        if (!query || query.trim().length === 0) {
            return res.status(400).json({ error: "Search query is required." });
        }

        const users = await User.find({
            username: { $regex: query, $options: "i" },
            _id: { $ne: loggedInUser }
        }).select("-password");

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getById = async(req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id).select("-password");

        return res.status(200).json(user);
    } catch(error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}