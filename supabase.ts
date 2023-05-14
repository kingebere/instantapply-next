import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ||"";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY||"";
export const supabase = createClient(supabaseUrl, supabaseKey);



//Google Oauth
export async function signInWithGoogle() {
	let redirectUrl =
		process.env.NODE_ENV === 'production'
			? 'https://instantapply.co'
			: 'http://localhost:3000/';

	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo: redirectUrl,
		},
	});
	return data;
}

//supabase session
export async function getSession() {
	const {
		data: { session },
	} = await supabase.auth.getSession();
	return session;
}
