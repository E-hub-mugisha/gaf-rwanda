
import React from "react";
import { useGaf } from "@/Context/GafContext";
import SectionHeading from "../SectionHeading";

export default function FaqSection({ faqs = [] }) {
    const { lang, t, tr, site } = useGaf();

    const items = faqs.length
        ? faqs.map((faq) => ({
              id: faq.id,

              q:
                  (lang === "rw"
                      ? faq.question_rw || faq.question
                      : faq.question || faq.question_rw) || "",

              a:
                  (lang === "rw"
                      ? faq.answer_rw || faq.answer
                      : faq.answer || faq.answer_rw) || "",

              isHtml: true,
          }))
        : (t.faq.items || []).map((faq, index) => ({
              id: index,
              q: tr(faq.q),
              a: tr(faq.a),
              isHtml: false,
          }));

    return (
        <section className="gaf-section gaf-faq" id="faq">
            <div className="gaf-container gaf-faq-layout">
                <div>
                    <SectionHeading
                        eyebrow={t.faq.eyebrow}
                        title={t.faq.title}
                        intro={t.faq.intro}
                    />

                    <a
                        className="gaf-text-link"
                        href={`mailto:${site.email}`}
                    >
                        {site.email}{" "}
                        <span aria-hidden="true">↗</span>
                    </a>
                </div>

                <div className="gaf-faq-list">
                    {items.map((item, index) => (
                        <details
                            key={item.id ?? index}
                            open={index === 0}
                        >
                            <summary>
                                <span>
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                {item.q}

                                <b aria-hidden="true">+</b>
                            </summary>

                            {item.isHtml ? (
                                <div
                                    className="gaf-faq-answer"
                                    dangerouslySetInnerHTML={{
                                        __html: item.a,
                                    }}
                                />
                            ) : (
                                <p>{item.a}</p>
                            )}
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
