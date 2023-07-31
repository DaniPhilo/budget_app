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
            <Link href={path} className={`p-2 ${pathName === path ? "bg-slate-400 text-white" : "bg-transparent"} rounded`}>{text}</Link>
        </li>
    )
}

export default NavLink