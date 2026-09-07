import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

import AdminLayout from '@/Layouts/AdminLayout';

import {
    HeartPulse,
    AlertTriangle,
    Activity,
    Brain,
    Users,
    Stethoscope,
    ShieldCheck,
    ArrowRight,
    CheckCircle2,
    MessageCircle,
    Dumbbell,
    Heart,
    Sparkles,
} from 'lucide-react';

import {
    getLanguage,
    LANGUAGE_EVENT,
} from '@/lib/language';

const content = {
    rw: {
        pageTitle: 'Agahinda Gakabije',
        eyebrow: 'UBUZIMA BWO MU MUTWE',
        title: 'AGAHINDA GAKABIJE',
        subtitle:
            'Gusobanukirwa agahinda gakabije, ibimenyetso byako, ibitera n’uburyo bwo gushaka ubufasha.',

        emergencyTitle: 'Niba wumva ushobora kwiyangiza cyangwa kwiyahura',
        emergencyText:
            'Ntugume wenyine. Vugana n’umuntu wizeye cyangwa ushake ubufasha bw’umuganga cyangwa inzobere mu buzima bwo mu mutwe ako kanya.',
        emergencyButton: 'Shaka ubufasha',

        understanding: 'Gusobanukirwa Agahinda gakabije',
        understandingLabel: '01',

        understandingText: [
            'Agahinda gakabije ni imwe mu ndwara zo mu mutwe zikunze kugaragara no kwibasira abantu benshi ku isi. Abantu bagera kuri miliyoni 350 b’imyaka itandukanye bafite iki kibazo ku isi hose.',
            'Agahinda gakabije gatuma abantu benshi badashobora gukora imirimo yabo ya buri munsi neza, kandi ibi bikaba bibangamira ubuzima bw’abantu kurusha ibindi byose.',
            'Iyo umuntu afite agahinda gakabije, ntikagira ingaruka kuri we gusa, ahubwo gashobora no kugira ingaruka ku bantu ba hafi akunda, urugero nk’umuryango, inshuti, abo bigana cyangwa abo bakorana.',
            'Agahinda gakabije gashobora gutangira umuntu akiri muto, kandi gakunze kugaragara cyane mu bagore kurusha mu bagabo.',
        ],

        warningTitle: 'Icyitonderwa',
        warningText:
            'Iyo agahinda gakabije kageze ku rwego rukabije cyane, gashobora gutuma umuntu yiyahura. Buri mwaka, abantu barenga 800,000 bapfa bazize kwiyahura ku isi hose. Kwiyahura kandi ni yo mpamvu ya kabiri y’impfu mu bantu bafite imyaka 15–29.',

        rwanda: 'Agahinda gakabije mu Rwanda',
        rwandaLabel: '02',

        rwandaText:
            'Ubushakashatsi ku buzima bwo mu mutwe mu Rwanda bwo mu 2025 (Rwanda Mental Health Survey 2025) bwerekanye ko 9.1% by’abaturage muri rusange bafite agahinda gakabije (major depressive episode), mu gihe iki kigero cyageze kuri 17.8% mu barokotse Jenoside yakorewe Abatutsi mu 1994.',

        rwandaText2:
            'Ubushakashatsi kandi bwerekanye ko agahinda gakabije kari hejuru mu bagore kurusha abagabo, cyane cyane mu barokotse Jenoside yakorewe Abatutsi mu 1994, aho kari kuri 21.4% mu bagore ugereranije na 11.3% mu bagabo.',

        population: 'Abaturage muri rusange',
        survivors: 'Abarokotse Jenoside',
        women: 'Abagore',
        men: 'Abagabo',

        symptoms: 'Ibimenyetso by’agahinda gakabije',
        symptomsLabel: '03',

        symptomsIntro:
            'Agahinda gakabije gashobora kugaragara mu buryo butandukanye. Ibi ni bimwe mu bimenyetso bikunze kugaragara:',

        symptomsList: [
            'Kumva ubabaye cyane mu mutima cyangwa ukumva nta kintu na kimwe ushaka.',
            'Kutagira ubushake bwo gukora ibintu, ndetse n’ibyo wari usanzwe ukunda gukora.',
            'Gucika intege ku buryo udashobora gukora imirimo yawe ya buri munsi.',
            'Kwishinja icyaha cyangwa kumva nta gaciro ugifite mu buzima.',
            'Kudashobora gusinzira neza cyangwa gutakaza ubushake bwo kurya.',
            'Guhora wumva unaniwe cyane.',
            'Kudashobora gutekereza neza cyangwa kwibanda ku kintu runaka.',
        ],

        impact:
            'Kuba umuntu afite agahinda gakabije bimutesha umurongo mu mibereho ye ya buri munsi. Urugero: bimubuza gukora akazi, kwiga iyo ari umunyeshuri, ndetse bishobora no kumubuza gukora uturimo tworoheje twa buri munsi, nko kwiyuhagira cyangwa kwiyitaho muri rusange.',

        recurrence:
            'Agahinda gakabije gashobora kugaruka kenshi, cyane cyane iyo katavuwe hakiri kare, mu gihe kagaragaye.',

        severity: 'Ubukana bw’agahinda gakabije',
        severityLabel: '04',

        mild: 'Gake',
        mildText:
            'Gashobora gutuma umuntu agira ikibazo mu kazi, mu mirimo ya buri munsi cyangwa mu mibanire n’abandi, ariko ntikabangamire burundu imikorere ye muri rusange.',

        moderate: 'Hagati',
        moderateText:
            'Ibimenyetso bishobora kugira ingaruka zigaragara ku mikorere ya buri munsi, ku kazi, mu ishuri no mu mibanire n’abandi.',

        severe: 'Gakomeye',
        severeText:
            'Umuntu ashobora kutabasha gukora imirimo ya buri munsi, akazi cyangwa gukomeza imibanire ye. N’iyo hari ibyo ashoboye gukora, imikorere ye ishobora kuba yaragabanutse cyane.',

        relapse: 'Kongera kugaruka kw’agahinda gakabije',
        relapseText:
            'Agahinda gakabije gashobora kugaruka cyane cyane iyo katavuwe hakiri kare. Ni yo mpamvu ari ingenzi gushaka ubufasha no gukurikiza inama z’abaganga n’inzobere mu buzima bwo mu mutwe.',

        causes: 'Ibitera Agahinda gakabije n’uburyo wakwirinda',
        causesLabel: '05',

        causesIntro:
            'Agahinda gakabije gashobora guterwa n’uruvange rw’ibintu bitandukanye kandi akenshi nta mpamvu imwe gusa iba igitera.',

        causesList: [
            'Imibanire n’abandi n’ibibazo byo mu muryango.',
            'Amarangamutima n’imitekerereze y’umuntu.',
            'Imiterere y’umubiri n’ubuzima muri rusange.',
            'Ibihe bikomeye by’ubuzima, kubura uwo ukunda cyangwa guhura n’ihungabana.',
            'Gutakaza akazi cyangwa guhura n’ibindi bibazo bikomeye by’ubuzima.',
        ],

        physicalHealth:
            'Indwara zimwe na zimwe z’umubiri zishobora kugira uruhare mu gutera cyangwa kongera agahinda gakabije. Urugero, indwara z’umutima n’agahinda gakabije bishobora kugira isano hagati yabyo.',

        prevention: 'Uburyo bwo kwirinda',
        preventionList: [
            'Gahunda z’uburezi n’amahugurwa zifasha abantu guteza imbere imitekerereze myiza.',
            'Kugira gahunda ihoraho yo gukora siporo bifasha ubuzima bwo mu mutwe no ku mubiri.',
        ],

        advice: 'Inama zibyo wakora',
        adviceLabel: '06',

        coping: 'Inama zagufasha guhangana n’agahinda gakabije',

        copingList: [
            {
                title: 'Menya ibimenyetso',
                text:
                    'Menya ibimenyetso by’agahinda gakabije kandi wumve ko nta soni biteye gusaba ubufasha.',
            },
            {
                title: 'Kora ibyo ukunda',
                text:
                    'Komeza gukora ibikorwa bishimisha cyangwa imyidagaduro ukunda buri gihe uko ubishoboye.',
            },
            {
                title: 'Vugana n’abandi',
                text:
                    'Shaka abantu ushobora kuganira na bo kandi mukore ibikorwa bitandukanye hamwe.',
            },
            {
                title: 'Kora siporo',
                text:
                    'Kora siporo buri gihe kuko ifasha umubiri n’ubuzima bwo mu mutwe.',
            },
        ],

        defeat: 'Ni iki twakora kugira ngo dutsinde agahinda gakabije?',

        defeatList: [
            'Shaka inama kwa muganga, umuganga w’indwara zo mu mutwe cyangwa inzobere mu by’imitekerereze igihe ubonye ibimenyetso.',
            'Wige kumenya ibimenyetso by’agahinda gakabije ku bo mu muryango, inshuti cyangwa abo muziranye maze ubashishikarize gushaka ubufasha.',
            'Tega amatwi kandi ushyigikire abantu bafite agahinda gakabije ndetse n’abantu babo ba hafi.',
        ],

        supportTitle: 'Nturi wenyine',
        supportText:
            'Agahinda gakabije ni ikibazo cy’ubuzima gishobora kuvurwa. Gusaba ubufasha si intege nke. Ni intambwe yo kwiyitaho no kurengera ubuzima bwawe.',

        supportButton: 'Vugana n’inzobere',

        footerNote:
            'Amakuru y’ubuzima ntabwo asimbura inama cyangwa isuzuma ry’umuganga.',
    },

    en: {
        pageTitle: 'Depression',
        eyebrow: 'MENTAL HEALTH',
        title: 'DEPRESSION',
        subtitle:
            'Understanding depression, its symptoms, causes, prevention and how to seek support.',

        emergencyTitle: 'If you feel you may hurt yourself or take your own life',
        emergencyText:
            'Do not stay alone. Talk to someone you trust or seek immediate help from a healthcare professional or mental health specialist.',
        emergencyButton: 'Get help',

        understanding: 'Understanding Depression',
        understandingLabel: '01',

        understandingText: [
            'Depression is one of the most common mental health conditions affecting people around the world. Around 350 million people of different ages experience depression worldwide.',
            'Depression can make it difficult for many people to perform their everyday activities and can significantly affect their quality of life.',
            'When a person experiences depression, it does not only affect them. It can also affect people close to them, including family members, friends, classmates and colleagues.',
            'Depression can begin at a young age and is more commonly reported among women than men.',
        ],

        warningTitle: 'Important note',
        warningText:
            'When depression becomes very severe, it can contribute to suicide. More than 800,000 people die by suicide every year worldwide. Suicide is also a leading cause of death among people aged 15–29.',

        rwanda: 'Depression in Rwanda',
        rwandaLabel: '02',

        rwandaText:
            'The 2025 Rwanda Mental Health Survey found that 9.1% of the general population experienced a major depressive episode, while the figure reached 17.8% among survivors of the 1994 Genocide against the Tutsi.',

        rwandaText2:
            'The survey also found that depression was more common among women than men, particularly among survivors of the 1994 Genocide against the Tutsi, where it was 21.4% among women compared with 11.3% among men.',

        population: 'General population',
        survivors: 'Genocide survivors',
        women: 'Women',
        men: 'Men',

        symptoms: 'Symptoms of Depression',
        symptomsLabel: '03',

        symptomsIntro:
            'Depression can appear in different ways. Some common symptoms include:',

        symptomsList: [
            'Feeling deeply sad or feeling that you do not want to do anything.',
            'Losing interest in activities, including things you normally enjoy.',
            'Feeling so weak or discouraged that you cannot perform your daily activities.',
            'Feeling guilty or believing that you no longer have value in life.',
            'Having difficulty sleeping or losing your appetite.',
            'Feeling tired or exhausted most of the time.',
            'Having difficulty thinking clearly or concentrating.',
        ],

        impact:
            'Depression can disrupt a person’s everyday life. It may interfere with work, school and even simple daily activities such as bathing or taking care of oneself.',

        recurrence:
            'Depression can return repeatedly, especially when it is not treated early after symptoms appear.',

        severity: 'Severity of Depression',
        severityLabel: '04',

        mild: 'Mild',
        mildText:
            'May cause difficulties with work, daily activities or relationships, but does not completely disrupt overall functioning.',

        moderate: 'Moderate',
        moderateText:
            'Symptoms can have a noticeable impact on everyday functioning, work, school and relationships.',

        severe: 'Severe',
        severeText:
            'A person may be unable to perform daily activities, work or maintain relationships. Even when they can do some activities, their functioning may be greatly reduced.',

        relapse: 'Recurrence',
        relapseText:
            'Depression can return, particularly when it is not treated early. Seeking support and following professional advice is therefore important.',

        causes: 'Causes and Prevention',
        causesLabel: '05',

        causesIntro:
            'Depression can result from a combination of different factors and often does not have one single cause.',

        causesList: [
            'Relationships and family difficulties.',
            'Emotions and patterns of thinking.',
            'Physical health and overall wellbeing.',
            'Stressful life events, loss or trauma.',
            'Job loss or other major life difficulties.',
        ],

        physicalHealth:
            'Some physical health conditions may contribute to depression. For example, heart disease and depression can be connected in both directions.',

        prevention: 'Prevention',
        preventionList: [
            'Education and training programs that help people develop positive thinking skills.',
            'Regular physical exercise to support mental and physical wellbeing.',
        ],

        advice: 'What You Can Do',
        adviceLabel: '06',

        coping: 'Tips for Coping with Depression',

        copingList: [
            {
                title: 'Know the symptoms',
                text:
                    'Learn about the symptoms of depression and remember that there is no shame in asking for help.',
            },
            {
                title: 'Do things you enjoy',
                text:
                    'Regularly participate in enjoyable activities or recreation whenever you are able.',
            },
            {
                title: 'Talk to others',
                text:
                    'Find people you can talk to and spend time doing activities together.',
            },
            {
                title: 'Exercise regularly',
                text:
                    'Regular physical activity can support both physical and mental wellbeing.',
            },
        ],

        defeat: 'What can we do to overcome depression?',

        defeatList: [
            'Seek advice from a doctor, psychiatrist or psychologist when you notice symptoms.',
            'Learn to recognize depression in family members, friends or people you know and encourage them to seek help.',
            'Listen to and support people experiencing depression and those close to them.',
        ],

        supportTitle: 'You are not alone',
        supportText:
            'Depression is a health condition that can be treated. Asking for help is not a weakness. It is a step toward caring for yourself and protecting your wellbeing.',

        supportButton: 'Talk to a professional',

        footerNote:
            'Health information does not replace professional medical advice or assessment.',
    },

    fr: {
        pageTitle: 'Dépression',
        eyebrow: 'SANTÉ MENTALE',
        title: 'DÉPRESSION',
        subtitle:
            'Comprendre la dépression, ses symptômes, ses causes, sa prévention et comment demander de l’aide.',

        understanding: 'Comprendre la dépression',
        understandingLabel: '01',

        understandingText: [
            'La dépression est l’un des troubles de santé mentale les plus fréquents dans le monde.',
            'Elle peut rendre difficiles les activités quotidiennes et avoir des conséquences importantes sur la qualité de vie.',
            'La dépression peut également affecter la famille, les amis, les camarades de classe et les collègues.',
            'Elle peut commencer à un jeune âge et est plus souvent observée chez les femmes que chez les hommes.',
        ],

        warningTitle: 'Important',
        warningText:
            'Lorsque la dépression devient très sévère, elle peut contribuer au risque suicidaire. Il est important de rechercher rapidement un soutien professionnel.',

        rwanda: 'La dépression au Rwanda',
        rwandaLabel: '02',

        rwandaText:
            'L’enquête rwandaise sur la santé mentale de 2025 a montré que 9,1 % de la population générale avait connu un épisode dépressif majeur, contre 17,8 % parmi les survivants du génocide perpétré contre les Tutsi en 1994.',

        rwandaText2:
            'L’enquête a également montré que la dépression était plus fréquente chez les femmes que chez les hommes.',

        symptoms: 'Symptômes de la dépression',
        symptomsLabel: '03',

        symptomsIntro:
            'La dépression peut se manifester de différentes manières.',

        symptomsList: [
            'Se sentir profondément triste ou ne plus avoir envie de rien.',
            'Perdre intérêt pour les activités habituellement appréciées.',
            'Être trop découragé pour effectuer les activités quotidiennes.',
            'Se sentir coupable ou sans valeur.',
            'Avoir des difficultés à dormir ou perdre l’appétit.',
            'Se sentir constamment fatigué.',
            'Avoir des difficultés à penser clairement ou à se concentrer.',
        ],

        impact:
            'La dépression peut perturber le travail, les études, les relations et même les activités simples de la vie quotidienne.',

        recurrence:
            'La dépression peut réapparaître, surtout lorsqu’elle n’est pas traitée rapidement.',

        severity: 'Gravité de la dépression',
        severityLabel: '04',

        mild: 'Légère',
        mildText:
            'Peut entraîner des difficultés dans le travail, les activités quotidiennes ou les relations sans perturber complètement le fonctionnement général.',

        moderate: 'Modérée',
        moderateText:
            'Les symptômes peuvent avoir un impact important sur la vie quotidienne, le travail, les études et les relations.',

        severe: 'Sévère',
        severeText:
            'La personne peut être incapable d’effectuer ses activités quotidiennes, de travailler ou de maintenir ses relations.',

        relapse: 'Récidive',
        relapseText:
            'La dépression peut revenir, particulièrement lorsqu’elle n’est pas traitée rapidement.',

        causes: 'Causes et prévention',
        causesLabel: '05',

        causesIntro:
            'La dépression peut être liée à une combinaison de plusieurs facteurs.',

        causesList: [
            'Les relations et les difficultés familiales.',
            'Les émotions et les modes de pensée.',
            'La santé physique et le bien-être général.',
            'Les événements stressants, les pertes ou les traumatismes.',
            'La perte d’emploi ou d’autres difficultés importantes.',
        ],

        physicalHealth:
            'Certaines maladies physiques peuvent contribuer à la dépression.',

        prevention: 'Prévention',
        preventionList: [
            'Les programmes d’éducation et de formation qui développent une pensée positive.',
            'L’exercice physique régulier pour soutenir la santé mentale et physique.',
        ],

        advice: 'Conseils',
        adviceLabel: '06',

        coping: 'Conseils pour faire face à la dépression',

        copingList: [
            {
                title: 'Connaître les symptômes',
                text:
                    'Apprenez à reconnaître les symptômes et rappelez-vous qu’il n’y a aucune honte à demander de l’aide.',
            },
            {
                title: 'Faire ce que vous aimez',
                text:
                    'Participez régulièrement à des activités agréables lorsque vous le pouvez.',
            },
            {
                title: 'Parler aux autres',
                text:
                    'Trouvez des personnes avec qui parler et passez du temps avec elles.',
            },
            {
                title: 'Faire de l’exercice',
                text:
                    'L’activité physique régulière peut soutenir la santé physique et mentale.',
            },
        ],

        defeat: 'Que pouvons-nous faire pour surmonter la dépression ?',

        defeatList: [
            'Demander conseil à un médecin, un psychiatre ou un psychologue.',
            'Apprendre à reconnaître la dépression chez les proches et les encourager à demander de l’aide.',
            'Écouter et soutenir les personnes qui vivent avec une dépression.',
        ],

        supportTitle: 'Vous n’êtes pas seul',
        supportText:
            'La dépression est un problème de santé qui peut être traité. Demander de l’aide est une force.',

        supportButton: 'Parler à un professionnel',

        footerNote:
            'Ces informations ne remplacent pas un avis ou une évaluation médicale professionnelle.',
    },

    nl: {
        pageTitle: 'Depressie',
        eyebrow: 'GEESTELIJKE GEZONDHEID',
        title: 'DEPRESSIE',
        subtitle:
            'Inzicht in depressie, symptomen, oorzaken, preventie en het zoeken van hulp.',

        understanding: 'Depressie begrijpen',
        understandingLabel: '01',

        understandingText: [
            'Depressie is een van de meest voorkomende psychische aandoeningen ter wereld.',
            'Depressie kan dagelijkse activiteiten moeilijk maken en een grote invloed hebben op het welzijn.',
            'Het kan ook gevolgen hebben voor familie, vrienden, klasgenoten en collega’s.',
            'Depressie kan op jonge leeftijd beginnen en komt vaker voor bij vrouwen dan bij mannen.',
        ],

        warningTitle: 'Belangrijk',
        warningText:
            'Wanneer een depressie zeer ernstig wordt, kan het risico op zelfdoding toenemen. Zoek onmiddellijk professionele hulp wanneer iemand zichzelf mogelijk kan verwonden.',

        rwanda: 'Depressie in Rwanda',
        rwandaLabel: '02',

        rwandaText:
            'De Rwanda Mental Health Survey van 2025 rapporteerde een major depressive episode bij 9,1% van de algemene bevolking en 17,8% onder overlevenden van de genocide tegen de Tutsi in 1994.',

        rwandaText2:
            'Het onderzoek liet ook zien dat depressie vaker voorkwam bij vrouwen dan bij mannen.',

        symptoms: 'Symptomen van depressie',
        symptomsLabel: '03',

        symptomsIntro:
            'Depressie kan zich op verschillende manieren uiten.',

        symptomsList: [
            'Je diep verdrietig voelen of nergens zin in hebben.',
            'Geen interesse meer hebben in activiteiten die je normaal leuk vindt.',
            'Zo weinig energie hebben dat dagelijkse activiteiten moeilijk worden.',
            'Je schuldig of waardeloos voelen.',
            'Slecht slapen of minder eetlust hebben.',
            'Je voortdurend moe voelen.',
            'Moeite hebben met denken of concentreren.',
        ],

        impact:
            'Depressie kan werk, studie, relaties en eenvoudige dagelijkse activiteiten beïnvloeden.',

        recurrence:
            'Depressie kan terugkeren, vooral wanneer deze niet vroeg wordt behandeld.',

        severity: 'Ernst van depressie',
        severityLabel: '04',

        mild: 'Mild',
        mildText:
            'Kan problemen veroorzaken in werk, dagelijkse activiteiten of relaties, zonder het functioneren volledig te verstoren.',

        moderate: 'Matig',
        moderateText:
            'De symptomen kunnen een duidelijke invloed hebben op het dagelijks functioneren.',

        severe: 'Ernstig',
        severeText:
            'Iemand kan niet meer in staat zijn om dagelijkse activiteiten, werk of relaties normaal te onderhouden.',

        relapse: 'Terugkeer',
        relapseText:
            'Depressie kan terugkomen, vooral wanneer behandeling niet vroeg wordt gestart.',

        causes: 'Oorzaken en preventie',
        causesLabel: '05',

        causesIntro:
            'Depressie kan ontstaan door een combinatie van verschillende factoren.',

        causesList: [
            'Relaties en familieproblemen.',
            'Emoties en denkpatronen.',
            'Lichamelijke gezondheid.',
            'Stressvolle gebeurtenissen, verlies of trauma.',
            'Werkverlies of andere grote levensproblemen.',
        ],

        physicalHealth:
            'Sommige lichamelijke aandoeningen kunnen bijdragen aan depressie.',

        prevention: 'Preventie',
        preventionList: [
            'Educatie en trainingen die positieve denkvaardigheden ontwikkelen.',
            'Regelmatige lichaamsbeweging voor mentale en lichamelijke gezondheid.',
        ],

        advice: 'Wat kun je doen?',
        adviceLabel: '06',

        coping: 'Tips om met depressie om te gaan',

        copingList: [
            {
                title: 'Ken de symptomen',
                text:
                    'Leer de symptomen herkennen en weet dat hulp vragen geen schande is.',
            },
            {
                title: 'Doe wat je leuk vindt',
                text:
                    'Doe regelmatig activiteiten die je plezier geven wanneer dat mogelijk is.',
            },
            {
                title: 'Praat met anderen',
                text:
                    'Zoek mensen met wie je kunt praten en activiteiten kunt ondernemen.',
            },
            {
                title: 'Beweeg regelmatig',
                text:
                    'Regelmatige lichaamsbeweging ondersteunt zowel lichamelijke als mentale gezondheid.',
            },
        ],

        defeat: 'Wat kunnen we doen om depressie te overwinnen?',

        defeatList: [
            'Vraag advies aan een arts, psychiater of psycholoog.',
            'Leer depressie herkennen bij familieleden, vrienden en kennissen en moedig hen aan hulp te zoeken.',
            'Luister naar en ondersteun mensen met depressie en hun naasten.',
        ],

        supportTitle: 'Je bent niet alleen',
        supportText:
            'Depressie is een gezondheidsprobleem dat behandeld kan worden. Hulp vragen is geen zwakte.',

        supportButton: 'Praat met een professional',

        footerNote:
            'Deze informatie vervangt geen professioneel medisch advies of onderzoek.',
    },
};

