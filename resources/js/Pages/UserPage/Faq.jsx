import React from "react";
import { Head } from "@inertiajs/react";
import GafLayout from "@/Layouts/GafLayout";
import { useGaf } from "@/Context/GafContext";
import { RD } from "@/Data/gafRedesign";
import { HelpBox } from "@/Components/Gaf/Redesign/Home";

// FAQ page (approved layout): questions, data protection, contact. Content is fixed here.
const FAQS = {
    rw: [
        ["Ubushakashatsi bwa GAF-Rwanda ni iki?", "Guided Act & Feel Rwanda (GAF-Rwanda) ni ubushakashatsi bugamije kugerageza uburyo bushya bwo gufasha abantu bafite ibimenyetso by'agahinda gakabije (depression) hifashishijwe interineti (online therapy)."],
        ["Ni bande bemererwa kwitabira?", "Umuntu ufite ibimenyetso by'agahinda gakabije, ufite imyaka 18 kuzamura, uri mu Rwanda, uvuga Ikinyarwanda, kandi ushobora gukoresha interineti."],
        ["Nigute nakwitabira?", "Kanda kuri \"Itabire\" usubize ibibazo by'ibanze bigamije kureba niba wujuje ibisabwa. Niba wujuje ibisabwa, itsinda ryacu rizakuvugisha."],
        ["Ni iki kizaba nyuma yo kwemera kwitabira?", "Uzagirana ikiganiro kuri telefone n'inzobere mu by'imitekerereze (clinical psychologist), hanyuma ushyire umukono ahabugenewe wemera kwitabira (e-consent). Uzashyirwa muri imwe muri porogaramu ebyiri hifashishijwe tombola, kandi uzajya wuzuza ibibazo kuri interineti mu bihe bitandukanye."],
        ["Ese kwitabira bisaba amafaranga?", "Oya. Ubushakashatsi bukorerwa kuri interineti no kuri telefone aho uri hose, nta ngendo bisaba. Niba udafite ubushobozi bwo kugura interineti, umushinga uzayigenera."],
        ["Nshobora kuvamo igihe nshakiye?", "Yego. Kwitabira ni ubushake bwawe bwuzuye. Ushobora kwisubiraho igihe cyose ubishakiye cyangwa gusimbuka ikibazo udashaka gusubiza, nta ngaruka ku burenganzira bwawe."],
        ["Bizagenda bite ibimenyetso byanjye nibiyongera?", "Tuzakurikirana uko umerewe binyuze mu bibazo wuzuza buri byumweru bibiri. Niba ibimenyetso byiyongereye cyane, inzobere mu by'ubuzima bwo mu mutwe izaguhamagara kugira ngo iguhe ubufasha bw'ibanze kandi ikurangire ivuriro rikwegereye."],
    ],
    en: [
        ["What is GAF-Rwanda?", "Guided Act & Feel Rwanda (GAF-Rwanda) is a pragmatic, parallel-group, single-blind randomized controlled trial conducted entirely online across Rwanda. It tests a community health workers-guided digital intervention for major depressive disorder."],
        ["Who can take part?", "Adults aged 18 years or older who are fluent in Kinyarwanda, have the ability to use the internet, score ≥10 on the PHQ-9 and meet the diagnostic criteria for major depression or persistent depressive disorder according to the SCID-5."],
        ["How do I take part?", "Click \"Take part\" and answer the screening questions. If you are eligible, our team will contact you."],
        ["What happens after I agree to take part?", "You will have a phone interview with a clinical psychologist (SCID-5) and sign the electronic informed consent. You will then be randomized in a 1:1 ratio to the intervention group (GAF-Rwanda) or the control group (online minimal psychoeducation), and complete online questionnaires at set times."],
        ["Does it cost anything?", "No. The study is conducted entirely online. If a participant cannot afford internet access, this will be provided."],
        ["Can I stop at any time?", "Yes. Participation is voluntary. You can withdraw at any time, or skip any question you do not want to answer, without any consequences."],
        ["What if my symptoms get worse?", "Depression symptom severity is measured biweekly with the PHQ-9. In case of suicidal crises or serious deterioration, a clinical psychologist will contact you by phone and provide referral information."],
    ],
};

