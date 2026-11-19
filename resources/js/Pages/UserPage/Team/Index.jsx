import React, { useMemo, useState } from "react";
import { Head } from "@inertiajs/react";
import GafLayout from "@/Layouts/GafLayout";
import { useGaf, imageFallback } from "@/Context/GafContext";

/* -------------------------------------------------------------------------
 | Helpers
 |------------------------------------------------------------------------- */

const getInitials = (name = "") =>
    name
        .replace(/^(prof|dr)\.?\s+/i, "")
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part.charAt(0))
        .join("")
        .toUpperCase();

function getMemberText(member, field, lang) {
    if (lang === "rw" && member[`${field}_rw`]) {
        return member[`${field}_rw`];
    }

    return member[field] || "";
}

const fill = (template = "", n) => template.replace("{n}", n);

const affiliationClass = (affiliation) =>
    ["netherlands", "rwanda", "both"].includes(affiliation)
        ? `is-${affiliation}`
        : "is-rwanda";

function Avatar({ member, size = "md" }) {
    const [failed, setFailed] = useState(false);
    const hasPhoto = member?.photo_url && !failed;

    return (
        <span
            className={`gaf-org-avatar is-${size} ${
                hasPhoto ? "" : "is-empty"
            }`}
        >
            {hasPhoto ? (
                <img
                    src={member.photo_url}
                    alt=""
                    loading="lazy"
                    onError={() => setFailed(true)}
                />
            ) : (
                member && <span>{getInitials(member.name)}</span>
            )}
        </span>
    );
}

/* -------------------------------------------------------------------------
 | Chart pieces
 |------------------------------------------------------------------------- */

// Person box used for supervisors, the trial lead and research assistants.
function PersonCard({ member, lang, featured = false }) {
    const position = getMemberText(member, "position", lang);
    const institution = getMemberText(member, "institution", lang);
    const responsibilities = getMemberText(member, "responsibilities", lang);

    return (
        <article
            className={`gaf-org-card ${affiliationClass(member.affiliation)} ${
                featured ? "is-featured" : ""
            }`}
        >
            <Avatar member={member} size={featured ? "lg" : "md"} />

            <div className="gaf-org-card-text">
                <h3>{member.name}</h3>

                {position && (
                    <p>
                        {position}
                        {!featured && institution && ` · ${institution}`}
                    </p>
                )}

                {featured && institution && (
                    <p className="gaf-org-card-strong">{institution}</p>
                )}

                {responsibilities && (
                    <p className="gaf-org-card-note">{responsibilities}</p>
                )}
            </div>
        </article>
    );
}

