import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL ?? '';
const supabaseKey = process.env.ANON_KEY ?? '';

console.log('supabaseURL', supabaseUrl);
console.log('supabaseKey', supabaseKey);

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;