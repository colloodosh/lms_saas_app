'use client';

import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {formUrlQuery, removeKeysFromUrlQuery} from "@jsmastery/utils";

const SearchInput = () => {

    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("topic") || '';

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const debounceDelayFn = setTimeout(() => {
            const url = searchQuery
                ? formUrlQuery({
                    params: searchParams.toString(),
                    key: 'topic',
                    value: searchQuery,
                })
                : removeKeysFromUrlQuery({
                    params: searchParams.toString(),
                    keysToRemove: ['topic'],
                });
            router.push(url, {scroll: false});
        }, 300);
        return () => clearTimeout(debounceDelayFn);
    }, [searchQuery, router, searchParams, pathname])

    return (
        <div className="relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit">
            <Image src="/icons/search.svg" alt="search" width={15} height={15}/>
            <input
                placeholder="Search companions..."
                className="outline-none w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>

    );
};

export default SearchInput;
