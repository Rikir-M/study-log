import { redirect } from "react-router";
import { supabase } from "../utils/supabase";

export async function AuthLoader() {
    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        throw redirect("/login");
    }

    return session;
}
