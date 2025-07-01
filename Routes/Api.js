import express from 'express'

//imports
import hello from './hello.js'

const router = express.Router()

router.get('/hello', hello)

export default router