const isAuthenticated = async (req, res) => {
    try {
        console.log('Session at /auth/authcheck:', req.session);

        if (req.session.user) {
            return res.status(200).json({
                success: true,
                user: req.session.user,
            });
        } else {
            return res.status(401).json({
                success: false,
                message: 'Not authenticated.',
            });
        }
    } catch (error) {
        console.error('🔥 Error in authCheck:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error during auth check.',
        });
    }
};

export default isAuthenticated;
