import { redirect } from "next/navigation";
import { auth } from "./auth";

export async function requireUser() {
    const session = await auth()

    if(!session?.user) {
        return redirect("/")
    }

    return session;
}