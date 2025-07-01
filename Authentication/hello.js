const hello = async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'You must be logged in to access this resource' })
  }

  res.json({ message: 'Hello, this is a protected resource, you are logged in!', user: req.session.user })
}

export default hello
