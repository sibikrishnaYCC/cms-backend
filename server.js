import express from 'express'
import dotenv from 'dotenv'
import apiRoutes from './Api/Api.js'
import authRoutes from './Authentication/Auth.js'
import morgan from 'morgan'
import chalk from 'chalk'
import connectDB from './DB/connect.js'
import helmet from 'helmet'
import cors from 'cors'
import expressSession from 'express-session'

dotenv.config()

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(helmet())
app.use(cors({
  origin: ['http://192.168.200.18:5173'],
  credentials: true

}))

app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production', 
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, 
    },
  })
)

const customMorganFormat = (tokens, req, res) => {
  return [
    chalk.red(req.ip), 
    chalk.green.bold(tokens.method(req, res)), 
    chalk.blue(tokens.url(req, res)), 
    chalk.yellow(tokens.status(req, res)), 
    chalk.magenta(`${tokens['response-time'](req, res)} ms`),
  ].join(' ')
}

app.use(morgan(customMorganFormat))

app.use('/api', apiRoutes)
app.use("/auth", authRoutes)

connectDB()

// app.listen(port,'0.0.0.0', () => {
//     console.log(chalk.cyan(`server is running on port ${port} ✅ `))
// })

export default app
