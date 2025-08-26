// src/lib/db.js
import "server-only";
import mongoose from 'mongoose';

const { MONGODB_URI, MONGODB_DB } = process.env;
if (!MONGODB_URI) throw new Error('Missing MONGODB_URI in environment');

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

export default async function connectToDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, { dbName: MONGODB_DB })
      .then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
