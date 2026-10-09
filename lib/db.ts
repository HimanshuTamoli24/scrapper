import mongoose from "mongoose";
import env from "./env";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(env.MONGODB_URI, opts).then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export interface ISummary {
  url: string;
  title?: string;
  text?: string;
  summary: string;
  runId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const SummarySchema = new mongoose.Schema(
  {
    url: { type: String, required: true, index: true },
    title: { type: String, default: "" },
    text: { type: String, default: "" },
    summary: { type: String, required: true },
    runId: { type: String, index: true },
  },
  { timestamps: true },
);

export const SummaryModel =
  mongoose.models.Summary || mongoose.model("Summary", SummarySchema);