// The RBC support team frame (members shown with their responsibilities).
function SupportBox({ title, members, lang }) {
    return (
        <section className="gaf-org-frame gaf-org-support">
            <h4 className="gaf-org-frame-title">{title}</h4>

            <div className="gaf-org-support-list">
                {members.map((member) => {
                    const text =
                        getMemberText(member, "responsibilities", lang) ||
                        getMemberText(member, "position", lang);

                    return (
                        <div className="gaf-org-support-item" key={member.id}>
                            <Avatar member={member} />
                            <div>
                                <strong>{member.name}</strong>
                                {text && <small>{text}</small>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

// "18 psychologists · SCID-5 interviews"
function PsychologistsBox({ members, chart }) {
    return (
        <section className="gaf-org-frame gaf-org-psychologists">
            <h4 className="gaf-org-frame-title">
                {fill(chart.psychologists, members.length)}
            </h4>
            <p className="gaf-org-frame-sub">{chart.psychologistsSub}</p>

            <div className="gaf-org-people-grid">
                {members.map((member) => (
                    <div className="gaf-org-person" key={member.id}>
                        <Avatar member={member} size="lg" />
                        <strong>{member.name}</strong>
                    </div>
                ))}
            </div>
        </section>
    );
}

// "15 intervention groups · each psychologist supervises 2 CHWs"
function GroupsBox({ groups, chart, labels }) {
    return (
        <section className="gaf-org-frame gaf-org-groups">
            <h4 className="gaf-org-frame-title">
                {fill(chart.groups, groups.length)}
            </h4>
            <p className="gaf-org-frame-sub">{chart.groupsSub}</p>

            <div className="gaf-org-groups-grid">
                {groups.map(({ number, lead, workers }) => (
                    <div className="gaf-org-group" key={number}>
                        <span className="gaf-org-group-label">
                            {labels.group} {number}
                        </span>

                        <div className="gaf-org-person">
                            <Avatar member={lead} size="lg" />
                            <strong>{lead?.name || "—"}</strong>
                        </div>

                        {workers.length > 0 && (
                            <div
                                className="gaf-org-group-workers"
                                style={{ "--count": workers.length }}
                            >
                                {workers.map((member) => (
                                    <div
                                        className="gaf-org-person is-small"
                                        key={member.id}
                                    >
                                        <Avatar member={member} size="sm" />
                                        <small>{member.name}</small>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}

// Simple card used for search results and anyone outside the chart.
function MemberCard({ member, lang }) {
    const position = getMemberText(member, "position", lang);
    const institution = getMemberText(member, "institution", lang);

    return (
        <article className={`gaf-org-result ${affiliationClass(member.affiliation)}`}>
            <Avatar member={member} />
            <div>
                <strong>{member.name}</strong>
                {position && <small>{position}</small>}
                {institution && <small>{institution}</small>}
            </div>
        </article>
    );
}

/* -------------------------------------------------------------------------
 | Page
 |------------------------------------------------------------------------- */

export default function Index({ members = [] }) {
    const { lang, t, site } = useGaf();

    const page = t.teamPage;
    const labels = page.labels;
    const chart = page.chart;
    const emptyLabels = page.empty;

    const [search, setSearch] = useState("");

    // Sort members into the positions of the organisation chart.
    const org = useMemo(() => {
        const leadership = members.filter((m) => m.category === "leadership");

        const center =
            leadership.find((m) => m.reports_to_id) ||
            leadership.find((m) => m.affiliation === "both") ||
            null;

        const supervisors = leadership.filter((m) => m.id !== center?.id);

        const support = members.filter((m) => m.category === "support_team");
        const sideSupport = support.filter((m) => m.affiliation !== "rwanda");
        const rbcSupport = support.filter((m) => m.affiliation === "rwanda");

        const grouped = members.filter((m) => m.group_number);
        const groupSupervisorIds = new Set(
            grouped.map((m) => m.reports_to_id).filter(Boolean)
        );

        const assistants = members.filter(
            (m) => m.category === "research_assistant"
        );
        const interventionRAs = assistants.filter((m) =>
            groupSupervisorIds.has(m.id)
        );
        const assessmentRAs = assistants.filter(
            (m) => !groupSupervisorIds.has(m.id)
        );

        const psychologists = members.filter(
            (m) => m.category === "psychologist" && !m.group_number
        );

        const groupMap = grouped.reduce((acc, member) => {
            const number = Number(member.group_number);
            acc[number] = acc[number] || [];
            acc[number].push(member);
            return acc;
        }, {});

        const groups = Object.entries(groupMap)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([number, groupMembers]) => {
                const lead =
                    groupMembers.find(
                        (m) =>
                            m.category === "psychologist" ||
                            m.group_role === "psychologist"
                    ) || null;

                return {
                    number,
                    lead,
                    workers: groupMembers.filter((m) => m.id !== lead?.id),
                };
            });

        const placed = new Set(
            [
                center,
                ...supervisors,
                ...support,
                ...assistants,
                ...psychologists,
                ...grouped,
            ]
                .filter(Boolean)
                .map((m) => m.id)
        );

        return {
            center,
            supervisors,
            sideSupport,
            rbcSupport,
            interventionRAs,
            assessmentRAs,
            psychologists,
            groups,
            others: members.filter((m) => !placed.has(m.id)),
        };
    }, [members]);

    const searchResults = useMemo(() => {
        const term = search.trim().toLowerCase();

        if (!term) return [];

        return members.filter((member) =>
            [
                member.name,
                member.position,
                member.position_rw,
                member.institution,
                member.institution_rw,
                member.responsibilities,
                member.responsibilities_rw,
                member.group_number ? `${labels.group} ${member.group_number}` : null,
            ]
                .filter(Boolean)
                .some((value) => String(value).toLowerCase().includes(term))
        );
    }, [members, search, labels.group]);

    const isSearching = search.trim().length > 0;
    const topCount = Math.max(org.supervisors.length, 1);
    const hasLower =
        org.assessmentRAs.length > 0 ||
        org.psychologists.length > 0 ||
        org.interventionRAs.length > 0 ||
        org.groups.length > 0;

    return (
        <>
            <Head title={page.pageTitle} />

            <main className="gaf-org-page">
                <div className="gaf-org-container">
                    {/* Heading: legend · title · logo */}
                    <header className="gaf-org-header">
                        <ul className="gaf-org-legend">
                            <li>
                                <i className="is-netherlands" />
                                {labels.netherlands}
                            </li>
                            <li>
                                <i className="is-rwanda" />
                                {labels.rwanda}
                            </li>
                            <li>
                                <i className="is-both" />
                                {labels.both}
                            </li>
                        </ul>

                        <div className="gaf-org-title">
                            <h1>{page.title}</h1>
                            <p>{page.intro}</p>
                        </div>

                        <img
                            className="gaf-org-logo"
                            src={site.logo}
                            alt={site.name}
                            onError={imageFallback}
                        />
                    </header>

                    <div className="gaf-org-search">
                        <span aria-hidden="true">⌕</span>
                        <input
                            type="search"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder={page.searchPlaceholder}
                            aria-label={page.searchLabel}
                        />
                    </div>

                    {isSearching ? (
                        <section className="gaf-org-results">
                            <p className="gaf-org-results-count">
                                {page.showing} {searchResults.length} {page.of}{" "}
                                {members.length} {page.teamMembers}
                            </p>

                            {searchResults.length > 0 ? (
                                <div className="gaf-org-results-grid">
                                    {searchResults.map((member) => (
                                        <MemberCard
                                            key={member.id}
                                            member={member}
                                            lang={lang}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="gaf-org-empty">
                                    <h3>{emptyLabels.noResults}</h3>
                                    <p>{emptyLabels.tryAgain}</p>
                                    <button type="button" onClick={() => setSearch("")}>
                                        {emptyLabels.clearSearch}
                                    </button>
                                </div>
                            )}
                        </section>
                    ) : members.length === 0 ? (
                        <div className="gaf-org-empty">
                            <p>{emptyLabels.noMembers}</p>
                        </div>
                    ) : (
                        <div className="gaf-org" aria-label={chart.ariaLabel}>
                            {/* Row 1: supervisors */}
                            {org.supervisors.length > 0 && (
                                <>
                                    <div
                                        className="gaf-org-top"
                                        style={{ "--cols": topCount }}
                                    >
                                        {org.supervisors.map((member) => (
                                            <div className="gaf-org-cell" key={member.id}>
                                                <PersonCard member={member} lang={lang} />
                                                <span className="gaf-org-vline" />
                                            </div>
                                        ))}
                                    </div>

                                    {topCount > 1 && (
                                        <div
                                            className="gaf-org-hbus"
                                            style={{
                                                marginInline: `${100 / (2 * topCount)}%`,
                                            }}
                                        />
                                    )}

                                    {org.center && <span className="gaf-org-vline" />}
                                </>
                            )}

                            {/* Row 2: side support · trial lead · RBC support team */}
                            {(org.center ||
                                org.sideSupport.length > 0 ||
                                org.rbcSupport.length > 0) && (
                                <div className="gaf-org-middle">
                                    <div className="gaf-org-side is-left">
                                        {org.sideSupport.map((member) => (
                                            <PersonCard
                                                key={member.id}
                                                member={member}
                                                lang={lang}
                                            />
                                        ))}
                                        {org.sideSupport.length > 0 && (
                                            <span className="gaf-org-hline" />
                                        )}
                                    </div>

                                    <div className="gaf-org-center">
                                        {org.center && (
                                            <PersonCard
                                                member={org.center}
                                                lang={lang}
                                                featured
                                            />
                                        )}
                                    </div>

                                    <div className="gaf-org-side is-right">
                                        {org.rbcSupport.length > 0 && (
                                            <>
                                                <span className="gaf-org-hline" />
                                                <SupportBox
                                                    title={chart.rbcSupport}
                                                    members={org.rbcSupport}
                                                    lang={lang}
                                                />
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Rows 3–4: research assistants and their teams */}
                            {hasLower && (
                                <>
                                    <span className="gaf-org-vline" />

                                    <div className="gaf-org-lower">
                                        <div className="gaf-org-hbus gaf-org-lower-bus" />

                                        <div className="gaf-org-branch is-assessment">
                                            <span className="gaf-org-vline" />

                                            {org.assessmentRAs.length > 0 && (
                                                <div className="gaf-org-pair">
                                                    {org.assessmentRAs.map((member) => (
                                                        <PersonCard
                                                            key={member.id}
                                                            member={member}
                                                            lang={lang}
                                                        />
                                                    ))}
                                                </div>
                                            )}

                                            {org.psychologists.length > 0 && (
                                                <>
                                                    <span className="gaf-org-vline" />
                                                    <PsychologistsBox
                                                        members={org.psychologists}
                                                        chart={chart}
                                                    />
                                                </>
                                            )}
                                        </div>

                                        <div className="gaf-org-branch is-intervention">
                                            <span className="gaf-org-vline" />

                                            {org.interventionRAs.length > 0 && (
                                                <div className="gaf-org-pair">
                                                    {org.interventionRAs.map((member) => (
                                                        <PersonCard
                                                            key={member.id}
                                                            member={member}
                                                            lang={lang}
                                                        />
                                                    ))}
                                                </div>
                                            )}

                                            {org.groups.length > 0 && (
                                                <>
                                                    <span className="gaf-org-vline" />
                                                    <GroupsBox
                                                        groups={org.groups}
                                                        chart={chart}
                                                        labels={labels}
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Anyone not represented in the chart */}
                            {org.others.length > 0 && (
                                <section className="gaf-org-others">
                                    <h4 className="gaf-org-frame-title">
                                        {page.sections.other}
                                    </h4>
                                    <div className="gaf-org-results-grid">
                                        {org.others.map((member) => (
                                            <MemberCard
                                                key={member.id}
                                                member={member}
                                                lang={lang}
                                            />
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}

Index.layout = (page) => <GafLayout>{page}</GafLayout>;
