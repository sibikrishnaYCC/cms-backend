import connectDB from "../DB/connect.js";

const isAuthenticated = async (req, res) => {

    await connectDB()

    if (req.session.user) {
        return res.status(200).json({
            success: true,
            user: req.session.user,
        });
    } else {
        return res.status(401).json({
            success: false,
            message: 'Not authenticated.'
            
        });
    }
};

export default isAuthenticated;