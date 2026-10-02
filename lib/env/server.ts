import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  server: {
    BASE_URL: z.url(),
    PAYSTACK_SECRET: z.string().min(1),
    BASE_PAYSTACK_URL: z.string().min(1),
    SANITY_API_TOKEN: z.string().min(1),
    CLERK_SECRET_KEY: z.string().min(1),
  },

  experimental__runtimeEnv: process.env,
});