function Content() {
    const { lang } = useGaf();
    const rw = lang === "rw";
    const T = (r, e) => (rw ? r : e);

    return (
        <div className="rd">
            <section className="rd-page-hero">
                <div className="rd-wrap rd-stack">
                    <p className="rd-eyebrow">{T("IBIBAZO", "FAQ")}</p>
                    <h1>{T("Ibibazo bikunze kubazwa", "Frequently asked questions")}</h1>
                    <p className="rd-lead">{T("Ntubonye igisubizo? Twandikire cyangwa uduhamagare, itsinda ryacu rizagusubiza.", "Can’t find your answer? Email or call us and our team will respond.")}</p>
                </div>
            </section>

            <section className="rd-section rd-bg-1">
                <div className="rd-wrap rd-narrow rd-faq">
                    {FAQS[rw ? "rw" : "en"].map(([q, a], i) => (
                        <details key={q} open={i === 0}>
                            <summary>{q}</summary>
                            <p>{a}</p>
                        </details>
                    ))}
                </div>
            </section>

            <section className="rd-section rd-bg-green2" id="ibanga">
                <div className="rd-wrap rd-privacy">
                    <div className="rd-stack">
                        <p className="rd-eyebrow">{T("IBANGA", "PRIVACY")}</p>
                        <h2 className="rd-h2-sm">{T("Uko amakuru azabikwa", "Data protection")}</h2>
                    </div>
                    <div className="rd-stack">
                        <p>{T("Amakuru yose azafatwa muri ubu bushakashatsi azagirwa ibanga rikomeye. Azabikwa n'Ikigo cy'Igihugu cy'Ubuzima (RBC) kandi hakurikijwe Itegeko Nº 058/2021 ryo ku wa 13/10/2021 ryerekeye kurinda amakuru bwite n'imibereho bwite by'umuntu.", "All data collected in this study will be kept strictly confidential, in line with the Rwanda Data Protection and Privacy Law (Law No. 058/2021), national ethics guidelines and EU data protection and privacy policy.")}</p>
                        <p>{T("Amakuru akuranga (nk'amazina na nimero ya telefone) abikwa ukwayo, bitandukanye n'ibisubizo byawe. Ibisubizo byawe bihabwa inomero y'ibanga aho gukoresha izina ryawe. Abashakashatsi bakuru nibo bonyine bafite uburenganzira bwo kubona imyirondoro yawe.", "Identifying information (such as names and phone numbers) is stored separately from your answers, which are linked to a pseudonymised code instead of your name. Only the principal investigators have access to your identifying information.")}</p>
                    </div>
                </div>
            </section>

            <section className="rd-section rd-bg-2" id="vugana">
                <div className="rd-wrap rd-stack-lg">
                    <h2 className="rd-h2-sm">{T("Vugana natwe", "Contact us")}</h2>
                    <div className="rd-contact-grid">
                        <a className="rd-contact is-teal" href={`mailto:${RD.email}`}>
                            <span className="rd-contact-label">{T("IMEYILI", "EMAIL")}</span>
                            <span className="rd-contact-value">{RD.email}</span>
                        </a>
                        <a className="rd-contact is-green" href={`tel:${RD.phone}`}>
                            <span className="rd-contact-label">{T("TELEFONE", "PHONE")} / WHATSAPP</span>
                            <span className="rd-contact-value">{RD.phone}</span>
                        </a>
                        <div className="rd-contact">
                            <div className="rd-contact-lead">
                                <img src={`${RD.img}/team-theogene.jpg`} alt="Theogene Uwizeyimana" />
                                <div>
                                    <span className="rd-contact-label is-yellow">{T("UYOBORA UBUSHAKASHATSI", "TRIAL LEAD")}</span>
                                    <span className="rd-contact-name">Theogene Uwizeyimana</span>
                                </div>
                            </div>
                            <a className="rd-contact-mail" href={`mailto:${RD.leadEmail}`}>{RD.leadEmail}</a>
                        </div>
                        <div className="rd-contact">
                            <span className="rd-contact-label is-yellow">{T("UBURENGANZIRA BWAWE (RNEC)", "YOUR RIGHTS (RNEC)")}</span>
                            <span className="rd-contact-small">
                                {T("Umunyamabanga wa RNEC", "RNEC Secretary")}: 0788338058<br />
                                {T("Umuyobozi wa RNEC", "RNEC Chairperson")}: 0788338046
                            </span>
                        </div>
                    </div>
                    <HelpBox />
                </div>
            </section>
        </div>
    );
}

export default function Faq() {
    return (
        <>
            <Head title="GAF-Rwanda · Ibibazo / FAQ" />
            <Content />
        </>
    );
}

Faq.layout = (page) => <GafLayout>{page}</GafLayout>;
