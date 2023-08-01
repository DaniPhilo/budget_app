import Link from "next/link";
import { usePathname } from "next/navigation"

interface NavLinkProps {
    path: string,
    text: string
}

const NavLink = ({ path, text }: NavLinkProps) => {

    const pathName = usePathname();

    return (
        <li>
            <Link
                href={path}
                className={`p-1 ${pathName === path ? "border-b border-t border-zinc-500 text-zinc-400" : "bg-transparent"}`}
            >
                {text}
            </Link>
        </li>
    )
}

export default NavLink