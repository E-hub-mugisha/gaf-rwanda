import React from "react";
import { Head, usePage } from "@inertiajs/react";
import { GafProvider, useGaf } from "@/Context/GafContext";
import Header from "@/Components/Gaf/Header";
import Footer from "@/Components/Gaf/Footer";
import "../../css/gaf.css";
import "../../css/gaf-structure.css";
import "../../css/gaf-pages.css";
import "../../css/gaf-home.css";
import "../../css/gaf-theme.css";

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
            </Head>
            <Shell>{children}</Shell>
        </GafProvider>
    );
}