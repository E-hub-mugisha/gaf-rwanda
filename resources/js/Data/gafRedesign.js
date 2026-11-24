// Content for the redesigned public site (dark slate / green theme).
// Every text is { rw, en }. Kinyarwanda wording follows our social media and approved materials;
// English wording follows the trial protocol (May 2026).

const IMG = "/images/redesign";

export const RD = {
    img: IMG,
    surveyUrl: "https://redcap.rbc.gov.rw/surveys/?s=YFPCATP3JAWD3PNP",
    vimeoUrl: "https://player.vimeo.com/video/1248379984?h=2866bddb83",
    rnec: "RNEC1177/2026",
    phone: "0781684259",
    email: "info@gafrwanda.com",
    leadEmail: "t.uwizeyimana@amsterdamumc.nl",
    playStore: "https://play.google.com/store/apps/details?id=nl.therapieland.app",
    appStore: "https://apps.apple.com/app/therapieland/id6760772709",

    nav: {
        home: { rw: "Ahabanza", en: "Home" },
        research: { rw: "Ubushakashatsi", en: "Study" },
        how: { rw: "Uko bikorwa", en: "How it works" },
        participation: { rw: "Kwitabira", en: "Eligibility" },
        team: { rw: "Itsinda", en: "Team" },
        activities: { rw: "Amakuru n'amafoto", en: "News & photos" },
        faq: { rw: "Ibibazo", en: "FAQ" },
        cta: { rw: "Itabire", en: "Take part" },
    },

    hero: {
        title: {
            rw: [["em", "Ikoranabuhanga"], ["t", " n'"], ["em", "abajyanama b'ubuzima"], ["t", ": igisubizo ku buzima bwo mu mutwe mu Rwanda."]],
            en: [["t", "A "], ["em", "community health workers-guided"], ["t", " "], ["em", "digital intervention"], ["t", " for major depressive disorder in Rwanda."]],
        },
        primary: { rw: "Itabire ukanze hano", en: "Take part" },
        secondary: { rw: "Menya byinshi", en: "Learn more" },
        slides: [`${IMG}/gallery/2026-10-scid-group.jpg`, `${IMG}/gallery/2026-09-plenary.jpg`, `${IMG}/gallery/2026-09-energizer.jpg`],
        slidePos: ["center 78%", "center 70%", "center 52%"],
        alt: { rw: "Inzobere mu by'imitekerereze zahuguwe na GAF-Rwanda", en: "Clinical psychologists trained by GAF-Rwanda" },
    },

    study: {
        statement: {
            rw: [["t", "GAF-Rwanda ni ubushakashatsi bugamije kugerageza "], ["b", "uburyo bushya"], ["t", " bwo gufasha abantu bafite ibimenyetso by'"], ["g", "agahinda gakabije"], ["t", " (depression) hifashishijwe "], ["b", "interineti"], ["t", " (online therapy)."]],
            en: [["t", "GAF-Rwanda is a "], ["b", "randomized controlled trial"], ["t", " that aims to determine the effectiveness of the digital intervention in reducing depressive symptoms for individuals with "], ["g", "major depressive disorder"], ["t", ", compared to an active control group."]],
        },
        partners: {
            rw: "Ubu bushakashatsi bukorwa ku bufatanye n'Ikigo cy'Igihugu cy'Ubuzima (RBC) na Amsterdam University Medical Centre (UMC).",
            en: "The trial is conducted by Amsterdam University Medical Centre (UMC) and the Mental Health Division of Rwanda Biomedical Centre (RBC).",
        },
        videoTitle: { rw: "Agahinda gakabije ni iki?", en: "What is depression?" },
        videoText: {
            rw: "Menya ibimenyetso by'agahinda gakabije, uko kagira ingaruka ku buzima bwa buri munsi, n'uko kavurwa.",
            en: "Learn about the symptoms of depression, how it affects daily life, and how it is treated. (Video in Kinyarwanda.)",
        },
        videoLink: { rw: "Reba video →", en: "Watch the video →" },
    },

    lead: {
        eyebrow: { rw: "UYOBORA UBUSHAKASHATSI", en: "TRIAL LEAD" },
        name: "Theogene Uwizeyimana",
        role: "PhD candidate · Marie Curie GROW Fellow",
        bio: {
            rw: "Ni umunyeshuri w'impamyabumenyi y'ikirenga (PhD) mu Ishami ry'Ubuzima bwo mu Mutwe muri Amsterdam UMC no muri Centre for Urban Mental Health ya Kaminuza ya Amsterdam. Ubushakashatsi bwe bwibanda ku kamaro k'ubufasha bwo kuri interineti buyoborwa n'abajyanama b'ubuzima ku bantu bafite agahinda gakabije mu Rwanda, n'ingaruka bugira ku bana b'ababyeyi babwitabiriye.",
            en: "PhD candidate in the Department of Psychiatry at Amsterdam UMC and the Centre for Urban Mental Health, University of Amsterdam. His research focuses on the effectiveness of a lay-counselor guided digital mental health intervention for depression in Rwanda and its impact on children of participating parents.",
        },
        phd: { rw: "GAF-Rwanda ni igice cy'ubushakashatsi bwe bwa PhD.", en: "GAF-Rwanda is part of his PhD research." },
        supervisedBy: { rw: "Akurikiranwa na", en: "Supervised by" },
        supervisors: [
            { img: `${IMG}/team-claudi.jpg`, name: "Prof. dr. Claudi Bockting", org: "Amsterdam UMC" },
            { img: `${IMG}/team-evi-anne.jpg`, name: "Dr. Evi-Anne van Dis", org: "Amsterdam UMC" },
            { img: `${IMG}/team-darius.jpg`, name: "Dr. Darius Gishoma", org: "RBC" },
        ],
        teamLink: { rw: "Menya itsinda ryose →", en: "Meet the whole team →" },
    },

    how: {
        title: { rw: "Uko ubushakashatsi bukorwa", en: "How the study works" },
        intro: {
            rw: "Abantu 430 bujuje ibisabwa bazashyirwa mu matsinda abiri hifashishijwe tombola, buri tsinda rigire abantu 215. Bose bazakurikiranwa mu gihe cy'amezi 6.",
            en: "Approximately 430 adults will be randomized in a 1:1 ratio (215 per group) to one of the two groups below. All participants are followed up for 6 months.",
        },
        group1: {
            tag: { rw: "Itsinda rya 1", en: "Intervention group" },
            title: { rw: "Guided Act & Feel Rwanda", en: "Guided Act & Feel Rwanda" },
            text: {
                rw: "Porogaramu y'ibyumweru 8 ikorerwa kuri interineti, ifasha umuntu gukurikirana amarangamutima ye no guteganya ibikorwa bishimishije, ayoborwa n'umujyanama w'ubuzima wahuguwe. Umujyanama w'ubuzima amuvugisha kuri telefone iminota 5–20 buri cyumweru.",
                en: "An 8-week digital Behavioral Activation program delivered via a secure e-Health platform. The program teaches participants to monitor their moods and proactively schedule positive activities. It is guided by trained Community Health Workers (lay-counselors), who provide weekly 5-20-minute phone calls and messages.",
            },
            img: `${IMG}/gallery/2026-09-app.jpg`,
        },
        group2: {
            tag: { rw: "Itsinda rya 2", en: "Control group" },
            title: { rw: "Gahunda y'amakuru gusa", en: "Online minimal psychoeducation" },
            text: {
                rw: "Porogaramu ikorerwa ku rubuga rwizewe, ikaba itanga amakuru n'inama umuntu yakwifashisha mu guhangana n'ibimenyetso by'agahinda gakabije.",
                en: "A secure website containing a short leaflet with basic information about depression and simple self-help tips, without any human guidance.",
            },
            img: `${IMG}/illustration-psychoeducation.png`,
        },
    },

    eligibility: {
        title: { rw: "Ninde ushobora kwitabira?", en: "Who can take part?" },
        items: [
            { icon: "heart", a: "#34A46B", b: "#34A46B", text: { rw: "Ufite ibimenyetso by'agahinda gakabije", en: "A score of ≥10 on the Patient Health Questionnaire-9 (PHQ-9)" } },
            { icon: "18+", a: "#EAD07F", b: "#EAD07F", text: { rw: "Ufite imyaka 18 kuzamura", en: "Aged 18 years or older" } },
            { icon: "RW", a: "#00A1DE", b: "#00A1DE", text: { rw: "Uri mu Rwanda", en: "Living in Rwanda" } },
            { icon: "talk", a: "#7FD3F2", b: "#34A46B", text: { rw: "Uvuga Ikinyarwanda", en: "Fluent in Kinyarwanda" } },
            { icon: "wifi", a: "#EAD07F", b: "#00A1DE", text: { rw: "Ushobora gukoresha interineti", en: "Ability to use the internet" } },
        ],
        stepsTitle: { rw: "Intambwe zo kwinjira mu bushakashatsi", en: "Steps to join the study" },
        stepsText: {
            rw: "Kuzuza ibibazo by'ibanze ntibivuze ko uhita wemererwa kwinjira mu bushakashatsi. Niba wujuje ibisabwa, itsinda ryacu rizakuvugisha.",
            en: "Completing the screening questions does not mean that you are enrolled in the study. If you are eligible, our team will contact you.",
        },
        stepsGif: `${IMG}/steps-rw.gif`,
        stepsEn: [
            ["Screening", "Answer the screening questions (PHQ-9) to check whether you are eligible."],
            ["Clinical interview", "A phone interview with a clinical psychologist (SCID-5)."],
            ["Informed consent", "Sign the electronic informed consent (e-consent)."],
            ["Randomization", "You are randomized to one of the two groups."],
            ["Assessments", "Complete online questionnaires, including the assessments at 3 and 6 months."],
        ],
    },

    photos: {
        eyebrow: { rw: "AMAFOTO", en: "PHOTOS" },
        title: { rw: ["Ibikorwa byacu mu ", "mafoto"], en: ["Our work in ", "pictures"] },
        text: {
            rw: "Amahugurwa, ibiganiro n'ibihe twagiranye n'abajyanama b'ubuzima n'inzobere mu by'imitekerereze mu Rwanda.",
            en: "Trainings and moments with community health workers and clinical psychologists in Rwanda.",
        },
        button: { rw: "Reba amafoto yose", en: "See all photos" },
        rows: [
            ["2026-11-psychologists-01", "2026-10-scid-group", "2026-06-training-1", "2026-09-energizer", "2026-06-training-3", "2026-09-opening", "2026-09-training-1", "2026-06-team-kigali", "2026-09-app"],
            ["2026-09-plenary", "2026-06-training-opening", "2026-10-scid-session", "2026-09-guides", "2026-10-scid-practice", "2026-06-training-gift", "2026-09-training-2"],
            ["2026-06-team-kigali", "2026-11-psychologists-04", "2026-09-anne-marie-1", "2026-06-training-1", "2026-09-anne-marie-2", "2026-06-training-3", "2026-09-energizer", "2026-10-scid-practice"],
        ],
    },

    news: {
        title: { rw: "Amakuru mashya", en: "Latest news" },
        readMore: { rw: "Soma inkuru →", en: "Read the story →" },
        all: { rw: "Reba amakuru yose →", en: "See all news →" },
    },

    social: {
        title: { rw: "Dukurikire ku mbuga nkoranyambaga", en: "Follow us on social media" },
        posts: [
            { url: "https://www.instagram.com/gafrwanda/p/Df6_EzQikhQ/", img: `${IMG}/social-mens-day.jpg`, title: { rw: "Umunsi Mpuzamahanga w'Abagabo", en: "International Men's Day" }, date: { rw: "19 Ugushyingo 2026", en: "19 November 2026" } },
            { url: "https://www.instagram.com/gafrwanda/p/Dfa4QXRCpTw/", img: `${IMG}/social-what-is-gaf.jpg`, title: { rw: "Ubushakashatsi bwa GAF-Rwanda ni iki?", en: "What is GAF-Rwanda?" }, date: { rw: "6 Ugushyingo 2026", en: "6 November 2026" } },
            { url: "https://www.instagram.com/gafrwanda/p/DezvxMpil1_/", img: `${IMG}/gallery/2026-10-scid-group.jpg`, title: { rw: "Inzobere mu by'imitekerereze zahuguwe ku kiganiro cy'ibanze", en: "Clinical psychologists trained in the SCID-5 interview" }, date: { rw: "22 Ukwakira 2026", en: "22 October 2026" } },
            { url: "https://www.instagram.com/gafrwanda/p/DeT_1KKiidb/", img: `${IMG}/social-wmhd.jpg`, title: { rw: "Ese umuntu wese ashobora kugira agahinda gakabije?", en: "Can anyone have depression?" }, date: { rw: "10 Ukwakira 2026", en: "10 October 2026" } },
        ],
    },

    cta: {
        title: { rw: "Agahinda gakabije karavurwa kandi kagakira. Nturi wenyine.", en: "Depression is treatable. You are not alone." },
        text: { rw: "Subiza ibibazo by'ibanze urebe niba wujuje ibisabwa.", en: "Answer a few screening questions to see whether you are eligible." },
    },

    partnersTitle: { rw: "ABAFATANYABIKORWA MU BUSHAKASHATSI", en: "RESEARCH PARTNERS" },
    partners: [
        { img: `${IMG}/logos/amsterdam-umc.png`, name: "Amsterdam UMC" },
        { img: `${IMG}/logos/rbc.png`, name: "Rwanda Biomedical Centre" },
        { img: `${IMG}/logos/uva.png`, name: "Universiteit van Amsterdam" },
        { img: `${IMG}/logos/urban-mental-health.png`, name: "Centre for Urban Mental Health" },
        { img: `${IMG}/logos/grow.png`, name: "MSCA GROW" },
        { img: `${IMG}/logos/eu-cofunded.png`, name: "Co-funded by the European Union", dark: true },
    ],

    help: {
        title: { rw: "Ukeneye ubufasha bwihuse?", en: "Need urgent help?" },
        line1: {
            rw: "Niba wumva umerewe nabi cyane cyangwa ufite ibitekerezo byo kwiyambura ubuzima, hamagara RBC kuri 114 cyangwa uhamagare itsinda ryacu kuri 0781684259.",
            en: "If you feel very unwell or have thoughts of ending your life, call RBC on 114 or call our team on 0781684259.",
        },
        line2: {
            rw: "Niba umuntu yamaze kugerageza kwiyahura cyangwa yakomeretse, hamagara SAMU kuri 912 ako kanya.",
            en: "If someone has already attempted suicide or is injured, call SAMU on 912 immediately.",
        },
    },

    footer: {
        tagline: { rw: "Ubushakashatsi ku buzima bwo mu mutwe bukorerwa kuri interineti mu Rwanda hose.", en: "An online mental health study across Rwanda." },
        pages: { rw: "Paji", en: "Pages" },
        contact: { rw: "Vugana natwe", en: "Contact us" },
        approved: { rw: "Ubushakashatsi bwemejwe na Rwanda National Ethics Committee (RNEC)", en: "Approved by the Rwanda National Ethics Committee (RNEC)" },
        participants: { rw: "Abitabiriye", en: "Participants" },
        links: [
            ["/team", { rw: "Itsinda n'abafatanyabikorwa", en: "Team and partners" }],
            ["/news", { rw: "Amakuru", en: "News" }],
            ["/events", { rw: "Ibikorwa", en: "Events" }],
            ["/gallery", { rw: "Amafoto", en: "Photos" }],
            ["/ibibazo", { rw: "Ibibazo bikunze kubazwa", en: "Frequently asked questions" }],
            ["/ibibazo#ibanga", { rw: "Uko amakuru azabikwa", en: "Data protection" }],
        ],
    },

    participants: {
        eyebrow: { rw: "KU BITABIRIYE UBUSHAKASHATSI GUSA", en: "FOR STUDY PARTICIPANTS ONLY" },
        title: { rw: "Injira kuri porogaramu yawe", en: "Log in to your program" },
        intro: { rw: "Iyi paji ni iy'abitabiriye ubushakashatsi bwa GAF-Rwanda. Hitamo itsinda urimo.", en: "This page is for GAF-Rwanda participants. Choose your group." },
        g1: {
            rw: "Porogaramu yawe iri muri application ya Therapieland. Yishyire kuri telefone yawe, hanyuma winjire ukoresheje imeyili n'ijambo ry'ibanga wahawe n'itsinda ryacu.",
            en: "Your program is in the Therapieland app. Install it on your phone, then log in with the email address and password provided by our team.",
        },
        g2: {
            rw: "Injira ku rubuga rwizewe rw'amakuru ukoresheje izina n'ijambo ry'ibanga wahawe.",
            en: "Log in to the secure website with the username and password provided by our team.",
        },
        getIt: { rw: "Yikure kuri", en: "Get it on" },
        login: { rw: "Injira", en: "Log in" },
        trouble: { rw: "Ufite ikibazo cyo kwinjira? Twandikire kuri info@gafrwanda.com cyangwa uduhamagare kuri 0781684259.", en: "Problems logging in? Email us at info@gafrwanda.com or call us on 0781684259." },
    },
};

