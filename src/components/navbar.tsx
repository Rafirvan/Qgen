// navbar only
import { UserButton, useUser, SignInButton } from "@clerk/nextjs";
import { Button } from "./ui/button";


export default function Navbar() {
    const { isSignedIn } = useUser();


    return (
        <div id="Navbar" className="fixed h-[80px] w-full flex bg-black justify-between place-items-center px-10 z-50 gap-7">
            <h1 className="text-white text-2xl font-bold">LOGO</h1>
            <div>{isSignedIn ? <div className="scale-125"><UserButton /></div> :
                <SignInButton>
                    <Button variant="destructive">Sign in / Sign Up</Button>
                </SignInButton>
            }
            </div>
        </div>
    )

}


