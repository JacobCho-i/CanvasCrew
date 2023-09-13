import Link from "next/link"

import { options } from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"

export default async function Navbar() {

    const session = await getServerSession(options)

    return (
        <nav className="bg-blue-800 p-4 sticky top-0 p-4">
            <ul className="text-white flex text-2xl font-bold">
                <li className="mr-auto">
                <a href="/">CanvasCrew</a>
                </li>
                <li className="ml-auto">
                <div className="flex items-center space-x-4">
                    <>
                        {session ? (
                            <>
                                <a>Hi {session?.user?.name},</a>
                                <a href="/api/auth/signout">Sign Out</a>
                            </>
                        ) 
                        : 
                        (
                            <>
                                <a href="/api/auth/signin">Sign In</a>
                                <a href="/api/auth/signout">Sign Out</a>
                            </>
                        )}
                    </>
                </div>
                </li>
            </ul>
        </nav>
    )
}