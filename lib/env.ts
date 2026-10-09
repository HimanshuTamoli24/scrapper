import { z } from "zod";

const envSchema = z.object({
  MONGODB_URI: z.string(),
  GROQ_API_KEY: z.string(),
  NEXT_PUBLIC_APP_URL: z.url(),
});

const env = envSchema.parse(process.env);

export default env;
