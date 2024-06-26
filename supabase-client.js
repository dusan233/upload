import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

// Create Supabase client
// We will only use supabase cloud storage
export const supabaseClient = createClient(
  process.env.SUPABASE_PROJECT_URL,
  process.env.SUPABASE_API_KEY
);