function SectionHeader({ number, eyebrow, title, description }) {
    return (
        <div className="mh-section-heading">
            <div className="mh-section-number">
                {number}
            </div>

            <div>
                <span className="mh-section-eyebrow">
                    {eyebrow}
                </span>

                <h2>{title}</h2>

                {description && (
                    <p>{description}</p>
                )}
            </div>
        </div>
    );
}

export default function Depression() {
    const [language, setLanguage] = useState(getLanguage);

    useEffect(() => {
        const handleLanguageChange = (event) => {
            setLanguage(event.detail);
        };

        window.addEventListener(
            LANGUAGE_EVENT,
            handleLanguageChange
        );

        return () => {
            window.removeEventListener(
                LANGUAGE_EVENT,
                handleLanguageChange
            );
        };
    }, []);

    const t = content[language] || content.rw;

    return (
        <AdminLayout title={t.pageTitle}>
            <Head title={t.pageTitle} />

            <div className="mental-health-page">

                {/* HERO */}
                <section className="mh-hero">

                    <div className="mh-hero-content">

                        <div className="mh-eyebrow">
                            <HeartPulse size={15} />
                            {t.eyebrow}
                        </div>

                        <h1>{t.title}</h1>

                        <p>{t.subtitle}</p>

                    </div>

                    <div className="mh-hero-art">
                        <div className="mh-orbit mh-orbit-one"></div>
                        <div className="mh-orbit mh-orbit-two"></div>

                        <div className="mh-heart">
                            <HeartPulse size={62} />
                        </div>

                        <div className="mh-floating mh-floating-one">
                            <Brain size={20} />
                        </div>

                        <div className="mh-floating mh-floating-two">
                            <Heart size={18} />
                        </div>

                        <div className="mh-floating mh-floating-three">
                            <Sparkles size={17} />
                        </div>
                    </div>

                </section>

                {/* EMERGENCY / SAFETY */}
                <section className="mh-alert">

                    <div className="mh-alert-icon">
                        <AlertTriangle size={23} />
                    </div>

                    <div className="mh-alert-content">
                        <h3>{t.emergencyTitle}</h3>
                        <p>{t.emergencyText}</p>
                    </div>

                    <a
                        href="#support"
                        className="mh-alert-button"
                    >
                        {t.emergencyButton}
                        <ArrowRight size={15} />
                    </a>

                </section>

                {/* INTRO */}
                <section className="mh-section">

                    <SectionHeader
                        number={t.understandingLabel}
                        eyebrow="01"
                        title={t.understanding}
                    />

                    <div className="mh-two-column">

                        <div className="mh-content-card mh-large-card">

                            {t.understandingText.map(
                                (paragraph, index) => (
                                    <p key={index}>
                                        {paragraph}
                                    </p>
                                )
                            )}

                        </div>

                        <div className="mh-info-card">

                            <div className="mh-info-icon">
                                <Brain size={24} />
                            </div>

                            <span>MENTAL HEALTH</span>

                            <h3>
                                Ubuzima bwo mu mutwe
                            </h3>

                            <p>
                                Gusobanukirwa ikibazo ni
                                intambwe ya mbere yo gushaka
                                ubufasha bukwiye.
                            </p>

                        </div>

                    </div>

                    <div className="mh-warning">

                        <div className="mh-warning-icon">
                            <AlertTriangle size={20} />
                        </div>

                        <div>
                            <strong>
                                {t.warningTitle}
                            </strong>

                            <p>{t.warningText}</p>
                        </div>

                    </div>

                </section>

                {/* RWANDA */}
                <section className="mh-section mh-soft-section">

                    <SectionHeader
                        number={t.rwandaLabel}
                        eyebrow="RWANDA"
                        title={t.rwanda}
                    />

                    <div className="mh-rwanda-grid">

                        <div className="mh-rwanda-main">

                            <p>{t.rwandaText}</p>

                            <p>{t.rwandaText2}</p>

                        </div>

                        <div className="mh-stat-card">
                            <span>GENERAL</span>
                            <strong>9.1%</strong>
                            <p>{t.population}</p>
                        </div>

                        <div className="mh-stat-card">
                            <span>SURVIVORS</span>
                            <strong>17.8%</strong>
                            <p>{t.survivors}</p>
                        </div>

                    </div>

                    <div className="mh-gender-grid">

                        <div className="mh-gender-card">
                            <Users size={21} />
                            <strong>21.4%</strong>
                            <span>{t.women}</span>
                        </div>

                        <div className="mh-gender-card">
                            <Users size={21} />
                            <strong>11.3%</strong>
                            <span>{t.men}</span>
                        </div>

                    </div>

                </section>

                {/* SYMPTOMS */}
                <section className="mh-section">

                    <SectionHeader
                        number={t.symptomsLabel}
                        eyebrow="RECOGNIZE"
                        title={t.symptoms}
                        description={t.symptomsIntro}
                    />

                    <div className="mh-symptoms-grid">

                        {t.symptomsList.map(
                            (symptom, index) => (
                                <div
                                    className="mh-symptom-card"
                                    key={index}
                                >
                                    <div className="mh-symptom-number">
                                        {String(index + 1).padStart(
                                            2,
                                            '0'
                                        )}
                                    </div>

                                    <CheckCircle2
                                        size={20}
                                    />

                                    <p>{symptom}</p>
                                </div>
                            )
                        )}

                    </div>

                    <div className="mh-content-card mh-impact-card">

                        <Activity size={25} />

                        <div>
                            <p>{t.impact}</p>
                            <p>{t.recurrence}</p>
                        </div>

                    </div>

                </section>

                {/* SEVERITY */}
                <section className="mh-section mh-soft-section">

                    <SectionHeader
                        number={t.severityLabel}
                        eyebrow="UNDERSTAND"
                        title={t.severity}
                    />

                    <div className="mh-severity-grid">

                        <div className="mh-severity-card">
                            <span className="mh-severity-tag">
                                01
                            </span>
                            <h3>{t.mild}</h3>
                            <p>{t.mildText}</p>
                        </div>

                        <div className="mh-severity-card">
                            <span className="mh-severity-tag">
                                02
                            </span>
                            <h3>{t.moderate}</h3>
                            <p>{t.moderateText}</p>
                        </div>

                        <div className="mh-severity-card severe">
                            <span className="mh-severity-tag">
                                03
                            </span>
                            <h3>{t.severe}</h3>
                            <p>{t.severeText}</p>
                        </div>

                    </div>

                    <div className="mh-recurrence">

                        <ShieldCheck size={24} />

                        <div>
                            <h3>{t.relapse}</h3>
                            <p>{t.relapseText}</p>
                        </div>

                    </div>

                </section>

                {/* CAUSES */}
                <section className="mh-section">

                    <SectionHeader
                        number={t.causesLabel}
                        eyebrow="PREVENTION"
                        title={t.causes}
                        description={t.causesIntro}
                    />

                    <div className="mh-causes-layout">

                        <div className="mh-causes-list">

                            {t.causesList.map(
                                (item, index) => (
                                    <div
                                        className="mh-cause-item"
                                        key={index}
                                    >
                                        <div>
                                            {index + 1}
                                        </div>

                                        <p>{item}</p>
                                    </div>
                                )
                            )}

                        </div>

                        <div className="mh-physical-card">

                            <Stethoscope size={28} />

                            <h3>
                                {t.physicalHealth}
                            </h3>

                        </div>

                    </div>

                    <div className="mh-prevention">

                        <div className="mh-prevention-heading">
                            <ShieldCheck size={22} />
                            <h3>{t.prevention}</h3>
                        </div>

                        <div className="mh-prevention-grid">

                            {t.preventionList.map(
                                (item, index) => (
                                    <div
                                        key={index}
                                        className="mh-prevention-item"
                                    >
                                        <CheckCircle2
                                            size={19}
                                        />
                                        <p>{item}</p>
                                    </div>
                                )
                            )}

                        </div>

                    </div>

                </section>

                {/* ADVICE */}
                <section className="mh-section mh-soft-section">

                    <SectionHeader
                        number={t.adviceLabel}
                        eyebrow="SUPPORT"
                        title={t.advice}
                    />

                    <h3 className="mh-subheading">
                        {t.coping}
                    </h3>

                    <div className="mh-advice-grid">

                        {t.copingList.map(
                            (item, index) => {

                                const icons = [
                                    Brain,
                                    Sparkles,
                                    MessageCircle,
                                    Dumbbell,
                                ];

                                const Icon =
                                    icons[index] || Heart;

                                return (
                                    <div
                                        className="mh-advice-card"
                                        key={index}
                                    >
                                        <div className="mh-advice-icon">
                                            <Icon size={21} />
                                        </div>

                                        <h3>
                                            {item.title}
                                        </h3>

                                        <p>
                                            {item.text}
                                        </p>
                                    </div>
                                );
                            }
                        )}

                    </div>

                    <div className="mh-defeat">

                        <div className="mh-defeat-header">
                            <HeartPulse size={24} />

                            <h3>
                                {t.defeat}
                            </h3>
                        </div>

                        <div className="mh-defeat-list">

                            {t.defeatList.map(
                                (item, index) => (
                                    <div
                                        key={index}
                                    >
                                        <span>
                                            {index + 1}
                                        </span>

                                        <p>{item}</p>
                                    </div>
                                )
                            )}

                        </div>

                    </div>

                </section>

                {/* SUPPORT CTA */}
                <section
                    className="mh-support"
                    id="support"
                >

                    <div className="mh-support-icon">
                        <HeartPulse size={32} />
                    </div>

                    <div className="mh-support-content">

                        <span>
                            MENTAL HEALTH SUPPORT
                        </span>

                        <h2>
                            {t.supportTitle}
                        </h2>

                        <p>
                            {t.supportText}
                        </p>

                    </div>

                    <a
                        href="#top"
                        className="mh-support-button"
                    >
                        {t.supportButton}
                        <ArrowRight size={16} />
                    </a>

                </section>

                <div className="mh-disclaimer">
                    {t.footerNote}
                </div>

            </div>

            <style>{`

                .mental-health-page {
                    --mh-primary: #5D89C8;
                    --mh-primary-dark: #466FA9;
                    --mh-primary-soft: #EEF4FC;

                    --mh-teal: #5CA47C;
                    --mh-teal-soft: #EDF7F1;

                    --mh-ink: #172033;
                    --mh-muted: #718096;
                    --mh-border: #E5EAF1;
                    --mh-bg: #F7F9FC;
                    --mh-white: #FFFFFF;

                    width: 100%;
                    font-family: Inter, system-ui, sans-serif;
                }

                .mh-hero {
                    position: relative;
                    min-height: 390px;
                    padding: 55px 50px;
                    overflow: hidden;
                    border-radius: 22px;
                    background:
                        linear-gradient(
                            135deg,
                            #EEF4FC 0%,
                            #F8FBFF 55%,
                            #EEF7F3 100%
                        );
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 40px;
                }

                .mh-hero-content {
                    position: relative;
                    z-index: 2;
                    max-width: 680px;
                }

                .mh-eyebrow {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 7px 11px;
                    border-radius: 30px;
                    background: rgba(93,137,200,.11);
                    color: var(--mh-primary-dark);
                    font-size: 10px;
                    font-weight: 800;
                    letter-spacing: 1.5px;
                }

                .mh-hero h1 {
                    margin: 19px 0 12px;
                    color: var(--mh-ink);
                    font-size: clamp(38px, 6vw, 68px);
                    line-height: .98;
                    letter-spacing: -3px;
                    font-weight: 850;
                }

                .mh-hero p {
                    max-width: 620px;
                    margin: 0;
                    color: #687587;
                    font-size: 15px;
                    line-height: 1.8;
                }

                .mh-hero-art {
                    position: relative;
                    width: 260px;
                    height: 260px;
                    flex-shrink: 0;
                }

                .mh-heart {
                    position: absolute;
                    inset: 70px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    background: white;
                    color: var(--mh-primary);
                    box-shadow: 0 20px 55px rgba(48,74,111,.15);
                    z-index: 3;
                }

                .mh-orbit {
                    position: absolute;
                    border: 1px solid rgba(93,137,200,.25);
                    border-radius: 50%;
                }

                .mh-orbit-one {
                    inset: 25px;
                }

                .mh-orbit-two {
                    inset: 0;
                    transform: rotate(35deg);
                }

                .mh-floating {
                    position: absolute;
                    width: 42px;
                    height: 42px;
                    border-radius: 13px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: white;
                    color: var(--mh-primary);
                    box-shadow: 0 10px 25px rgba(30,50,80,.1);
                }

                .mh-floating-one {
                    top: 8px;
                    right: 30px;
                }

                .mh-floating-two {
                    bottom: 18px;
                    left: 17px;
                    color: var(--mh-teal);
                }

                .mh-floating-three {
                    right: 0;
                    bottom: 60px;
                    color: #8D76C7;
                }

                .mh-alert {
                    margin: 22px 0 55px;
                    padding: 19px 22px;
                    border: 1px solid #F0D9D9;
                    border-radius: 15px;
                    background: #FFF9F9;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }

                .mh-alert-icon {
                    width: 42px;
                    height: 42px;
                    border-radius: 11px;
                    background: #FDEAEA;
                    color: #C45454;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .mh-alert-content {
                    flex: 1;
                }

                .mh-alert h3 {
                    margin: 0 0 4px;
                    color: #8F3F3F;
                    font-size: 12px;
                    font-weight: 800;
                }

                .mh-alert p {
                    margin: 0;
                    color: #866E6E;
                    font-size: 11px;
                    line-height: 1.6;
                }

                .mh-alert-button,
                .mh-support-button {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    padding: 11px 15px;
                    border-radius: 9px;
                    text-decoration: none;
                    background: var(--mh-primary);
                    color: white;
                    font-size: 10px;
                    font-weight: 800;
                    white-space: nowrap;
                    transition: .2s ease;
                }

                .mh-alert-button:hover,
                .mh-support-button:hover {
                    background: var(--mh-primary-dark);
                    transform: translateY(-1px);
                }

                .mh-section {
                    margin-bottom: 75px;
                }

                .mh-soft-section {
                    margin-left: -24px;
                    margin-right: -24px;
                    padding: 55px 24px;
                    background: #F8FAFD;
                    border-top: 1px solid #EDF0F4;
                    border-bottom: 1px solid #EDF0F4;
                }

                .mh-section-heading {
                    display: flex;
                    gap: 17px;
                    align-items: flex-start;
                    margin-bottom: 28px;
                }

                .mh-section-number {
                    width: 38px;
                    height: 38px;
                    border-radius: 11px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--mh-primary-soft);
                    color: var(--mh-primary);
                    font-size: 10px;
                    font-weight: 850;
                    flex-shrink: 0;
                }

                .mh-section-eyebrow {
                    display: block;
                    margin-bottom: 5px;
                    color: var(--mh-primary);
                    font-size: 8px;
                    font-weight: 850;
                    letter-spacing: 1.4px;
                }

                .mh-section-heading h2 {
                    margin: 0;
                    color: var(--mh-ink);
                    font-size: clamp(25px, 4vw, 35px);
                    line-height: 1.1;
                    letter-spacing: -1.2px;
                }

                .mh-section-heading p {
                    max-width: 700px;
                    margin: 10px 0 0;
                    color: var(--mh-muted);
                    font-size: 12px;
                    line-height: 1.7;
                }

                .mh-two-column {
                    display: grid;
                    grid-template-columns: 1.7fr .8fr;
                    gap: 18px;
                }

                .mh-content-card,
                .mh-info-card,
                .mh-rwanda-main,
                .mh-stat-card,
                .mh-symptom-card,
                .mh-severity-card,
                .mh-advice-card {
                    background: white;
                    border: 1px solid var(--mh-border);
                    border-radius: 15px;
                }

                .mh-large-card {
                    padding: 27px;
                }

                .mh-large-card p,
                .mh-rwanda-main p {
                    margin: 0 0 14px;
                    color: #667286;
                    font-size: 12px;
                    line-height: 1.85;
                }

                .mh-large-card p:last-child,
                .mh-rwanda-main p:last-child {
                    margin-bottom: 0;
                }

                .mh-info-card {
                    padding: 27px;
                    background: linear-gradient(145deg, #EEF4FC, #F7FBFF);
                }

                .mh-info-icon {
                    width: 46px;
                    height: 46px;
                    border-radius: 13px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--mh-primary);
                    background: white;
                    margin-bottom: 25px;
                }

                .mh-info-card > span {
                    color: var(--mh-primary);
                    font-size: 8px;
                    font-weight: 850;
                    letter-spacing: 1.5px;
                }

                .mh-info-card h3 {
                    margin: 8px 0;
                    font-size: 18px;
                    letter-spacing: -.4px;
                }

                .mh-info-card p {
                    color: var(--mh-muted);
                    font-size: 11px;
                    line-height: 1.7;
                }

                .mh-warning {
                    margin-top: 17px;
                    padding: 18px 20px;
                    border-radius: 14px;
                    display: flex;
                    gap: 14px;
                    background: #FFF9F0;
                    border: 1px solid #F3E5CD;
                }

                .mh-warning-icon {
                    color: #C78B3A;
                    flex-shrink: 0;
                }

                .mh-warning strong {
                    color: #7E613B;
                    font-size: 11px;
                }

                .mh-warning p {
                    margin: 5px 0 0;
                    color: #8D7960;
                    font-size: 10.5px;
                    line-height: 1.7;
                }

                .mh-rwanda-grid {
                    display: grid;
                    grid-template-columns: 1.6fr .7fr .7fr;
                    gap: 15px;
                }

                .mh-rwanda-main {
                    padding: 25px;
                }

                .mh-stat-card {
                    padding: 25px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    background: white;
                }

                .mh-stat-card span {
                    color: #98A2B0;
                    font-size: 8px;
                    font-weight: 850;
                    letter-spacing: 1px;
                }

                .mh-stat-card strong {
                    margin: 6px 0;
                    color: var(--mh-primary);
                    font-size: 34px;
                    letter-spacing: -1px;
                }

                .mh-stat-card p {
                    margin: 0;
                    color: var(--mh-muted);
                    font-size: 9px;
                }

                .mh-gender-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 15px;
                    margin-top: 15px;
                }

                .mh-gender-card {
                    padding: 18px;
                    border-radius: 13px;
                    background: var(--mh-teal-soft);
                    display: flex;
                    align-items: center;
                    gap: 11px;
                    color: var(--mh-teal);
                }

                .mh-gender-card strong {
                    font-size: 21px;
                    color: #357B58;
                }

                .mh-gender-card span {
                    font-size: 10px;
                    color: #628471;
                }

                .mh-symptoms-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 12px;
                }

                .mh-symptom-card {
                    padding: 19px;
                    display: grid;
                    grid-template-columns: auto 20px 1fr;
                    align-items: center;
                    gap: 12px;
                }

                .mh-symptom-number {
                    color: #AAB3BF;
                    font-size: 10px;
                    font-weight: 800;
                }

                .mh-symptom-card > svg {
                    color: var(--mh-primary);
                }

                .mh-symptom-card p {
                    margin: 0;
                    color: #647083;
                    font-size: 10.5px;
                    line-height: 1.65;
                }

                .mh-impact-card {
                    margin-top: 17px;
                    padding: 21px;
                    display: flex;
                    gap: 15px;
                    color: var(--mh-primary);
                }

                .mh-impact-card p {
                    margin: 0 0 8px;
                    color: var(--mh-muted);
                    font-size: 10.5px;
                    line-height: 1.7;
                }

                .mh-impact-card p:last-child {
                    margin-bottom: 0;
                }

                .mh-severity-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 15px;
                }

                .mh-severity-card {
                    padding: 24px;
                    position: relative;
                    overflow: hidden;
                }

                .mh-severity-card.severe {
                    background: #FFF9F9;
                    border-color: #F0D9D9;
                }

                .mh-severity-tag {
                    display: inline-flex;
                    width: 27px;
                    height: 27px;
                    border-radius: 8px;
                    align-items: center;
                    justify-content: center;
                    background: var(--mh-primary-soft);
                    color: var(--mh-primary);
                    font-size: 8px;
                    font-weight: 850;
                }

                .mh-severity-card h3 {
                    margin: 20px 0 7px;
                    font-size: 16px;
                }

                .mh-severity-card p {
                    margin: 0;
                    color: var(--mh-muted);
                    font-size: 10.5px;
                    line-height: 1.7;
                }

                .mh-recurrence {
                    margin-top: 16px;
                    padding: 20px;
                    border-radius: 14px;
                    background: var(--mh-primary-soft);
                    display: flex;
                    gap: 14px;
                    color: var(--mh-primary);
                }

                .mh-recurrence h3 {
                    margin: 0 0 5px;
                    color: var(--mh-ink);
                    font-size: 12px;
                }

                .mh-recurrence p {
                    margin: 0;
                    color: var(--mh-muted);
                    font-size: 10.5px;
                    line-height: 1.7;
                }

                .mh-causes-layout {
                    display: grid;
                    grid-template-columns: 1.3fr .7fr;
                    gap: 18px;
                }

                .mh-causes-list {
                    display: flex;
                    flex-direction: column;
                    gap: 9px;
                }

                .mh-cause-item {
                    padding: 13px;
                    border: 1px solid var(--mh-border);
                    border-radius: 11px;
                    background: white;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .mh-cause-item > div {
                    width: 27px;
                    height: 27px;
                    border-radius: 8px;
                    background: var(--mh-primary-soft);
                    color: var(--mh-primary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 9px;
                    font-weight: 850;
                    flex-shrink: 0;
                }

                .mh-cause-item p {
                    margin: 0;
                    color: #687587;
                    font-size: 10.5px;
                }

                .mh-physical-card {
                    padding: 27px;
                    border-radius: 15px;
                    background: linear-gradient(145deg, #F0F7F3, #FAFCFB);
                    color: var(--mh-teal);
                }

                .mh-physical-card h3 {
                    margin: 25px 0 0;
                    color: #3F6652;
                    font-size: 15px;
                    line-height: 1.6;
                }

                .mh-prevention {
                    margin-top: 17px;
                    padding: 23px;
                    border-radius: 15px;
                    background: var(--mh-teal-soft);
                }

                .mh-prevention-heading {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: var(--mh-teal);
                }

                .mh-prevention-heading h3 {
                    margin: 0;
                    color: #416952;
                    font-size: 13px;
                }

                .mh-prevention-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 12px;
                    margin-top: 17px;
                }

                .mh-prevention-item {
                    display: flex;
                    gap: 9px;
                    align-items: flex-start;
                }

                .mh-prevention-item svg {
                    color: var(--mh-teal);
                    flex-shrink: 0;
                }

                .mh-prevention-item p {
                    margin: 0;
                    color: #637C6C;
                    font-size: 10px;
                    line-height: 1.6;
                }

                .mh-subheading {
                    margin: 0 0 17px;
                    color: var(--mh-ink);
                    font-size: 17px;
                }

                .mh-advice-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 13px;
                }

                .mh-advice-card {
                    padding: 21px;
                }

                .mh-advice-icon {
                    width: 39px;
                    height: 39px;
                    border-radius: 11px;
                    background: var(--mh-primary-soft);
                    color: var(--mh-primary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .mh-advice-card h3 {
                    margin: 18px 0 7px;
                    color: var(--mh-ink);
                    font-size: 12px;
                }

                .mh-advice-card p {
                    margin: 0;
                    color: var(--mh-muted);
                    font-size: 10px;
                    line-height: 1.7;
                }

                .mh-defeat {
                    margin-top: 17px;
                    padding: 25px;
                    border-radius: 15px;
                    background: white;
                    border: 1px solid var(--mh-border);
                }

                .mh-defeat-header {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: var(--mh-primary);
                }

                .mh-defeat-header h3 {
                    margin: 0;
                    color: var(--mh-ink);
                    font-size: 15px;
                }

                .mh-defeat-list {
                    margin-top: 20px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .mh-defeat-list > div {
                    display: flex;
                    gap: 12px;
                    align-items: flex-start;
                }

                .mh-defeat-list span {
                    width: 25px;
                    height: 25px;
                    border-radius: 7px;
                    background: var(--mh-primary-soft);
                    color: var(--mh-primary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 8px;
                    font-weight: 850;
                    flex-shrink: 0;
                }

                .mh-defeat-list p {
                    margin: 2px 0 0;
                    color: var(--mh-muted);
                    font-size: 10.5px;
                    line-height: 1.65;
                }

                .mh-support {
                    margin-top: 10px;
                    padding: 30px;
                    border-radius: 18px;
                    background:
                        linear-gradient(
                            135deg,
                            #466FA9,
                            #5D89C8
                        );
                    color: white;
                    display: flex;
                    align-items: center;
                    gap: 18px;
                }

                .mh-support-icon {
                    width: 58px;
                    height: 58px;
                    border-radius: 16px;
                    background: rgba(255,255,255,.14);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .mh-support-content {
                    flex: 1;
                }

                .mh-support-content > span {
                    font-size: 8px;
                    letter-spacing: 1.3px;
                    font-weight: 850;
                    opacity: .7;
                }

                .mh-support-content h2 {
                    margin: 5px 0;
                    font-size: 23px;
                    letter-spacing: -.7px;
                }

                .mh-support-content p {
                    max-width: 680px;
                    margin: 0;
                    font-size: 10.5px;
                    line-height: 1.7;
                    opacity: .85;
                }

                .mh-support-button {
                    background: white;
                    color: var(--mh-primary-dark);
                }

                .mh-support-button:hover {
                    background: #F5F8FC;
                }

                .mh-disclaimer {
                    padding: 20px 0 5px;
                    text-align: center;
                    color: #A0A9B5;
                    font-size: 9px;
                }

                @media (max-width: 900px) {

                    .mh-hero {
                        padding: 40px 30px;
                    }

                    .mh-hero-art {
                        width: 200px;
                        height: 200px;
                    }

                    .mh-heart {
                        inset: 55px;
                    }

                    .mh-two-column,
                    .mh-rwanda-grid,
                    .mh-causes-layout {
                        grid-template-columns: 1fr;
                    }

                    .mh-advice-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }

                }

                @media (max-width: 650px) {

                    .mh-hero {
                        min-height: auto;
                        padding: 35px 22px;
                    }

                    .mh-hero-art {
                        display: none;
                    }

                    .mh-hero h1 {
                        font-size: 44px;
                    }

                    .mh-alert {
                        align-items: flex-start;
                        flex-wrap: wrap;
                    }

                    .mh-alert-button {
                        margin-left: 57px;
                    }

                    .mh-symptoms-grid,
                    .mh-severity-grid,
                    .mh-prevention-grid,
                    .mh-advice-grid {
                        grid-template-columns: 1fr;
                    }

                    .mh-soft-section {
                        margin-left: -16px;
                        margin-right: -16px;
                        padding-left: 16px;
                        padding-right: 16px;
                    }

                    .mh-support {
                        flex-direction: column;
                        align-items: flex-start;
                    }

                    .mh-support-button {
                        width: 100%;
                        justify-content: center;
                    }

                }

            `}</style>
        </AdminLayout>
    );
}