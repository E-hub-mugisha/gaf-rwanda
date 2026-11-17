import React from "react";
import { Head, usePage } from "@inertiajs/react";
import { GafProvider, useGaf } from "@/Context/GafContext";
import Header from "@/Components/Gaf/Header";
import Footer from "@/Components/Gaf/Footer";
import "../../css/gaf.css";
import "../../css/gaf-structure.css";

function Shell({ children }) {
    const { busy } = useGaf();
    return (
        <div className={`gaf-site${busy ? " is-translating" : ""}`}>
            <Header />
            <main id="top">{children}</main>
            <Footer />
        </div>
    );
}

export default function GafLayout({ children }) {
    const { site } = usePage().props;

    return (
        <GafProvider site={site}>
            <Head>
                <meta name="theme-color" content="#20603D" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <Shell>{children}</Shell>
        </GafProvider>
    );
}