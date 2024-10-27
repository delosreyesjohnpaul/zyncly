import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import Logo from "@/public/logo.png";
import { signIn } from "../lib/auth";
import { GithubAuthButton, GoogleAuthButton } from "./SubmitButtons";
import { DialogDescription } from "@radix-ui/react-dialog";
import Link from "next/link";

export function AuthModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Try for Free</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[360px]">
                <DialogHeader className="flex flex-row justify-center items-center gap-2">
                    <Image src={Logo} alt="logo" className="size-10"/>
                    <h4 className="text-3xl font-bold">
                        Zy<span className="bg-gradient-to-r from-emerald-500 to-sky-400 inline-flex font-bold tracking-widest text-transparent bg-clip-text">ncly</span>
                    </h4>
                </DialogHeader>
                <DialogDescription>
                    By signing up, you acknowledge and accept our{" "}
                    <Link href="/privacy">
                        <span className="text-blue-700">Privacy Policy</span>
                    </Link> {" "}
                    and{" "}
                    <Link href="/terms">
                        <span className="text-blue-700">Terms of Service</span>
                    </Link>
                </DialogDescription>
                <div className="flex flex-col mt-5 gap-3">
                    <form action={async () => {
                        "use server";
                        await signIn("google");
                    }} className="w-full">
                        <GoogleAuthButton/>
                    </form>

                    <form action={async () => {
                        "use server";
                        await signIn("github");
                    }} className="w-full">
                        <GithubAuthButton/>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}