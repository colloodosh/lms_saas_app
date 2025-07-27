import React from 'react'
import CompanionCard from "@/app/components/CompanionCard";
import CompanionList from "@/app/components/CompanionList";
import CTA from "@/app/components/CTA";
import {recentSessions} from "@/constants";


const Page = () => {
    const companionList = [{
        id: 1,
        name: "Countsy the Number Wizard",
        topic: "Derivatives & Intergrals",
        subject: "science",
        duration: 45,
        color: "#ffda6e"
    }, {
        id: 2,
        name: "Neura the Brainy Explorer",
        topic: "English Literature",
        subject: "language",
        duration: 30,
        color: "#e5d0ff"
    }, {
        id: 3,
        name: "Integration and Differentiation",
        topic: "Calculas",
        subject: "maths",
        duration: 45,
        color: "#bde7ff"
    }];


    return (
        <main>
            <h1 className="text-2xl">Popular Companions</h1>
            <section className="home-section">
                {companionList.map((companion) => (
                    <CompanionCard key={companion.id} {...companion}/>
                ))}
            </section>

            <section className="home-section">
                <CompanionList
                    title="Recently completed lessons"
                    companions={recentSessions}
                    classNames="w-2/3 max-lg:w-full"
                />
                <CTA/>
            </section>
        </main>
    )
}

export default Page
