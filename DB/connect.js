import mongoose from 'mongoose';
import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config();

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 20000, // Helps in cold-start environments
    }).then((mongoose) => {
      console.log(chalk.green('✅ MongoDB connected'));
      return mongoose;
    }).catch((error) => {
      console.error(chalk.red('❌ MongoDB connection error:'), error.message);
      throw error;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;
