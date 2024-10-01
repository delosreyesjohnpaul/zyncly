import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";
import { Button } from "@/components/ui/button";
import { AuthModal } from "./AuthModal";

export function Navbar() {
    return(
        <div className="flex py-5 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
                <Image src={Logo} alt="logo" className="size-10"/>
                <h4 className="text-3xl font-bold">
                    Zy<span className="bg-gradient-to-r from-emerald-500 to-sky-400 inline-flex font-bold tracking-widest text-transparent bg-clip-text">ncly</span>
                </h4>
            </Link>

            <AuthModal/>
        </div>
    )
}