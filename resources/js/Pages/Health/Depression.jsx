import React, { useEffect, useMemo, useState } from "react";
import { Head } from "@inertiajs/react";
import axios from "axios";
import AppLayout from "@/Layouts/AppLayout";

import {
    Activity,
    AlertTriangle,
    ArrowDown,
    ArrowUp,
    Brain,
    CheckCircle2,
    HeartHandshake,
    HeartPulse,
    ShieldCheck,
    Sparkles,
    Stethoscope,
    Users,
    Weight,
} from "lucide-react";

import { getLanguage, LANGUAGE_EVENT } from "@/lib/Language";

/* =========================================================
   DEPRESSION LANDING PAGE
   Static educational mental-health page
   Languages: RW / EN / FR / NL
========================================================= */

const content = {
    rw: {
        metaTitle: "Agahinda Gakabije | Ubuzima bwo mu Mutwe",

        heroTitle: "AGAHINDA GAKABIJE",
        heroDescription: "Gusobanukirwa Agahinda gakabije (Depression)",

        introEyebrow: "UBUMENYI KU GAHINDA GAKABIJE",
        introTitle: "Gusobanukirwa Agahinda gakabije (Depression)",
        introText:
            "Agahinda gakabije ni imwe mu ndwara zo mu mutwe zikunze kugaragara no kwibasira abantu benshi kwisi. Abantu bagera kuri miliyoni 350 b'imyaka itandukanye bafite iki kibazo ku isi hose. Agahinda gakabije gatuma abantu benshi badashobora gukora imirimo yabo ya buri munsi neza, kandi ibi bikaba bibangamira ubuzima bw'abantu kurusha ibindi byose. Iyo umuntu afite agahinda gakabije, ntikagira ingaruka kuri we gusa, ahubwo gashobora no kugira ingaruka ku bantu ba hafi akunda, urugero nk'umuryango, inshuti, abo bigana cyangwa abo bakorana.",
        introText2:
            "Agahinda gakabije gashobora gutangira umuntu akiri muto, kandi gakunze kugaragara cyane mu bagore kurusha mu bagabo.",

        factsEyebrow: "IMIBARE Y'INGENZI",
        factsTitle: "IMIBARE Y'INGENZI",
        facts: [
            {
                value: "350M+",
                label: "Abantu ku isi bafite agahinda gakabije",
            },
            {
                value: "9.1%",
                label: "By'abaturage mu Rwanda bafite agahinda gakabije",
            },
            {
                value: "17.8%",
                label: "By'abarokotse Jenoside yakorewe abatutsi mu 1994 mu Rwanda, bafite agahinda gakabije",
            },
            {
                value: "15 – 29",
                label: "Ikigero cy’imyaka abantu benshi bakunze kwiyahura kubera agahinda gakabije ku isi hose",
            },
        ],

        rwandaEyebrow: "MU RWANDA",
        rwandaTitle: "Agahinda gakabije mu Rwanda",
        rwandaText:
            "Ubushakashatsi ku buzima bwo mu mutwe mu Rwanda bwo mu 2025 (Rwanda Mental Health Survey 2025) bwerekanye ko 9.1% by’abaturage muri rusange bafite agahinda gakabije (major depressive episode), mu gihe iki kigero cyageze kuri 17.8% mu barokotse Jenoside yakorewe Abatutsi mu 1994",
        rwandaText2:
            "Ubushakashatsi kandi bwerekanye ko agahinda gakabije kari hejuru mu bagore kurusha abagabo, cyane cyane mu barokotse Jenoside yakorewe Abatutsi mu 1994, aho kari kuri 21.4% mu bagore ugereranyije na 11.3% mu bagabo.",

        symptomsEyebrow: "IBIMENYETSO",
        symptomsTitle: "Ibimenyetso by’agahinda gakabije",
        symptomsIntro:
            "Iyo umuntu afite agahinda gakabije, ashobora kugira ibi bimenyetso bikurikira:",
        symptomsIntro2:
            "Kuba umuntu afite agahinda gakabije bimutesha umurongo mu mibereho ye ya buri munsi. Urugero: bimubuza gukora akazi, kwiga iyo ari umunyeshuri, ndetse bishobora no kumubuza gukora uturimo tworoheje twa buri munsi, nko kwiyuhagira cyangwa kwiyitaho muri rusange. Agahinda gakabije gashobora kugaruka kenshi, cyane cyane iyo katavuwe hakiri kare, mu gihe kagaragaye.",
        symptoms: [
            "Kumva ubabaye cyane mu mutima cyangwa ukumva nta kintu na kimwe ushaka.",
            "Kutagira ubushake bwo gukora ibintu, ndetse n'ibyo wari usanzwe ukunda gukora",
            "Gucika intege ku buryo udashobora gukora imirimo yawe ya buri munsi.",
            "Kwishinja icyaha cyangwa kumva nta gaciro ugifite mu buzima.",
            "Kudashobora gusinzira neza cyangwa gutakaza ubushake bwo kurya.",
            "Guhora wumva unaniwe cyane.",
            "Kudashobora gutekereza neza cyangwa kwibanda ku kintu runaka.",
        ],

        severityEyebrow: "UBUREMERE",
        severityTitle:
            "Ubukana bw’agahinda gakabije ndetse no kongera kugaruka kwako (relapse)",
        relapse1:
            "Agahinda gakabije gashobora gushyirwa mu byiciro bitatu by’ubukana hagendewe ku bimenyetso umuntu agaragaza.",
        severity: [
            {
                title: "Agahinda gakabije ko ku rwego rworoheje (mild)",
                description:
                    "Karangwa n'ibimenyetso bike bigaragara ariko ntibibangamira ubuzima busanzwe bwa buri munsi. urugero: gukora akazi, kubana n'inshuti n'umuryango ndetse nibindi.",
            },
            {
                title: "Agahinda gakabije ko ku rwego ruri m'urugero (moderate)",
                description:
                    "Gashobora gutuma umuntu agira ingorane mu gukora imirimo/akazi ke ka buri munsi, cyangwa bikabangamira imibanire ye n’umuryango cyangwa inshuti ze, ariko  ntibihungabanya burundu imikorere ye ya buri munsi muri rusange.",
            },
            {
                title: "Agahinda gakabije ko ku rwego rukabije (severe)",
                description:
                    " Gatuma umuntu adashobora gukora imirimo ye ya buri munsi. Urugero; ntago abasha gukora akazi, ntago abasha kubana neza n’umuryango we ndetse n’inshuti ze muri rusange, cyangwa gukurikirana ibikorwa byo mu rugo nkuko bisanzwe. N’iyo ashoboye gukora, imikorere ye iba yaragabanutse cyane.",
            },
        ],
        relapse2:
            "Agahinda gakabije gashobora kongera kugaruka, cyane cyane iyo kadakurikiranwe kuva kagitangira/kakigaragara. Niyo mpamvu, kuvura agahinda gakabije kuva mu ntangiriro y’uko kagaragaye ari iby’ingenzi cyane.",

        causesEyebrow: "IMPAMVU N'UBURYO WAKWIRINDA",
        causesTitle: "Ibitera agahinda gakabije n’uburyo wakwirinda ",
        causesIntro:
            "Agahinda gakabije gashobora guterwa n’ihuriro cyangwa urusobe bw’ibintu bitandukanye biba mubuzima bw’umuntu. Ibi bishobora kuba ihuriro riri hagati y’imibanire n’abandi, ibyiyumo cyangwa se imitekerereze, ndetse n’imiterere y’umubiri w’umuntu. Niyo mpamvu abantu bahuye n’ibihe bikomeye cyangwa bibabaje mu buzima baba bafite ibyago byinshi byo kurwara agahinda gakabije ",
        causesIntro2:
            "Agahinda gakabije gashobora gutera umubabaro ukomeye, bikarushaho kwangiza imiterere y’ubuzima, imibereho n’imikorere y’umuntu.",

        causesIntro2:
            "Ibibazo by’ubuzima bw’umubiri na byo bishobora kugira uruhare mu kugaragara kw’agahinda gakabije. Urugero: indwara y’umutima ishobora gutuma uyifite arwara agahinda gakabije, kandi ku rundi ruhande, ako gahinda gakabije gashobora kurushaho kuzahaza indwara y’umutima kubera guhangayikishwa n’iyo ndwara.",

        preventionTitle: "Ikitonderwa",
        preventionText:
            " Iyo agahinda gakabije kageze ku rwego rukabije cyane, gashobora gutuma umuntu yiyahura. Buri mwaka, abantu barenga 800,000 bapfa bazize kwiyahura ku isi hose. Kwiyahura kandi niyo mpamvu ya kabiri y'impfu mu bantu bafite imyaka 15–29",

        adviceEyebrow: "Inama zibyo wakora",
        adviceTitle: "Inama zagufasha guhangana n’agahinda gakabije",
        advice: [
            "Menya ibimenyetso by’agahinda gakabije ufite; nta mpamvu yo guterwa isoni no kuba ubifite.",
            "Kora ibikorwa ukunda, nk’imyidagaduro cyangwa ibindi bikorwa wishimira, buri gihe.",
            "Shaka abantu ushobora kuganiriza kandi mugakorana ibikorwa hamwe.",
            "Kora imyitozo ngororamubiri buri gihe.",
        ],

        advice2Title: "Ni iki twakora kugira ngo dutsinde agahinda gakabije?",
        advice2: [
            "Kugisha inama muganga, umuganga w’indwara zo mu mutwe cyangwa inzobere mu by’imitekerereze igihe wumva ufite ibimenyetso by’agahinda gakabije. ",
            "Kwitoza kugira ubushishozi bwo gutahura kugaragara kw’agahinda gakabije (depression) mu muryango, mu nshuti, cyangwa mu bo muziranye, kandi ukabashishikariza gushaka ubufasha bakeneye.",
            "Kumva kandi ugashyigikira abantu bafite agahinda gakabije ndetse n’abantu babo ba hafi.",
        ],

        supportEyebrow: "SHAKA UBUFASHA",
        supportTitle:
            "Uramutse ukeneye ubufasha cyangwa ugize ikibazo, watwandikira tukagufasha kuvugana n'inzobere mu by'imitekerereze.",
        supportText: "Twandikire kuri nimero: +250 786535362 (whatsapp).",
        supportButton: "Shaka ubufasha",

        important: "ICY'INGENZI",
        importantText:
            "Aya makuru ni ayo kwigisha no gutanga ubumenyi; ntabwo asimbura isuzuma cyangwa inama by'umuhanga mu buzima bwo mu mutwe.",

        urgent: "Niba umuntu ari mu kaga ako kanya cyangwa ashobora gukora ibyo yatekereje byo kwiyahura, shakisha ubufasha bwihutirwa kwa serivisi z'ubutabazi, ku kigo nderabuzima cyangwa ku muntu wizewe.",

        backTop: "Subira hejuru",
    },

    en: {
        metaTitle: "Depression | Mental Health",

        heroEyebrow: "MENTAL HEALTH",
        heroTitle: "DEPRESSION",
        heroDescription:
            "Learn about depression, its symptoms, its impact on everyday life, and why seeking support early can make a difference.",
        heroPrimary: "Learn more",
        heroSecondary: "Get support",

        introEyebrow: "UNDERSTANDING DEPRESSION",
        introTitle:
            "Understanding depression is an important first step toward seeking support.",
        introText:
            "Depression is one of the most common mental health conditions in the world. It can affect daily life, relationships, and the ability to carry out usual activities.",
        introText2:
            "Recognizing the signs and knowing when to seek help can support earlier access to appropriate care.",

        factsEyebrow: "KEY FIGURES",
        factsTitle:
            "Depression is a mental health issue that deserves attention.",
        facts: [
            {
                value: "350M+",
                label: "People worldwide living with depression",
            },
            {
                value: "9.1%",
                label: "Of Rwanda's general population experienced a major depressive episode",
            },
            {
                value: "17.8%",
                label: "Of survivors of the 1994 Genocide against the Tutsi experienced a major depressive episode",
            },
            {
                value: "15–29",
                label: "Age group where suicide is one of the leading causes of death",
            },
        ],

        rwandaEyebrow: "IN RWANDA",
        rwandaTitle: "Depression in Rwanda",
        rwandaText:
            "The Rwanda Mental Health Survey 2025 shows that 9.1% of the general population experienced a major depressive episode.",
        rwandaText2:
            "Among survivors of the 1994 Genocide against the Tutsi, 17.8% experienced a major depressive episode. Among these survivors, 21.4% were women and 11.3% were men.",

        symptomsEyebrow: "SYMPTOMS",
        symptomsTitle: "Symptoms of depression",
        symptomsIntro:
            "Symptoms can vary from person to person. When they persist and affect everyday functioning, it is important to seek advice from a mental health professional.",
        symptoms: [
            "Persistent sadness or lack of interest.",
            "Loss of motivation to do usual activities.",
            "Discouragement or weakness that affects daily activities.",
            "Feelings of guilt or low self-worth.",
            "Changes in sleep or appetite.",
            "Extreme tiredness.",
            "Difficulty thinking or concentrating.",
            "Difficulty functioning at work, school, or in self-care.",
            "Depression can recur if it is not treated or addressed early.",
        ],

        severityEyebrow: "SEVERITY",
        severityTitle: "Depression can occur at different levels of severity.",
        severity: [
            {
                title: "Mild",
                description:
                    "There may be fewer symptoms, but they can still affect daily functioning.",
            },
            {
                title: "Moderate",
                description:
                    "Symptoms may be more noticeable and begin to have a stronger effect on everyday life.",
            },
            {
                title: "Severe",
                description:
                    "Symptoms are more intense and can significantly affect health and daily functioning.",
            },
        ],
        relapse:
            "Depression can recur, so early treatment and support are important.",

        causesEyebrow: "CAUSES & PREVENTION",
        causesTitle: "Factors that can contribute to depression",
        causesIntro:
            "Depression can be influenced by different factors. Understanding these factors can support prevention and earlier access to help.",
        causes: [
            {
                title: "Relationships & emotions",
                text: "Relationships, emotions, and thought patterns can influence mental wellbeing.",
            },
            {
                title: "Difficult life events",
                text: "Bereavement, trauma, or job loss can increase the risk of depression.",
            },
            {
                title: "Physical health",
                text: "Physical health problems, such as heart disease, can contribute to depression.",
            },
            {
                title: "Wellbeing & functioning",
                text: "Depression can affect health, wellbeing, relationships, and everyday functioning.",
            },
        ],

        preventionTitle: "Prevention and mental wellbeing",
        preventionText:
            "Prevention can include education and training on positive thinking as well as regular physical exercise.",

        adviceEyebrow: "ADVICE",
        adviceTitle: "What to do",
        advice: [
            "Recognize the symptoms of depression and do not be ashamed to seek help.",
            "Take part in enjoyable or recreational activities.",
            "Find people you can talk to or do activities with.",
            "Exercise regularly.",
            "Seek help from a doctor, psychiatrist, or other mental health professional.",
            "Recognize signs of depression in family members or friends and encourage them to seek help.",
            "Listen to and support people living with depression and those close to them.",
        ],

        supportEyebrow: "GET SUPPORT",
        supportTitle: "You do not have to face depression alone.",
        supportText:
            "Talking to someone you trust or a mental health professional can be an important step toward getting appropriate support.",
        supportButton: "Get support",

        important: "IMPORTANT",
        importantText:
            "This information is educational and does not replace assessment or advice from a mental health professional.",

        urgent: "If someone is in immediate danger or may act on suicidal thoughts, seek urgent help from local emergency services, a health facility, or a trusted person.",

        backTop: "Back to top",
    },

    fr: {
        metaTitle: "Dépression | Santé mentale",

        heroEyebrow: "SANTÉ MENTALE",
        heroTitle: "DÉPRESSION",
        heroDescription:
            "Découvrez la dépression, ses symptômes, son impact sur la vie quotidienne et l'importance de demander de l'aide tôt.",
        heroPrimary: "En savoir plus",
        heroSecondary: "Obtenir de l'aide",

        introEyebrow: "COMPRENDRE LA DÉPRESSION",
        introTitle:
            "Comprendre la dépression est une première étape importante pour demander de l'aide.",
        introText:
            "La dépression est l'un des troubles de santé mentale les plus fréquents dans le monde. Elle peut affecter la vie quotidienne, les relations et la capacité à accomplir les activités habituelles.",
        introText2:
            "Reconnaître les signes et savoir quand demander de l'aide peut favoriser un accès plus précoce aux soins appropriés.",

        factsEyebrow: "CHIFFRES CLÉS",
        factsTitle:
            "La dépression est un problème de santé mentale qui mérite toute notre attention.",
        facts: [
            {
                value: "350M+",
                label: "Personnes vivant avec une dépression dans le monde",
            },
            {
                value: "9,1%",
                label: "De la population générale du Rwanda ayant connu un épisode dépressif majeur",
            },
            {
                value: "17,8%",
                label: "Des survivants du Génocide perpétré contre les Tutsi ayant connu un épisode dépressif majeur",
            },
            {
                value: "15–29",
                label: "Tranche d'âge où le suicide figure parmi les principales causes de décès",
            },
        ],

        rwandaEyebrow: "AU RWANDA",
        rwandaTitle: "La dépression au Rwanda",
        rwandaText:
            "L'Enquête sur la santé mentale au Rwanda de 2025 montre que 9,1 % de la population générale ont connu un épisode dépressif majeur.",
        rwandaText2:
            "Parmi les survivants du Génocide perpétré contre les Tutsi en 1994, 17,8 % ont connu un épisode dépressif majeur. Parmi ces survivants, 21,4 % étaient des femmes et 11,3 % des hommes.",

        symptomsEyebrow: "SYMPTÔMES",
        symptomsTitle: "Symptômes de la dépression",
        symptomsIntro:
            "Les symptômes peuvent varier d'une personne à l'autre. Lorsqu'ils persistent et affectent le fonctionnement quotidien, il est important de demander conseil à un professionnel de santé mentale.",
        symptoms: [
            "Tristesse persistante ou manque d'intérêt.",
            "Perte de motivation pour les activités habituelles.",
            "Découragement ou faiblesse affectant les activités quotidiennes.",
            "Sentiment de culpabilité ou faible estime de soi.",
            "Changements dans le sommeil ou l'appétit.",
            "Fatigue extrême.",
            "Difficulté à penser ou à se concentrer.",
            "Difficultés à fonctionner au travail, à l'école ou à prendre soin de soi.",
            "La dépression peut réapparaître si elle n'est pas traitée ou prise en charge tôt.",
        ],

        severityEyebrow: "GRAVITÉ",
        severityTitle:
            "La dépression peut avoir différents niveaux de gravité.",
        severity: [
            {
                title: "Légère",
                description:
                    "Les symptômes peuvent être moins nombreux, mais ils peuvent tout de même affecter le fonctionnement quotidien.",
            },
            {
                title: "Modérée",
                description:
                    "Les symptômes peuvent être plus visibles et commencer à affecter davantage la vie quotidienne.",
            },
            {
                title: "Sévère",
                description:
                    "Les symptômes sont plus intenses et peuvent fortement affecter la santé et le fonctionnement quotidien.",
            },
        ],
        relapse:
            "La dépression peut réapparaître ; un traitement et un soutien précoces sont donc importants.",

        causesEyebrow: "CAUSES ET PRÉVENTION",
        causesTitle: "Facteurs pouvant contribuer à la dépression",
        causesIntro:
            "La dépression peut être influencée par différents facteurs. Les comprendre peut contribuer à la prévention et à un accès plus précoce à l'aide.",
        causes: [
            {
                title: "Relations et émotions",
                text: "Les relations, les émotions et les schémas de pensée peuvent influencer le bien-être mental.",
            },
            {
                title: "Événements difficiles",
                text: "Le deuil, les traumatismes ou la perte d'emploi peuvent augmenter le risque de dépression.",
            },
            {
                title: "Santé physique",
                text: "Les problèmes de santé physique, comme les maladies cardiaques, peuvent contribuer à la dépression.",
            },
            {
                title: "Bien-être et fonctionnement",
                text: "La dépression peut affecter la santé, le bien-être, les relations et le fonctionnement quotidien.",
            },
        ],

        preventionTitle: "Prévention et bien-être mental",
        preventionText:
            "La prévention peut inclure l'éducation et la formation à la pensée positive ainsi que la pratique régulière d'une activité physique.",

        adviceEyebrow: "CONSEILS",
        adviceTitle: "Que faire",
        advice: [
            "Reconnaissez les symptômes de la dépression et n'ayez pas honte de demander de l'aide.",
            "Participez à des activités agréables ou récréatives.",
            "Trouvez des personnes avec qui parler ou faire des activités.",
            "Faites régulièrement de l'exercice.",
            "Demandez de l'aide à un médecin, un psychiatre ou un autre professionnel de la santé mentale.",
            "Reconnaissez les signes de dépression chez les membres de la famille ou les amis et encouragez-les à demander de l'aide.",
            "Écoutez et soutenez les personnes vivant avec une dépression ainsi que leurs proches.",
        ],

        supportEyebrow: "OBTENIR DE L'AIDE",
        supportTitle: "Vous n'avez pas à affronter la dépression seul.",
        supportText:
            "Parler à une personne de confiance ou à un professionnel de santé mentale peut être une étape importante pour obtenir le soutien approprié.",
        supportButton: "Obtenir de l'aide",

        important: "IMPORTANT",
        importantText:
            "Ces informations sont éducatives et ne remplacent pas une évaluation ou les conseils d'un professionnel de santé mentale.",

        urgent: "Si une personne est en danger immédiat ou risque de passer à l'acte après des pensées suicidaires, demandez une aide urgente auprès des services d'urgence locaux, d'un établissement de santé ou d'une personne de confiance.",

        backTop: "Retour en haut",
    },

    nl: {
        metaTitle: "Depressie | Geestelijke gezondheid",

        heroEyebrow: "GEESTELIJKE GEZONDHEID",
        heroTitle: "DEPRESSIE",
        heroDescription:
            "Leer meer over depressie, de symptomen, de invloed op het dagelijks leven en waarom het belangrijk is om vroeg ondersteuning te zoeken.",
        heroPrimary: "Lees meer",
        heroSecondary: "Hulp zoeken",

        introEyebrow: "DEPRESSIE BEGRIJPEN",
        introTitle:
            "Depressie begrijpen is een belangrijke eerste stap om ondersteuning te zoeken.",
        introText:
            "Depressie is een van de meest voorkomende psychische aandoeningen ter wereld. Het kan invloed hebben op het dagelijks leven, relaties en het vermogen om gewone activiteiten uit te voeren.",
        introText2:
            "Het herkennen van signalen en weten wanneer hulp nodig is, kan bijdragen aan vroegtijdige toegang tot passende zorg.",

        factsEyebrow: "BELANGRIJKE CIJFERS",
        factsTitle:
            "Depressie is een psychisch gezondheidsprobleem dat aandacht verdient.",
        facts: [
            {
                value: "350M+",
                label: "Mensen wereldwijd die met een depressie leven",
            },
            {
                value: "9,1%",
                label: "Van de algemene bevolking van Rwanda maakte een ernstige depressieve episode door",
            },
            {
                value: "17,8%",
                label: "Van de overlevenden van de genocide tegen de Tutsi maakte een ernstige depressieve episode door",
            },
            {
                value: "15–29",
                label: "Leeftijdsgroep waarin zelfdoding een belangrijke doodsoorzaak is",
            },
        ],

        rwandaEyebrow: "IN RWANDA",
        rwandaTitle: "Depressie in Rwanda",
        rwandaText:
            "Uit de Mental Health Survey van Rwanda uit 2025 blijkt dat 9,1% van de algemene bevolking een ernstige depressieve episode heeft doorgemaakt.",
        rwandaText2:
            "Onder overlevenden van de genocide tegen de Tutsi in 1994 heeft 17,8% een ernstige depressieve episode doorgemaakt. Onder deze overlevenden was 21,4% vrouw en 11,3% man.",

        symptomsEyebrow: "SYMPTOMEN",
        symptomsTitle: "Symptomen van depressie",
        symptomsIntro:
            "Symptomen kunnen van persoon tot persoon verschillen. Wanneer ze aanhouden en het dagelijks functioneren beïnvloeden, is het belangrijk om advies te vragen aan een professional in de geestelijke gezondheidszorg.",
        symptoms: [
            "Aanhoudende somberheid of gebrek aan interesse.",
            "Verlies van motivatie om gewone activiteiten te doen.",
            "Ontmoediging of zwakte die het dagelijks functioneren beïnvloedt.",
            "Schuldgevoelens of een laag gevoel van eigenwaarde.",
            "Veranderingen in slaap of eetlust.",
            "Extreme vermoeidheid.",
            "Moeite met denken of concentreren.",
            "Moeite met functioneren op het werk, op school of bij zelfzorg.",
            "Depressie kan terugkomen als deze niet wordt behandeld of niet vroeg wordt aangepakt.",
        ],

        severityEyebrow: "ERNST",
        severityTitle: "Depressie kan verschillende niveaus van ernst hebben.",
        severity: [
            {
                title: "Licht",
                description:
                    "Er kunnen minder symptomen zijn, maar deze kunnen nog steeds het dagelijks functioneren beïnvloeden.",
            },
            {
                title: "Matig",
                description:
                    "De symptomen kunnen duidelijker worden en een grotere invloed hebben op het dagelijks leven.",
            },
            {
                title: "Ernstig",
                description:
                    "De symptomen zijn intenser en kunnen de gezondheid en het dagelijks functioneren sterk beïnvloeden.",
            },
        ],
        relapse:
            "Depressie kan terugkeren, daarom zijn vroege behandeling en ondersteuning belangrijk.",

        causesEyebrow: "OORZAKEN EN PREVENTIE",
        causesTitle: "Factoren die kunnen bijdragen aan depressie",
        causesIntro:
            "Depressie kan worden beïnvloed door verschillende factoren. Inzicht hierin kan bijdragen aan preventie en vroegtijdige hulp.",
        causes: [
            {
                title: "Relaties en emoties",
                text: "Relaties, emoties en denkpatronen kunnen invloed hebben op het mentale welzijn.",
            },
            {
                title: "Moeilijke gebeurtenissen",
                text: "Rouw, trauma of verlies van werk kunnen het risico op depressie vergroten.",
            },
            {
                title: "Lichamelijke gezondheid",
                text: "Lichamelijke gezondheidsproblemen, zoals hartziekten, kunnen bijdragen aan depressie.",
            },
            {
                title: "Welzijn en functioneren",
                text: "Depressie kan invloed hebben op gezondheid, welzijn, relaties en dagelijks functioneren.",
            },
        ],

        preventionTitle: "Preventie en mentaal welzijn",
        preventionText:
            "Preventie kan bestaan uit voorlichting en training over positief denken en regelmatige lichaamsbeweging.",

        adviceEyebrow: "ADVIES",
        adviceTitle: "Wat te doen",
        advice: [
            "Herken de symptomen van depressie en schaam je niet om hulp te zoeken.",
            "Doe mee aan activiteiten die je leuk vindt of aan ontspanning.",
            "Zoek mensen met wie je kunt praten of activiteiten kunt doen.",
            "Beweeg regelmatig.",
            "Zoek hulp bij een arts, psychiater of andere professional in de geestelijke gezondheidszorg.",
            "Herken tekenen van depressie bij familieleden of vrienden en moedig hen aan om hulp te zoeken.",
            "Luister naar en ondersteun mensen die met depressie leven en hun naasten.",
        ],

        supportEyebrow: "HULP ZOEKEN",
        supportTitle: "Je hoeft depressie niet alleen te doorstaan.",
        supportText:
            "Praten met iemand die je vertrouwt of met een professional in de geestelijke gezondheidszorg kan een belangrijke stap zijn naar passende ondersteuning.",
        supportButton: "Hulp zoeken",

        important: "BELANGRIJK",
        importantText:
            "Deze informatie is educatief en vervangt geen beoordeling of advies van een professional in de geestelijke gezondheidszorg.",

        urgent: "Als iemand direct gevaar loopt of mogelijk zal handelen naar suïcidale gedachten, zoek dan dringend hulp bij lokale hulpdiensten, een zorginstelling of een vertrouwd persoon.",

        backTop: "Terug naar boven",
    },
};

