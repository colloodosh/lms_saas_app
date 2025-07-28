import React from 'react';
import {getCompanion} from "@/lib/actions/companion.actions";
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {getSubjectColor} from "@/lib/utils";
import Image from "next/image";

interface CompanionSessionPageProps {
    params: Promise<{ id: string }>
}

const CompanionSession = async ({params}: CompanionSessionPageProps) => {

    const {id} = await params;
    const {uuid, name, subject, topic, duration} = await getCompanion({id});
    const user = await currentUser();

    if (!user) redirect('/sign-in');
    if (!uuid) redirect('/companions');

    return (
        <main>
            <article className="flex rounded-border justify-between p-6 max-md:flex-col">
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center size-[72px] rounded-lg max-md:hidden"
                         style={{backgroundColor: getSubjectColor(subject)}}>
                        <Image src={`/icons/${subject}.svg`} alt={subject} width={35} height={35}/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <p className="text-xl font-bold">{name}</p>
                            <div className="subject-badge max-sm:hidden">subject</div>
                        </div>
                        <div className="flex items-center">
                            <p className="text-sm">{topic}</p>
                        </div>
                    </div>
                </div>
                <div className="items-start max=md:hidden">
                    <p className="text-sm">{duration} minutes</p>
                </div>
            </article>
        </main>
    );
};

export default CompanionSession;
