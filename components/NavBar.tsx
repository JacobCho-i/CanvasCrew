import Link from "next/link"

export default function Navbar() {
    return (
        <nav className="bg-blue-800 p-4 sticky top-0 p-4">
            <ul className="text-white flex text-2xl font-bold">
                <li className="mr-auto">
                <a href="/">CanvasCrew</a>
                </li>
                <li className="ml-auto">
                <div className="flex items-center space-x-4">
                    <a href="/api/auth/signin">Sign In</a>
                    <a href="/api/auth/signout">Sign Out</a>
                </div>
                </li>
            </ul>
        </nav>
    )
}