import { Auth } from "@supabase/auth-ui-react"
import supabase from "../supabaseClient"
import { ThemeSupa } from "@supabase/auth-ui-shared"

const redirectUrl = import.meta.env.VITE_REDIRECT_URL ?? 'ERROR NO REDIRECT URL DEFINED';

export const LoginPage = () => {
  return (
    <div>
      <h1>Welcome! Please sign in</h1>
      <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} redirectTo={redirectUrl} />
    </div>
  )
}