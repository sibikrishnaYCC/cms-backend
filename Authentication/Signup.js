// Api/signup.js
import argon2 from 'argon2'
import User from '../Models/User.js'
import validator from 'validator'

const signup = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body

  if (!email || !password || !username || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' })
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' })
  }

  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters' })
  }

  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return res.status(400).json({ message: 'Password must contain uppercase, lowercase, number, and special character' })
  }

  // Check if the email is already taken
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return res.status(400).json({ message: 'Email already in use' })
  }

  try {
    const hashedPassword = await argon2.hash(password)
    const newUser = new User({ username, email, password: hashedPassword })
    await newUser.save()
    res.status(201).json({ message: 'User registered successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error registering user' })
  }
}

export default signup
