'use client';

import React from 'react';
import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/app/lib/utils";

const navItems = [
    {label: 'Home', href: '/'},
    {label: 'Companions', href: '/companions'},
    {label: 'Subscriptions', href: '/subscriptions'},
]

const NavItems = () => {
    const pathname = usePathname();
    return (
        <nav className="flex item-center gap-4">
            {navItems.map(({label, href}) => (
                <Link href={href} key={label}
                      className={cn(pathname === href && 'active text-primary font-semibold')}>
                    {label}
                </Link>
            ))}
        </nav>
    );
};

export default NavItems;
