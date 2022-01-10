import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://byhkjvyxpmcqrnxdozzx.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTgwMjQzNywiZXhwIjoxOTU3Mzc4NDM3fQ.m1J2LnvmMUGeu8LXHN6h7P-Exocp9zNIr5nCvUVzGNk"

export const supabase = createClient(supabaseUrl, supabaseAnonKey);