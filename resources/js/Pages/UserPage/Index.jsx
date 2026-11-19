import React from "react";
import { Head } from "@inertiajs/react";
import GafLayout from "@/Layouts/GafLayout";
import {
    HeroSection,
    ResearchSection,
    ApproachSection,
    ParticipationSection,
    NewsSection,
    SocialSection,
    FaqSection,
    PrivacySection,
    PartnersSection,
    ContactSection,
} from "@/Components/Gaf/Sections";

export default function Index({ events = [], gallery = [], news = [], faqs }) {
    return (
        <>
            <Head title="Guided Act & Feel Rwanda">
                <meta
                    name="description"
                    content="Guided Act & Feel Rwanda is a research study exploring digital approaches to mental health support in Rwanda."
                />
            </Head>

            <HeroSection />
            <ResearchSection />
            <ApproachSection />
            <ParticipationSection />
            <NewsSection news={news} />
            <SocialSection />
            <FaqSection faqs={faqs} />
            <PrivacySection />
            <PartnersSection />
            <ContactSection />
        </>
    );
}

Index.layout = (page) => <GafLayout>{page}</GafLayout>;