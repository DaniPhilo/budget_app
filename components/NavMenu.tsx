"use client"

import { useEffect, useState } from "react"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose
} from "@/components/ui/sheet"
import Image from 'next/image';
import HamburgerBtn from "../assets/hamburger-btn.svg"
import NavLink from "./NavLink";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface WindowSize {
    width: number,
    height: number
}

const NavMenu = () => {

    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: 0,
        height: 0
    });

    const pathName = usePathname();

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (
        <div>
            {
                windowSize.width < 768 ?
                    <Sheet>
                        <SheetTrigger className='absolute right-0 top-0 p-4'>
                            <Image src={HamburgerBtn} alt='' />
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>MENU</SheetTitle>
                                <nav>
                                    <ul className="flex flex-col justify-start items-start gap-4">
                                        <SheetClose asChild>
                                            {/* <NavLink path="/" text="Calculadora" /> */}
                                            <Link
                                                href={"/"}
                                                className={`py-1 ${pathName === "/" ? "border-b border-t border-zinc-500 text-zinc-400" : "bg-transparent"}`}
                                            >
                                                Calculadora
                                            </Link>
                                        </SheetClose>
                                        {/* <NavLink path="/budgets" text="Presupuestos" /> */}
                                        <SheetClose asChild>
                                            <Link
                                                href={"/budgets"}
                                                className={`py-1 ${pathName === "/budgets" ? "border-b border-t border-zinc-500 text-zinc-400" : "bg-transparent"}`}
                                            >
                                                Presupuestos
                                            </Link>
                                        </SheetClose>
                                    </ul>
                                </nav>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                    :
                    <div className="fixed top-0 left-0 w-full h-20 p-4 bg-slate-100">
                        <nav className="w-full h-full">
                            <ul className="w-full h-full flex justify-center items-center gap-10">
                                <NavLink path="/" text="Calculadora" />
                                <NavLink path="/budgets" text="Presupuestos" />
                            </ul>
                        </nav>
                    </div>
            }
        </div>
    )
}

export default NavMenu