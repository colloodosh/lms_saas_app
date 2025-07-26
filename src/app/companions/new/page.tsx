'use server';

import React from 'react';
import CompanionForm from "@/components/CompanionForm";
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";


const NewCompanion = async () => {
    const {userId} = await auth();
    if (!userId) {
       redirect('/sign-in');
    }

    return (
        <main className="lg:w-2/5 md:w-2/3 item-center justify-center">
            <article className="flex flex-col w-full gap-4">
                <h1 className="font-bold text-2xl">Companion Builder</h1>
                <CompanionForm/>
            </article>
        </main>
    );
};

export default NewCompanion;
