import React from 'react';
import Image from "next/image";
import Link from "next/link";


const Cta = () => {
    return (
        <section className="cta-section">
            <div className="flex items-center cta-badge">Start learning your way</div>
            <h2 className="text-2xl font-bold">Build and Personalize Learning Companion</h2>
            <p className="text-sm">Pick a name, subject, voice & personality - and start learning</p>
            <div className="flex items-center">
                <Image src="/images/cta.svg"
                       alt=""
                       width={362}
                       height={232}/>
            </div>

            <button className="btn-primary">
                <Image src="/icons/plus.svg" alt="plus" width={12} height={12}/>
                <Link href="/companions/new">
                    <p>Build a New Companion</p>
                </Link>
            </button>


        </section>
    );
};

export default Cta;
