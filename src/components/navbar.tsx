// navbar only
import { UserButton, useUser, SignInButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import logo from "public/logo.jpg"
import Image from "next/image";


export default function Navbar() {
    const { isSignedIn } = useUser();


    return (
        <div id="Navbar" className="fixed h-[80px] w-full flex bg-[#192223]  justify-between place-items-center px-10 z-50 gap-7">
            <Image src={logo.src} alt="logo" width={150} height={50}></Image>
            <div>{isSignedIn ? <div className="scale-125"><UserButton /></div> :
                <SignInButton>
                    <Button variant="destructive">Sign in / Sign Up</Button>
                </SignInButton>
            }
            </div>
        </div>
    )

}


