import React from 'react';
import {getAllCompanions} from "@/lib/actions/companion.actions";
import CompanionCard from "@/components/CompanionCard";
import {getSubjectColor} from "@/lib/utils";
import SearchFilter from "@/components/SearchFilter";
import SearchInput from "@/components/SearchInput";

const CompanionsLibrary = async ({searchParams}: SearchParams) => {
    const filters = await searchParams;
    const subject = filters.subject || '';
    const topic = filters.topic || '';

    const companionList = await getAllCompanions({subject, topic});

    return (
        <main>
            <section className="flex justify-between gap-4 max-sm:flex-col">
                <h1 className="text-2xl">Companions Library</h1>
                <div className="flex gap-4"><SearchInput/><SearchFilter/></div>
            </section>
            <section className="companions-grid">
                {companionList.map((companion) => (
                    <CompanionCard key={companion.uuid} {...companion} color={getSubjectColor(companion.subject)}/>
                ))}
            </section>
        </main>
    );
};

export default CompanionsLibrary;
