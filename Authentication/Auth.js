import express from 'express'
import hello from './hello.js'
import signup from './Signup.js'
import { login, loginLimiter } from './Login.js'
import isAuthenticated from './AuthCheck.js'

const router = express.Router()

router.get("/hello", hello)

//authentication Register and Login
router.post('/signup', signup)
router.post('/login',loginLimiter, login)
router.get('/authcheck', isAuthenticated)

export default router