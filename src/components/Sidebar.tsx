import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation"

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <section className="sidebar">

      <nav className="flex flex-col gap-4">
        <Link href="/" className="mb-12 curson-pointer flex items-center gap-2">
        
           <Clock className="w-32 h-32"/>
           
        </Link>

        {sidebarLinks.map((item) => {
          const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)

          return(

            <Link href={item.route} key={item.label}
            className={cn('sidebar-link',{
              'bg-bank-gradient': isActive
            })}>
               <p className={cn("sidebar-label", { "!text-white": isActive })}>
                {item.label}
              </p>


            </Link>
          )
        })}



      </nav>
    </section>
  )
}

export default Sidebar