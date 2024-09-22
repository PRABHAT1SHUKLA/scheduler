import SignIn from "@/src/components/SignIn";
import { Button, buttonVariants } from "@/src/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, Ghost } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

const page: FC = () => {

    return(
        <div className="absolute  inset-0">
            <div className="h-full max-w-2xl flex flex-col  justify-center mx-auto"> 

                <Link href="/" className={cn(buttonVariants({variant:"ghost"}),'')}>
                  <ChevronLeft/>
                  Home
                </Link>

                <SignIn/>
                
             </div>
            
            

        </div>
    )
}

export default page