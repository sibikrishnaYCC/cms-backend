import argon2 from 'argon2';
import User from '../Models/User.js';
import Session from '../Models/Session.js';
import rateLimit from 'express-rate-limit';

// Optional: Limit login attempts for security
const loginLimiter = rateLimit({
  windowMs: 30 * 1000, // 30 seconds
  max: 5, // limit each IP to 5 login requests per windowMs
  handler: (req, res) => {
    return res.status(429).json({
      message: 'Please wait 30 seconds before trying again_',
      cooldown: true
    });
  },
});


// Login controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required_' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials_ ' });
    }

    // Check password
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials_ ' });
    }

    // Remove previous session if any
    await Session.findOneAndUpdate(
    { userId: user._id },
    {
      userId: user._id,
      sessionData: {
        username: user.username,
        email: user.email,
      },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );


    req.session.user = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    return res.status(200).json({ message: 'Login successful_' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error. Please try again later_' });
  }
};

export { loginLimiter, login };
