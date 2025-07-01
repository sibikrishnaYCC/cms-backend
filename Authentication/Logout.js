import Session from "../Models/Session.js"

const logout = async (req, res) => {
  const userId = req.session.user.id

  await Session.deleteOne({ userId })

  // Destroy the session cookie
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to log out' })
    }
    res.clearCookie('connect.sid') 
    res.status(200).json({ message: 'Logged out successfully' })
  })
}

export default logout
