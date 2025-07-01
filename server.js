import express from 'express';
import dotenv from 'dotenv';
import apiRoutes from './Routes/Api.js';
import authRoutes from './Authentication/Auth.js';
import morgan from 'morgan';
import chalk from 'chalk';
import connectDB from './DB/connect.js';
import helmet from 'helmet';
import cors from 'cors';
import expressSession from 'express-session';

dotenv.config();

const app = express();
const port = process.env.PORT;

console.log(chalk.blue('🔧 Starting server setup...'));

app.use(express.static('public'));

// Middleware: JSON parser
app.use(express.json());
console.log(chalk.green('✅ JSON middleware enabled'));

// Middleware: Security headers
app.use(helmet());
console.log(chalk.green('✅ Helmet middleware enabled'));

// Middleware: CORS (allow all origins for testing)
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

console.log(chalk.green('✅ CORS middleware enabled for all origins'));

// Middleware: Session
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
);
console.log(chalk.green('✅ Session middleware configured'));

// Logger: Custom Morgan format
const customMorganFormat = (tokens, req, res) => {
  return [
    chalk.red(req.ip),
    chalk.green.bold(tokens.method(req, res)),
    chalk.blue(tokens.url(req, res)),
    chalk.yellow(tokens.status(req, res)),
    chalk.magenta(`${tokens['response-time'](req, res)} ms`),
  ].join(' ');
};

app.use(morgan(customMorganFormat));
console.log(chalk.green('✅ Morgan logger enabled'));

// Routes
app.use('/api', apiRoutes);
console.log(chalk.cyan('📦 API routes mounted at /api'));

app.use('/auth', authRoutes);
console.log(chalk.cyan('🔐 Auth routes mounted at /auth'));

// Connect to MongoDB
connectDB();
console.log(chalk.green('🔗 connectDB() called'));

// No app.listen here — Vercel handles the request lifecycle
console.log(chalk.cyan('🚀 App ready for Vercel deployment'));

export default app;


// app.listen(port,'0.0.0.0', () => {
//     console.log(chalk.cyan(`server is running on port ${port} ✅ `))
// })