// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://diuogsqzjkonghetbsja.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpdW9nc3F6amtvbmdoZXRic2phIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyMjUzMDIsImV4cCI6MjA0OTgwMTMwMn0.5_p2Sb3mpw2VAMB75aJkhIm37t0m21HINdNSA41VGA0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);