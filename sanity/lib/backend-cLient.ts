import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";
import { env } from "@/lib/env/server";

export const backendClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: env.SANITY_API_TOKEN,
});