// Fallback stories shown on the home page when no news articles are published yet.
export const RD_STORIES = [
    { url: "/news", image: `${IMG}/gallery/2026-10-scid-group.jpg`, date: { rw: "15–16 Ukwakira 2026", en: "15–16 October 2026" }, title: { rw: "Amahugurwa y'iminsi ibiri y'inzobere mu by'imitekerereze ku kiganiro cy'ibanze (SCID-5)", en: "Two-day SCID-5 training for clinical psychologists" } },
    { url: "/news", image: `${IMG}/gallery/2026-09-energizer.jpg`, date: { rw: "25 Nzeri 2026", en: "25 September 2026" }, title: { rw: "Amahugurwa yo kwibutsa abajyanama b'ubuzima n'inzobere mu by'imitekerereze bazakorana na GAF-Rwanda", en: "Refresher training for the community health workers and clinical psychologists of GAF-Rwanda" } },
    { url: "/news", image: `${IMG}/gallery/2026-06-training-1.jpg`, date: { rw: "16 Kamena 2026", en: "16 June 2026" }, title: { rw: "Abajyanama b'ubuzima n'inzobere mu by'imitekerereze basoje amahugurwa ya GAF-Rwanda", en: "Community health workers and clinical psychologists complete the GAF-Rwanda training" } },
];
