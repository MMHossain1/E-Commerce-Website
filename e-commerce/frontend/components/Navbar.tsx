import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex w-full border-b px-6 py-4">
            <ul className="flex gap-6">
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/about">About</Link>
                </li>
                <li>
                    <Link href="/contact">Contact</Link>
                </li>        
            </ul>
        </nav>
    );
}