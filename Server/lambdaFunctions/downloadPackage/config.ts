import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || 'https://gjjsctzryfobdsyannpx.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || '';

if (!supabaseKey) {
    throw new Error('Missing Supabase API Key. Please set SUPABASE_KEY in your environment.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