function SectionLabel({ children, light = false }) {
    return (
        <div className={`section-label ${light ? "section-label-light" : ""}`}>
            <span className="label-line" />
            <span>{children}</span>
        </div>
    );
}

function DecorativeMark({ light = false }) {
    return (
        <div
            className={`decorative-mark ${light ? "decorative-mark-light" : ""}`}
        >
            <span />
            <span />
            <span />
        </div>
    );
}

function DepressionArtwork() {
    return (
        <svg
            className="mental-art"
            viewBox="0 0 620 470"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <rect
                x="38"
                y="38"
                width="460"
                height="330"
                rx="12"
                stroke="currentColor"
                strokeWidth="2"
                opacity=".18"
            />

            <path
                d="M82 318C135 247 180 260 223 207C263 158 299 150 345 188C391 226 414 184 477 113"
                stroke="currentColor"
                strokeWidth="3"
                opacity=".3"
            />

            <circle
                cx="477"
                cy="113"
                r="11"
                fill="currentColor"
                opacity=".55"
            />

            <circle
                cx="155"
                cy="162"
                r="57"
                fill="currentColor"
                opacity=".08"
            />

            <circle
                cx="155"
                cy="162"
                r="35"
                stroke="currentColor"
                strokeWidth="2"
                opacity=".35"
            />

            <path
                d="M143 154C149 147 159 147 166 154"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
            />

            <path
                d="M141 176C150 184 162 184 171 176"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
            />

            <path
                d="M340 278C340 242 368 216 403 216C438 216 466 242 466 278V329H340V278Z"
                fill="currentColor"
                opacity=".07"
            />

            <path
                d="M362 325V276C362 252 380 234 403 234C426 234 444 252 444 276V325"
                stroke="currentColor"
                strokeWidth="3"
                opacity=".45"
            />

            <path
                d="M386 272C391 266 399 266 404 272"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
            />

            <path
                d="M406 272C411 266 419 266 424 272"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
            />

            <path
                d="M389 295C399 302 411 302 421 295"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
            />

            <circle cx="105" cy="89" r="4" fill="currentColor" opacity=".5" />

            <circle cx="528" cy="252" r="6" fill="currentColor" opacity=".25" />

            <path
                d="M76 396H530"
                stroke="currentColor"
                strokeWidth="2"
                opacity=".15"
            />
        </svg>
    );
}

