import React from "react";
import { Head } from "@inertiajs/react";
import GafLayout from "@/Layouts/GafLayout";
import { useGaf } from "@/Context/GafContext";
import FaqSection from "@/Components/Gaf/Sections/FaqSection";
import RedesignHome, { Partners } from "@/Components/Gaf/Redesign/Home";

function Home({ news, faqs }) {
    const { site } = useGaf();
    return (
        <>
            <RedesignHome news={news} heroVideo={site.heroVideo} />
            <FaqSection faqs={faqs} />
            <Partners />
        </>
    );
}

export default function Index({ news = [], faqs }) {
    return (
        <>
            <Head title="Guided Act & Feel Rwanda">
                <meta
                    name="description"
                    content="GAF-Rwanda ni ubushakashatsi bugamije kugerageza uburyo bushya bwo gufasha abantu bafite ibimenyetso by'agahinda gakabije hifashishijwe interineti."
                />
            </Head>
            <Home news={news} faqs={faqs} />
        </>
    );
}

Index.layout = (page) => <GafLayout>{page}</GafLayout>;
