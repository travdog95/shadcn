import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ukemcuwxsoanktfalaqk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrZW1jdXd4c29hbmt0ZmFsYXFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0NTI0NDMsImV4cCI6MjA0NzAyODQ0M30.DXsfE6JkdNHFeGVGoK3GRfi9oT67IAntLzBQAhYaMRE";
export const supabase = createClient(supabaseUrl, supabaseKey);
