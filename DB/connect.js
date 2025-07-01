import mongoose from 'mongoose'
import dotenv from 'dotenv'
import chalk from 'chalk'

dotenv.config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(chalk.green('MongoDB connected successfully ✅'))
  } catch (error) {
    console.error(chalk.red('Error connecting to MongoDB ❌ :', error))
    process.exit(1)
  }
}

export default connectDB
