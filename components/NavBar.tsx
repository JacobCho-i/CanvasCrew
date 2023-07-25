import Link from "next/link"

export default function Navbar() {
    return (
        <nav className="bg-blue-800 p-4">
            <ul className="text-white flex text-2xl font-bold">
                <li className="mr-auto">
                <Link href="/">CanvasCrew</Link>
                </li>
                <li className="ml-auto">
                <div className="flex items-center space-x-4">
                    <Link href="/api/auth/signin">Sign In</Link>
                    <Link href="/api/auth/signout">Sign Out</Link>
                </div>
                </li>
            </ul>
        </nav>
    )
}