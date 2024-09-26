import Sidebar from "@/components/Sidebar";
import { getAuthSession } from "@/lib/auth";

import { redirect } from "next/navigation";
import React from "react";

export default async function RootLayout({
  children,
} : Readonly<{children : React.ReactNode}>){

  const  session = await getAuthSession()

   if(!session) redirect('/sign-in')

    return (
      <main className="flex h-screen w-full font-inter">
        <Sidebar/>
        <div>
          {children}
        </div>
      </main>
    )

}