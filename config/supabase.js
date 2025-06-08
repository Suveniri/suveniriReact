import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://yblwrpriemsqsiewvtdg.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlibHdycHJpZW1zcXNpZXd2dGRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3ODQwNTIsImV4cCI6MjA2NDM2MDA1Mn0.GFDVKvC4GeHLZFIdNeWHafudr7XVWBamZ0fhjrdTpxE";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
