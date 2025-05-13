
import { createClient } from '@supabase/supabase-js'

// TODO this should have proper error handling 
const supabaseUrl = process.env.NODE_APP_SUPABASE_URL ?? ''
const supabaseKey = process.env.NODE_APP_ANON_KEY ?? ''

console.log('supabaseURL', supabaseUrl);
console.log('supabaseKey', supabaseKey);

const supabase = createClient(supabaseUrl, supabaseKey)
// updating and deleting seems like the same deal but with id
// i can just read docs to figure that out.
// updating local state after delete or update is a matter of also
// running a state update when an api call is successfull
// i.e filter for removing the successfully deleted item
// i.e finding an element by id in an unordered list (iterate over) 
// and updating it to the successfull value
export default supabase;