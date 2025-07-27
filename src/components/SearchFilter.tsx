'use client';

import React, {useEffect, useState} from 'react';
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {formUrlQuery, removeKeysFromUrlQuery} from "@jsmastery/utils";
import { subjects} from "@/constants";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const SearchFilter = () => {

    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("subject") || '';

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const debounceDelayFn = setTimeout(() => {
            const url = searchQuery === 'All' ?
                 removeKeysFromUrlQuery({
                    params: searchParams.toString(),
                    keysToRemove: ['subject'],
                }):   formUrlQuery({
                params: searchParams.toString(),
                key: 'subject',
                value: searchQuery,
            });
            router.push(url, {scroll: false});
        }, 300);
        return () => clearTimeout(debounceDelayFn);
    }, [searchQuery, router, searchParams, pathname])

    return (
        <div className="relative flex gap-2 px-2 py-1 h-fit">

            <Select  value={searchQuery}
                     onValueChange={(e) => setSearchQuery(e)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="All">All Subjects</SelectItem>
                    {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                        ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default SearchFilter;