export default function Depression() {
    const [language, setLanguage] = useState(() => getLanguage() || "rw");
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const syncLanguage = () => {
            setLanguage(getLanguage() || "rw");
        };

        window.addEventListener(LANGUAGE_EVENT, syncLanguage);

        return () => {
            window.removeEventListener(LANGUAGE_EVENT, syncLanguage);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setShowTop(window.scrollY > 600);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        axios
            .post(route("page-views.store"), {
                page: "depression",
                url: window.location.href,
                language,
            })
            .catch((error) => {
                console.error("Page view tracking failed:", error);
            });
    }, []);

    const t = useMemo(() => {
        return content[language] || content.rw;
    }, [language]);

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <AppLayout>
            <Head title={t.metaTitle} />

            <style>{`
                :root {
                    --mental-blue: #5D89C8;
                    --mental-blue-dark: #294B78;
                    --mental-blue-deep: #17304F;
                    --mental-blue-soft: #EDF4FC;
                    --mental-ink: #182333;
                    --mental-muted: #687386;
                    --mental-border: #E4E9EF;
                    --mental-white: #FFFFFF;
                    --mental-sand: #F7F8F6;
                    --mental-yellow: #E5B83C;
                    --mental-green: #638C70;
                    --mental-radius: 18px;
                    --mental-shadow: 0 18px 50px rgba(24, 35, 51, .08);
                }

                * {
                    box-sizing: border-box;
                }

                html {
                    scroll-behavior: smooth;
                }

                body {
                    margin: 0;
                    background: #fff;
                    color: var(--mental-ink);
                }

                .depression-page {
                    overflow: hidden;
                    background: #fff;
                    font-family:
                        Inter,
                        ui-sans-serif,
                        system-ui,
                        -apple-system,
                        BlinkMacSystemFont,
                        "Segoe UI",
                        sans-serif;
                }

                .depression-page button,
                .depression-page a {
                    font-family: inherit;
                }

                .container {
                    width: min(1160px, calc(100% - 40px));
                    margin: 0 auto;
                }

                /* HERO */

                .depression-hero {
                    position: relative;
                    // min-height: 620px;
                    display: flex;
                    align-items: center;
                    isolation: isolate;
                    color: #fff;
                    background:
                        linear-gradient(
                            105deg,
                            rgba(19, 42, 70, .92) 0%,
                            rgba(34, 72, 113, .79) 52%,
                            rgba(45, 77, 107, .60) 100%
                        ),
                        url("/images/medium-shot-smiley-friends-hugging.jpg")
                        center / cover no-repeat;
                }

                .depression-hero::after {
                    content: "";
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    height: 110px;
                    background: linear-gradient(
                        to top,
                        rgba(0, 0, 0, .13),
                        transparent
                    );
                    pointer-events: none;
                    z-index: -1;
                }

                .hero-inner {
                    position: relative;
                    width: min(900px, calc(100% - 40px));
                    margin: 0 auto;
                    padding: 110px 0 90px;
                    text-align: center;
                }

                .hero-kicker {
                    display: inline-flex;
                    align-items: center;
                    gap: 11px;
                    margin-bottom: 19px;
                    font-size: 11px;
                    font-weight: 800;
                    letter-spacing: .20em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,.88);
                }

                .hero-kicker::before,
                .hero-kicker::after {
                    content: "";
                    width: 24px;
                    height: 1px;
                    background: rgba(255,255,255,.65);
                }

                .hero-title {
                    margin: 0 auto;
                    max-width: 800px;
                    font-size: clamp(38px, 5vw, 58px);
                    line-height: .98;
                    letter-spacing: -.035em;
                    font-weight: 800;
                    text-transform: uppercase;
                }

                .hero-divider {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 13px;
                    margin: 23px 0 24px;
                }

                .hero-divider::before,
                .hero-divider::after {
                    content: "";
                    display: block;
                    width: 65px;
                    height: 1px;
                    background: rgba(255,255,255,.40);
                }

                .hero-diamond {
                    width: 7px;
                    height: 7px;
                    background: var(--mental-yellow);
                    transform: rotate(45deg);
                }

                .hero-description {
                    max-width: 650px;
                    margin: 0 auto;
                    font-size: 15px;
                    line-height: 1.8;
                    color: rgba(255,255,255,.88);
                }

                .hero-actions {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 11px;
                    margin-top: 31px;
                }

                .hero-button {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    min-height: 46px;
                    padding: 0 20px;
                    border-radius: 999px;
                    text-decoration: none;
                    font-size: 12px;
                    font-weight: 750;
                    transition: .25s ease;
                }

                .hero-button-primary {
                    background: #fff;
                    color: var(--mental-blue-dark);
                }

                .hero-button-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 30px rgba(0,0,0,.15);
                }

                .hero-button-secondary {
                    border: 1px solid rgba(255,255,255,.45);
                    color: #fff;
                    background: rgba(255,255,255,.06);
                }

                .hero-button-secondary:hover {
                    background: rgba(255,255,255,.14);
                }

                .hero-scroll {
                    position: absolute;
                    bottom: 28px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 7px;
                    color: rgba(255,255,255,.65);
                    font-size: 9px;
                    font-weight: 700;
                    letter-spacing: .13em;
                    text-transform: uppercase;
                }

                .hero-scroll svg {
                    animation: floatDown 1.8s infinite ease-in-out;
                }

                @keyframes floatDown {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(5px);
                    }
                }

                /* SHARED */

                .section {
                    padding: 20px 0;
                }

                .section-soft {
                    background: #5d89c81a;
                }

                .section-blue {
                    background: var(--mental-blue-soft);
                }

                .section-label {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 16px;
                    color: var(--mental-blue);
                    font-size: 10px;
                    font-weight: 800;
                    letter-spacing: .18em;
                    text-transform: uppercase;
                }

                .label-line {
                    width: 26px;
                    height: 2px;
                    background: var(--mental-blue);
                }

                .section-title {
                    // max-width: 730px;
                    margin: 0;
                    font-size: clamp(29px, 4vw, 30px);
                    line-height: 1.07;
                    letter-spacing: -.035em;
                    font-weight: 780;
                }

                .section-lead {
                    // max-width: 720px;
                    margin: 20px 0 0;
                    color: var(--mental-muted);
                    font-size: 15px;
                    line-height: 1.85;
                    margin-bottom: 15px;
                }

                .decorative-mark {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    margin-top: 24px;
                }

                .decorative-mark span {
                    display: block;
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    background: var(--mental-blue);
                }

                .decorative-mark span:nth-child(2) {
                    width: 8px;
                    height: 8px;
                    background: var(--mental-yellow);
                }

                .decorative-mark span:nth-child(3) {
                    background: var(--mental-green);
                }

                /* INTRO */

                .intro-grid {
                    display: grid;
                    // grid-template-columns: .95fr 2.05fr;
                    // gap: 75px;
                    align-items: center;
                }

                .intro-visual {
                    position: relative;
                    min-height: 370px;
                }

                .intro-image {
                    position: absolute;
                    inset: 0 40px 35px 0;
                    overflow: hidden;
                    border-radius: 18px;
                    background:
                        url("/images/man.png")
                        center / cover no-repeat;
                }

                .intro-image::after {
                    content: "";
                    position: absolute;
                    inset: 0;
                    // background: linear-gradient(
                    //     145deg,
                    //     rgba(23,48,79,.08),
                    //     rgba(93,137,200,.25)
                    // );
                }

                .intro-accent {
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    width: 155px;
                    height: 155px;
                    border-radius: 12px;
                    background: var(--mental-blue);
                }

                .intro-card {
                    position: absolute;
                    left: 26px;
                    bottom: 55px;
                    width: 215px;
                    padding: 20px;
                    border-radius: 12px;
                    background: rgba(255,255,255,.95);
                    box-shadow: var(--mental-shadow);
                    z-index: 2;
                }

                .intro-card-icon {
                    width: 38px;
                    height: 38px;
                    display: grid;
                    place-items: center;
                    margin-bottom: 13px;
                    border-radius: 10px;
                    background: var(--mental-blue-soft);
                    color: var(--mental-blue);
                }

                .intro-card strong {
                    display: block;
                    font-size: 13px;
                    line-height: 1.4;
                }

                .intro-card span {
                    display: block;
                    margin-top: 5px;
                    color: var(--mental-muted);
                    font-size: 11px;
                    line-height: 1.5;
                }

                .intro-copy p {
                    margin: 0;
                    color: var(--mental-muted);
                    font-size: 14px;
                    line-height: 1.9;
                }

                .intro-copy p + p {
                    margin-top: 18px;
                }

                /* FACTS */

                .facts-heading {
                    display: flex;
                    align-items: end;
                    justify-content: space-between;
                    gap: 40px;
                    margin-bottom: 42px;
                }

                .facts-heading .section-title {
                    max-width: 650px;
                }

                .facts-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 16px;
                }

                .fact-card {
                    position: relative;
                    min-height: 190px;
                    padding: 27px 23px;
                    border: 1px solid var(--mental-border);
                    border-radius: 15px;
                    background: #fff;
                    box-shadow: 0 8px 25px rgba(24,35,51,.035);
                }

                .fact-card::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 23px;
                    right: 23px;
                    height: 3px;
                    border-radius: 0 0 4px 4px;
                    background: var(--mental-blue);
                }

                .fact-number {
                    margin-top: 9px;
                    color: var(--mental-blue-dark);
                    font-size: 35px;
                    line-height: 1;
                    letter-spacing: -.04em;
                    font-weight: 800;
                }

                .fact-label {
                    margin-top: 17px;
                    color: var(--mental-muted);
                    font-size: 15px;
                    line-height: 1.65;
                }

                /* RWANDA */

                .rwanda-grid {
                    display: grid;
                    // grid-template-columns: .85fr 1.15fr;
                    gap: 75px;
                    align-items: center;
                }

                .rwanda-art {
                    min-height: 430px;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--mental-blue);
                    border-radius: 20px;
                    background:
                        radial-gradient(
                            circle at 50% 40%,
                            rgba(93,137,200,.15),
                            transparent 52%
                        ),
                        #F8FAFC;
                    overflow: hidden;
                }

                .mental-art {
                    width: 100%;
                    max-width: 530px;
                }

                .rwanda-stat {
                    position: absolute;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    padding: 15px 17px;
                    border: 1px solid rgba(93,137,200,.16);
                    border-radius: 12px;
                    background: rgba(255,255,255,.92);
                    box-shadow: 0 12px 30px rgba(24,35,51,.07);
                }

                .rwanda-stat-one {
                    left: 24px;
                    top: 45px;
                }

                .rwanda-stat-two {
                    right: 22px;
                    bottom: 45px;
                }

                .rwanda-stat strong {
                    color: var(--mental-blue-dark);
                    font-size: 22px;
                }

                .rwanda-stat span {
                    color: var(--mental-muted);
                    font-size: 9px;
                    line-height: 1.4;
                    max-width: 120px;
                }

                .rwanda-copy .section-title {
                    max-width: 600px;
                }

                .rwanda-copy p {
                    color: var(--mental-muted);
                    font-size: 14px;
                    line-height: 1.9;
                }

                .rwanda-copy p + p {
                    margin-top: 17px;
                }

                .gender-stats {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                    margin-top: 28px;
                }

                .gender-stat {
                    padding: 17px;
                    border-radius: 12px;
                    background: var(--mental-blue-soft);
                }

                .gender-stat strong {
                    display: block;
                    color: var(--mental-blue-dark);
                    font-size: 25px;
                }

                .gender-stat span {
                    display: block;
                    margin-top: 5px;
                    color: var(--mental-muted);
                    font-size: 10px;
                }

                /* SYMPTOMS */

                .symptoms-layout {
                    display: grid;
                    // grid-template-columns: .85fr 1.15fr;
                    gap: 70px;
                    align-items: start;
                }

                .symptoms-intro {
                    position: sticky;
                    top: 100px;
                }

                .symptoms-list {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                }

                .symptom-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 13px;
                    min-height: 100%;
                    padding: 18px;
                    border: 1px solid var(--mental-border);
                    border-radius: 13px;
                    background: #fff;
                    transition: .22s ease;
                }

                .symptom-item:hover {
                    transform: translateY(-2px);
                    border-color: rgba(93,137,200,.35);
                    box-shadow: 0 12px 30px rgba(24,35,51,.055);
                }

                .symptom-icon {
                    flex: 0 0 auto;
                    width: 28px;
                    height: 28px;
                    display: grid;
                    place-items: center;
                    border-radius: 8px;
                    background: #E5B83C;
                    color: #5D89C8;
                }

                .symptom-item span {
                    color: #4F5B6C;
                    font-size: 15px;
                    line-height: 1.65;
                }

                /* SEVERITY */

                .severity-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: end;
                    gap: 35px;
                    // margin-bottom: 40px;
                }

                .severity-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 17px;
                }

                .severity-card {
                    padding: 30px 25px;
                    border-radius: 16px;
                    background: #fff;
                    border: 1px solid var(--mental-border);
                    box-shadow: 0 10px 30px rgba(24,35,51,.04);
                }

                .severity-icon {
                    width: 30px;
                    height: 30px;
                    display: grid;
                    place-items: center;
                    margin-bottom: 20px;
                    border-radius: 12px;
                    background: #638C70;
                    color: #638C70;
                }

                .severity-card:nth-child(2) .severity-icon {
                    background: #E5B83C;
                    color: #E5B83C;
                }

                .severity-card:nth-child(3) .severity-icon {
                    background: #c33d32;
                    color: #c33d32;
                }

                .severity-card h3 {
                    margin: 0;
                    font-size: 18px;
                }

                .severity-card p {
                    margin: 12px 0 0;
                    color: var(--mental-muted);
                    font-size: 15px;
                    line-height: 1.75;
                }

                .relapse-note {
                    display: flex;
                    align-items: flex-start;
                    gap: 13px;
                    margin-top: 20px;
                    padding: 20px;
                    border-radius: 13px;
                    background: #fff;
                    border: 1px solid var(--mental-border);
                }

                .relapse-note svg {
                    flex: 0 0 auto;
                    color: var(--mental-blue);
                }

                .relapse-note p {
                    margin: 0;
                    color: var(--mental-muted);
                    font-size: 12px;
                    line-height: 1.7;
                }

                /* CAUSES */

                .causes-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 15px;
                    margin-top: 42px;
                }

                .cause-card {
                    padding: 25px 21px;
                    border-radius: 15px;
                    background: #fff;
                    border: 1px solid var(--mental-border);
                }

                .cause-icon {
                    width: 39px;
                    height: 39px;
                    display: grid;
                    place-items: center;
                    margin-bottom: 19px;
                    border-radius: 10px;
                    color: var(--mental-blue);
                    background: var(--mental-blue-soft);
                }

                .cause-card h3 {
                    margin: 0;
                    font-size: 14px;
                    line-height: 1.35;
                }

                .cause-card p {
                    margin: 10px 0 0;
                    color: var(--mental-muted);
                    font-size: 11px;
                    line-height: 1.7;
                }

                .prevention-panel {
                    display: grid;
                    grid-template-columns: auto 1fr;
                    align-items: center;
                    gap: 23px;
                    // margin-top: 25px;
                    padding: 26px 29px;
                    border-radius: 16px;
                    color: #fff;
                    background: var(--mental-blue-dark);
                }

                .prevention-icon {
                    width: 51px;
                    height: 51px;
                    display: grid;
                    place-items: center;
                    border-radius: 14px;
                    background: rgba(255,255,255,.12);
                }

                .prevention-panel h3 {
                    margin: 0;
                    font-size: 16px;
                }

                .prevention-panel p {
                    margin: 6px 0 0;
                    color: rgba(255,255,255,.74);
                    font-size: 15px;
                    line-height: 1.65;
                }

                /* ADVICE */

                .advice-section {
                    position: relative;
                    overflow: hidden;
                    color: #fff;
                    background:
                        linear-gradient(
                            120deg,
                            #294B78 0%,
                            #5D89C8 100%
                        );
                }

                .advice-section::before {
                    content: "";
                    position: absolute;
                    width: 500px;
                    height: 500px;
                    right: -180px;
                    top: -230px;
                    border: 1px solid rgba(255,255,255,.12);
                    border-radius: 50%;
                }

                .advice-section::after {
                    content: "";
                    position: absolute;
                    width: 340px;
                    height: 340px;
                    right: -80px;
                    top: -150px;
                    border: 1px solid rgba(255,255,255,.08);
                    border-radius: 50%;
                }

                .section-label-light {
                    color: rgba(255,255,255,.82);
                }

                .section-label-light .label-line {
                    background: rgba(255,255,255,.75);
                }

                .advice-heading {
                    position: relative;
                    z-index: 1;
                    max-width: 680px;
                }

                .advice-heading .section-title {
                    color: #fff;
                }

                .advice-heading .section-lead {
                    color: rgba(255,255,255,.74);
                }

                .advice-list {
                    position: relative;
                    z-index: 1;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                    margin-top: 38px;
                }

                .advice-item {
                    display: flex;
                    gap: 14px;
                    align-items: flex-start;
                    padding: 19px;
                    border: 1px solid rgba(255,255,255,.16);
                    border-radius: 13px;
                    background: rgba(255,255,255,.08);
                    backdrop-filter: blur(8px);
                }

                // .advice-item:last-child {
                //     grid-column: span 2;
                // }

                .advice-number {
                    flex: 0 0 auto;
                    width: 29px;
                    height: 29px;
                    display: grid;
                    place-items: center;
                    border-radius: 10px;
                    background: #E5B83C;
                    font-size: 15px;
                    font-weight: 800;
                }

                .advice-item p {
                    margin: 1px 0 0;
                    color: rgba(255,255,255,.87);
                    font-size: 15px;
                    line-height: 1.7;
                }

                /* SUPPORT */

                .support-wrap {
                    max-width: 920px;
                    margin: 0 auto;
                    text-align: center;
                }

                .support-card {
                    position: relative;
                    overflow: hidden;
                    padding: 64px 45px;
                    border-radius: 21px;
                    color: #fff;
                    background:
                        linear-gradient(
                            135deg,
                            rgba(41,75,120,.98),
                            rgba(93,137,200,.98)
                        );
                    box-shadow: 0 25px 70px rgba(41,75,120,.18);
                }

                .support-card::before {
                    content: "";
                    position: absolute;
                    width: 220px;
                    height: 220px;
                    border: 1px solid rgba(255,255,255,.12);
                    border-radius: 50%;
                    right: -70px;
                    top: -90px;
                }

                .support-icon {
                    width: 54px;
                    height: 54px;
                    display: grid;
                    place-items: center;
                    margin: 0 auto 21px;
                    border-radius: 15px;
                    background: rgba(255,255,255,.13);
                }

                .support-card h2 {
                    position: relative;
                    margin: 0 auto;
                    max-width: 650px;
                    // font-size: clamp(27px, 4vw, 25px);
                    line-height: 1.08;
                    letter-spacing: -.03em;
                }

                .support-card p {
                    position: relative;
                    max-width: 620px;
                    margin: 18px auto 0;
                    color: rgba(255,255,255,.76);
                    font-size: 15px;
                    line-height: 1.8;
                }

                .support-button {
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    margin-top: 26px;
                    min-height: 45px;
                    padding: 0 20px;
                    border-radius: 999px;
                    background: #fff;
                    color: var(--mental-blue-dark);
                    text-decoration: none;
                    font-size: 11px;
                    font-weight: 800;
                    transition: .25s ease;
                }

                .support-button:hover {
                    transform: translateY(-2px);
                }

                /* SAFETY / FOOTNOTE */

                .important-box {
                    display: grid;
                    grid-template-columns: auto 1fr;
                    gap: 17px;
                    align-items: start;
                    max-width: 900px;
                    margin: 45px auto 0;
                    padding: 20px 22px;
                    border: 1px solid #E8E5D6;
                    border-radius: 13px;
                    background: #FCFBF5;
                }

                .important-icon {
                    width: 37px;
                    height: 37px;
                    display: grid;
                    place-items: center;
                    border-radius: 10px;
                    background: #F2E9BF;
                    color: #876B14;
                }

                .important-box strong {
                    display: block;
                    margin-bottom: 5px;
                    color: #5D4D16;
                    font-size: 11px;
                    letter-spacing: .08em;
                    text-transform: uppercase;
                }

                .important-box p {
                    margin: 0;
                    color: #746C53;
                    font-size: 10.5px;
                    line-height: 1.7;
                }

                .urgent-note {
                    max-width: 900px;
                    margin: 14px auto 0;
                    padding: 15px 20px;
                    border-radius: 11px;
                    background: #F9F0EF;
                    color: #7D514D;
                    font-size: 10.5px;
                    line-height: 1.7;
                }

                /* FOOTER */

                .mental-footer {
                    padding: 45px 0;
                    background: #15283E;
                    color: rgba(255,255,255,.7);
                }

                .footer-inner {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 25px;
                }

                .footer-brand {
                    display: flex;
                    align-items: center;
                    gap: 11px;
                }

                .footer-mark {
                    width: 34px;
                    height: 34px;
                    display: grid;
                    place-items: center;
                    border-radius: 9px;
                    background: rgba(255,255,255,.09);
                    color: #fff;
                }

                .footer-brand strong {
                    display: block;
                    color: #fff;
                    font-size: 12px;
                }

                .footer-brand span {
                    display: block;
                    margin-top: 3px;
                    font-size: 9px;
                    color: rgba(255,255,255,.45);
                }

                .footer-copy {
                    max-width: 460px;
                    text-align: right;
                    font-size: 9.5px;
                    line-height: 1.7;
                }

                /* TOP BUTTON */

                .back-top {
                    position: fixed;
                    z-index: 100;
                    right: 23px;
                    bottom: 23px;
                    width: 43px;
                    height: 43px;
                    display: grid;
                    place-items: center;
                    border: 0;
                    border-radius: 50%;
                    background: var(--mental-blue-dark);
                    color: #fff;
                    cursor: pointer;
                    box-shadow: 0 10px 30px rgba(24,35,51,.18);
                    transition: .25s ease;
                }

                .back-top:hover {
                    transform: translateY(-3px);
                    background: var(--mental-blue);
                }

                /* RESPONSIVE */

                @media (max-width: 980px) {
                    .intro-grid,
                    .rwanda-grid,
                    .symptoms-layout {
                        grid-template-columns: 1fr;
                        gap: 50px;
                    }

                    .facts-grid {
                        grid-template-columns: 1fr 1fr;
                    }

                    .causes-grid {
                        grid-template-columns: 1fr 1fr;
                    }

                    .symptoms-intro {
                        position: static;
                    }

                    .intro-visual {
                        min-height: 430px;
                        max-width: 620px;
                    }

                    .rwanda-art {
                        max-width: 650px;
                    }
                }

                @media (max-width: 760px) {
                    .container {
                        width: min(100% - 28px, 620px);
                    }

                    .section {
                        padding: 65px 0;
                    }

                    .depression-hero {
                        min-height: 570px;
                    }

                    .hero-inner {
                        width: min(100% - 30px, 650px);
                        padding: 105px 0 80px;
                    }

                    .hero-title {
                        font-size: 38px;
                    }

                    .hero-description {
                        font-size: 13px;
                        line-height: 1.75;
                    }

                    .hero-scroll {
                        display: none;
                    }

                    .facts-heading,
                    .severity-header {
                        display: block;
                    }

                    .facts-grid {
                        grid-template-columns: 1fr 1fr;
                    }

                    .fact-card {
                        min-height: 175px;
                    }

                    .symptoms-list {
                        grid-template-columns: 1fr;
                    }

                    .severity-grid {
                        grid-template-columns: 1fr;
                    }

                    .advice-list {
                        grid-template-columns: 1fr;
                    }

                    .advice-item:last-child {
                        grid-column: auto;
                    }

                    .footer-inner {
                        flex-direction: column;
                        align-items: flex-start;
                    }

                    .footer-copy {
                        text-align: left;
                    }
                }

                @media (max-width: 520px) {
                    .hero-title {
                        font-size: 34px;
                    }

                    .hero-divider::before,
                    .hero-divider::after {
                        width: 35px;
                    }

                    .hero-actions {
                        flex-direction: column;
                        align-items: stretch;
                        max-width: 250px;
                        margin-left: auto;
                        margin-right: auto;
                    }

                    .hero-button {
                        width: 100%;
                    }

                    .intro-visual {
                        min-height: 350px;
                    }

                    .intro-image {
                        inset: 0 25px 25px 0;
                    }

                    .intro-accent {
                        width: 100px;
                        height: 100px;
                    }

                    .intro-card {
                        left: 15px;
                        bottom: 35px;
                        width: 185px;
                        padding: 16px;
                    }

                    .facts-grid,
                    .causes-grid {
                        grid-template-columns: 1fr;
                    }

                    .gender-stats {
                        grid-template-columns: 1fr;
                    }

                    .prevention-panel {
                        grid-template-columns: 1fr;
                    }

                    .support-card {
                        padding: 45px 22px;
                    }

                    .important-box {
                        grid-template-columns: 1fr;
                    }

                    .rwanda-art {
                        min-height: 340px;
                    }

                    .rwanda-stat-one {
                        left: 10px;
                        top: 20px;
                    }

                    .rwanda-stat-two {
                        right: 10px;
                        bottom: 20px;
                    }
                }
                    p {
    margin: 12px 0 0;
    color: var(--mental-muted);
    font-size: 15px;
    line-height: 1.75;
    margin-bottom: 15px;

            `}</style>

            <div className="depression-page">
                {/* =====================================================
                    HERO
                ===================================================== */}
                <section className="depression-hero">
                    <div className="hero-inner">
                        <h1 className="hero-title">{t.heroTitle}</h1>

                        <div className="hero-divider">
                            <span className="hero-diamond" />
                        </div>

                        <p className="hero-description">{t.heroDescription}</p>
                    </div>
                </section>

                {/* =====================================================
                    INTRO
                ===================================================== */}
                <section id="overview" className="section">
                    <div className="container">
                        <div className="intro-grid">
                            {/* <div className="intro-visual">
                                <div className="intro-image" />
                            </div> */}

                            <div className="intro-copy">
                                <SectionLabel>{t.introEyebrow}</SectionLabel>

                                <h2 className="section-title">
                                    {t.introTitle}
                                </h2>

                                <DecorativeMark />

                                <p>{t.introText}</p>

                                <p>{t.introText2}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    CAUSES & PREVENTION
                ===================================================== */}
                <section className="section">
                    <div className="container">
                        <div className="prevention-panel">
                            <div className="prevention-icon">
                                <ShieldCheck size={23} />
                            </div>
                            <div>
                                <h3>{t.preventionTitle}</h3>

                                <p>{t.preventionText}</p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* =====================================================
                    RWANDA
                ===================================================== */}
                <section className="section">
                    <div className="container">
                        <div className="rwanda-grid">
                            <div className="rwanda-copy">
                                <SectionLabel>{t.rwandaEyebrow}</SectionLabel>

                                <h2 className="section-title">
                                    {t.rwandaTitle}
                                </h2>

                                <DecorativeMark />

                                <p>{t.rwandaText}</p>

                                <p>{t.rwandaText2}</p>

                                <div className="gender-stats">
                                    <div className="gender-stat">
                                        <strong>21.4%</strong>
                                        <span>
                                            {language === "rw"
                                                ? "Abagore"
                                                : language === "fr"
                                                  ? "Femmes"
                                                  : language === "nl"
                                                    ? "Vrouwen"
                                                    : "Women"}
                                        </span>
                                    </div>

                                    <div className="gender-stat">
                                        <strong>11.3%</strong>
                                        <span>
                                            {language === "rw"
                                                ? "Abagabo"
                                                : language === "fr"
                                                  ? "Hommes"
                                                  : language === "nl"
                                                    ? "Mannen"
                                                    : "Men"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                           
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    SYMPTOMS
                ===================================================== */}
                <section className="section section-soft">
                    <div className="container">
                        <div className="symptoms-layout">
                            <div className="symptoms-intro">
                                <SectionLabel>{t.symptomsEyebrow}</SectionLabel>

                                <h2 className="section-title">
                                    {t.symptomsTitle}
                                </h2>

                                <DecorativeMark />

                                <p className="section-lead">
                                    {t.symptomsIntro}
                                </p>

                                <div className="symptoms-list">
                                    {t.symptoms.map((symptom, index) => (
                                        <div
                                            className="symptom-item"
                                            key={index}
                                        >
                                            <div className="symptom-icon">
                                                <CheckCircle2 size={15} />
                                            </div>

                                            <span>{symptom}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section">
                    <div className="container">
                        <div className="prevention-panel">
                            <div>
                                <p style={{ fontWeight: 600, fontSize: 16 }}>
                                    {t.symptomsIntro2}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    SEVERITY
                ===================================================== */}
                <section className="section section-blue">
                    <div className="container">
                        <div className="severity-header">
                            <div>
                                {/* <SectionLabel>{t.severityEyebrow}</SectionLabel> */}

                                <h2 className="section-title">
                                    {t.severityTitle}
                                </h2>
                            </div>
                        </div>
                        <DecorativeMark />
                        <p>{t.relapse1}</p>

                        <div className="severity-grid">
                            {t.severity.map((item, index) => (
                                <article className="severity-card" key={index}>
                                    <div className="severity-icon">
                                        {index === 0 ? (
                                            <Activity size={20} />
                                        ) : index === 1 ? (
                                            <HeartPulse size={20} />
                                        ) : (
                                            <AlertTriangle size={20} />
                                        )}
                                    </div>

                                    <h3>{item.title}</h3>

                                    <p>{item.description}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section">
                    <div className="container">
                        <div className="prevention-panel">
                            <div>
                                <p style={{ fontWeight: 600, fontSize: 16 }}>
                                    {t.relapse2}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    CAUSES & PREVENTION
                ===================================================== */}
                <section className="section">
                    <div className="container">
                        <SectionLabel>{t.causesEyebrow}</SectionLabel>

                        <h2 className="section-title">{t.causesTitle}</h2>

<DecorativeMark />
                        <p>
                            {t.causesIntro}{" "}
                            <em>
                                (urugero: gupfusha uwo wakundaga, guhura
                                n'ibintu bihungabanya umutima, cyangwa gutakaza
                                akazi)
                            </em>
                            .
                        </p>

                        <p>{t.causesIntro2}</p>

                        <p>{t.causesIntro3}</p>

                        <div className="prevention-panel">
                            <div>
                                <h3>Kwirinda</h3>

                                <p>
                                    Agahinda gakabije gashobora gukumirwa
                                    binyuze muri gahunda cyangwa ibikorwa
                                    bitandukanye. Urugero: kwitabira inyigisho
                                    cyangwa amahugurwa yo kwiga uko wagira
                                    ubushobozi bwo gutekereza mu buryo bwiza,
                                    cyangwa gukora imyitozo ngororangingo
                                    ihoraho hagamijwe kubungabunga ubuzima bwo
                                    mu mutwe n’ubw’umubiri.{" "}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    ADVICE
                ===================================================== */}
                <section className="section advice-section">
                    <div className="container">
                        <div className="advice-heading">
                            <SectionLabel light>{t.adviceEyebrow}</SectionLabel>

                            <h2 className="section-title">{t.adviceTitle}</h2>
                        </div>
<DecorativeMark />
                        <div className="advice-list">
                            {t.advice.map((item, index) => (
                                <div className="advice-item" key={index}>
                                    <div className="advice-number">
                                        <CheckCircle2 size={15} />
                                    </div>

                                    <p>{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section section-soft">
                    <div className="container">
                        <div className="symptoms-layout">
                            <div className="symptoms-intro">
                                <SectionLabel>{t.adviceEyebrow}</SectionLabel>

                                <h2 className="section-title">
                                    {t.advice2Title}
                                </h2>

                                <DecorativeMark />

                                <p className="section-lead">{t.advice2Intro}</p>

                                <div className="symptoms-list">
                                    {t.advice2.map((advice2, index) => (
                                        <div
                                            className="symptom-item"
                                            key={index}
                                        >
                                            <div className="symptom-icon">
                                                <CheckCircle2 size={15} />
                                            </div>

                                            <span>{advice2}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    KEY FACTS
                ===================================================== */}
                <section className="section section-soft">
                    <div className="container">
                        <div className="facts-heading">
                            <div>
                                <SectionLabel>{t.factsEyebrow}</SectionLabel>
                            </div>
                        </div>

                        <div className="facts-grid">
                            {t.facts.map((fact, index) => (
                                <article className="fact-card" key={index}>
                                    <div className="fact-number">
                                        {fact.value}
                                    </div>

                                    <div className="fact-label">
                                        {fact.label}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* =====================================================
                                    SUPPORT
                                ===================================================== */}
                <section id="support" className="section">
                    <div className="container">
                        <div className="support-wrap">
                            <div className="support-card">
                                <h2>{t.supportTitle}</h2>

                                <p>{t.supportText}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    BACK TO TOP
                ===================================================== */}
                {showTop && (
                    <button
                        type="button"
                        className="back-top"
                        onClick={scrollTop}
                        aria-label={t.backTop}
                        title={t.backTop}
                    >
                        <ArrowUp size={18} />
                    </button>
                )}
            </div>
        </AppLayout>
    );
}
