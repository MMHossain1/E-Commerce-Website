import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full border-t px-6 py-4 mt-8 bg-blue">
            <p className="text-sm text-center">&copy; 2024 My E-Commerce Website. All rights reserved.</p>
            <ul className="flex justify-center gap-6 mt-2">
                <li>
                    <Link href="/privacy">Privacy Policy</Link>
                </li>
                <li>
                    <Link href="/terms">Terms of Service</Link>
                </li>
                <li>
                    <Link href="/contact">Contact Us</Link>
                </li>        
            </ul>
        </footer>
    );
}