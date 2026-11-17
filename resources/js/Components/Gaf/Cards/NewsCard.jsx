import React from "react";
import { useGaf } from "@/Context/GafContext";
import { fmt } from "@/lib/gafFormat";

export default function NewsCard({ item }) {
    const { t, tr } = useGaf();
    const Wrapper = item.url ? "a" : "div";
    const wrapperProps = item.url ? { href: item.url } : {};

    return (
        <Wrapper className="gaf-news-item" {...wrapperProps}>
            <time>{fmt(item.date)}</time>
            <div>
                <span className="gaf-news-category">
                    {item.category ? tr(item.category).toUpperCase() : t.ui.newsCategory}
                </span>
                <h3>{tr(item.title)}</h3>
                <p>{tr(item.text)}</p>
            </div>
            <span className="gaf-news-arrow" aria-hidden="true">↗</span>
        </Wrapper>
    );
}