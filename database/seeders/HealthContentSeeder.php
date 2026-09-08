<?php

namespace Database\Seeders;

use App\Models\HealthContent;
use Illuminate\Database\Seeder;

class HealthContentSeeder extends Seeder
{
    /**
     * Seed health content pages.
     */
    public function run(): void
    {
        HealthContent::updateOrCreate(
            ['slug' => 'depression'],
            [
                'page_title' => 'Depression',
                'is_published' => true,

                'content' => [

                    /*
                    |--------------------------------------------------------------------------
                    | KINYARWANDA
                    |--------------------------------------------------------------------------
                    */
                    'rw' => [
                        'pageTitle' => 'AGAHINDA GAKABIJE',

                        'body' => <<<'HTML'
<div>
    1. <b>Gusobanukirwa Agahinda gakabije (Depression)</b>

    <p>
        Agahinda gakabije ni imwe mu ndwara zo mu mutwe zikunze kugaragara no kwibasira abantu
        benshi kwisi. Abantu bagera kuri miliyoni 350 b'imyaka itandukanye bafite iki kibazo ku isi
        hose. Agahinda gakabije gatuma abantu benshi badashobora gukora imirimo yabo ya buri munsi
        neza, kandi ibi bikaba bibangamira ubuzima bw'abantu kurusha ibindi byose.
    </p>

    <p>
        Iyo umuntu afite agahinda gakabije, ntikagira ingaruka kuri we gusa, ahubwo gashobora no
        kugira ingaruka ku bantu ba hafi akunda, urugero nk'umuryango, inshuti, abo bigana cyangwa
        abo bakorana.
    </p>

    <p>
        Agahinda gakabije gashobora gutangira umuntu akiri muto, kandi gakunze kugaragara cyane mu
        bagore kurusha mu bagabo.
    </p>

    <p>
        <b>Ikitonderwa:</b> Iyo agahinda gakabije kageze ku rwego rukabije cyane, gashobora gutuma umuntu
        yiyahura. Buri mwaka, abantu barenga 800,000 bapfa bazize kwiyahura ku isi hose. Kwiyahura
        kandi niyo mpamvu ya kabiri y'impfu mu bantu bafite imyaka 15–29.
    </p>
</div>

<div>
    2. <b>Agahinda gakabije mu Rwanda</b>

    <p>
        Ubushakashatsi ku buzima bwo mu mutwe mu Rwanda bwo mu 2025 (Rwanda Mental Health
        Survey 2025) bwerekanye ko 9.1% by’abaturage muri rusange bafite agahinda gakabije
        (major depressive episode), mu gihe iki kigero cyageze kuri 17.8% mu barokotse Jenoside
        yakorewe Abatutsi mu 1994.
    </p>

    <p>
        Ubushakashatsi kandi bwerekanye ko agahinda gakabije kari hejuru mu bagore kurusha abagabo,
        cyane cyane mu barokotse Jenoside yakorewe Abatutsi mu 1994, aho kari kuri 21.4% mu bagore
        ugereranyije na 11.3% mu bagabo.
    </p>
</div>

<div>
    3. <b>Ibimenyetso by’agahinda gakabije</b>

    <p>
        Iyo umuntu afite agahinda gakabije, ashobora kugira ibi bimenyetso bikurikira:
    </p>

    <ol>
        <li>Kumva ubabaye cyane mu mutima cyangwa ukumva nta kintu na kimwe ushaka.</li>
        <li>Kutagira ubushake bwo gukora ibintu, ndetse n'ibyo wari usanzwe ukunda gukora.</li>
        <li>Gucika intege ku buryo udashobora gukora imirimo yawe ya buri munsi.</li>
        <li>Kwishinja icyaha cyangwa kumva nta gaciro ugifite mu buzima.</li>
        <li>Kudashobora gusinzira neza cyangwa gutakaza ubushake bwo kurya.</li>
        <li>Guhora wumva unaniwe cyane.</li>
        <li>Kudashobora gutekereza neza cyangwa kwibanda ku kintu runaka.</li>
    </ol>

    <p>
        Kuba umuntu afite agahinda gakabije bimutesha umurongo mu mibereho ye ya buri munsi.
        Urugero: bimubuza gukora akazi, kwiga iyo ari umunyeshuri, ndetse bishobora no kumubuza
        gukora uturimo tworoheje twa buri munsi, nko kwiyuhagira cyangwa kwiyitaho muri rusange.
    </p>

    <p>
        Agahinda gakabije gashobora kugaruka kenshi, cyane cyane iyo katavuwe hakiri kare,
        mu gihe kagaragaye.
    </p>
</div>

<div>
    4. <b>Ubukana bw’Agahinda Gakabije ndetse no kongera kugaruka kwako (relapse)</b>

    <p>
        Agahinda gakabije gashobora gushyirwa mu byiciro bitatu by’ubukana hagendewe ku
        bimenyetso umuntu agaragaza. Ibyo ni: Icyiciro cyoroheje (Mild), icyiciro cyiri murugero
        (Moderate), ndetse n’icyiciro gikabije (Severe).
    </p>

    <ul>
        <li>
            <b>Agahinda gakabije ko ku rwego rworoheje (Mild):</b>
            Gashobora gutuma umuntu agira ingorane mu gukora imirimo/akazi ke ka buri munsi,
            cyangwa bikabangamira imibanire ye n’umuryango cyangwa inshuti ze, ariko
            ntibihungabanya burundu imikorere ye ya buri munsi muri rusange.
        </li>

        <li>
            <b>Agahinda gakabije ko ku rwego rukabije (Severe):</b>
            Gatuma umuntu adashobora gukora imirimo ye ya buri munsi. Urugero; ntago abasha
            gukora akazi, ntago abasha kubana neza n’umuryango we ndetse n’inshuti ze muri rusange,
            cyangwa gukurikirana ibikorwa byo mu rugo nkuko bisanzwe. N’iyo ashoboye gukora,
            imikorere ye iba yaragabanutse cyane.
        </li>
    </ul>

    <p>
        Agahinda gakabije gashobora kongera kugaruka, cyane cyane iyo kadakurikiranwe kuva
        kagitangira/kakigaragara. Niyo mpamvu, kuvura agahinda gakabije kuva mu ntangiriro y’uko
        kagaragaye ari iby’ingenzi cyane.
    </p>
</div>

<div>
    5. <b>Ibitera Agahinda gakabije n’uburyo wakwirinda</b>

    <p>
        Agahinda gakabije gashobora guterwa n’ihuriro cyangwa urusobe rw’ibintu bitandukanye biba
        mu buzima bw’umuntu. Ibi bishobora kuba ihuriro riri hagati y’imibanire n’abandi, ibyiyumvo
        cyangwa se imitekerereze, ndetse n’imiterere y’umubiri w’umuntu.
    </p>

    <p>
        Niyo mpamvu abantu bahuye n’ibihe bikomeye cyangwa bibabaje mu buzima baba bafite ibyago
        byinshi byo kurwara agahinda gakabije
        <i>(urugero: gupfusha uwo wakundaga, guhura n'ibintu bihungabanya umutima,
        cyangwa gutakaza akazi)</i>.
    </p>

    <p>
        Agahinda gakabije gashobora gutera umubabaro ukomeye, bikarushaho kwangiza imiterere
        y’ubuzima, imibereho n’imikorere y’umuntu.
    </p>

    <p>
        Ibibazo by’ubuzima bw’umubiri na byo bishobora kugira uruhare mu kugaragara kw’agahinda
        gakabije.
        <i>
            Urugero: indwara y’umutima ishobora gutuma uyifite arwara agahinda gakabije,
            kandi ku rundi ruhande, ako gahinda gakabije gashobora kurushaho kuzahaza indwara
            y’umutima kubera guhangayikishwa n’iyo ndwara.
        </i>
    </p>

    <p>
        <b>Kwirinda:</b> Agahinda gakabije gashobora gukumirwa binyuze muri gahunda cyangwa ibikorwa
        bitandukanye. Urugero: kwitabira inyigisho cyangwa amahugurwa yo kwiga uko wagira
        ubushobozi bwo gutekereza mu buryo bwiza, cyangwa gukora imyitozo ngororangingo ihoraho
        hagamijwe kubungabunga ubuzima bwo mu mutwe n’ubw’umubiri.
    </p>
</div>

<div>
    6. <b>Inama z’ibyo wakora</b>

    <p><b>Inama zagufasha guhangana n’agahinda gakabije:</b></p>

    <ol>
        <li>Menya ibimenyetso by’agahinda gakabije ufite; nta mpamvu yo guterwa isoni no kuba ubifite.</li>
        <li>Kora ibikorwa ukunda, nk’imyidagaduro cyangwa ibindi bikorwa wishimira, buri gihe.</li>
        <li>Shaka abantu ushobora kuganiriza kandi mugakorana ibikorwa hamwe.</li>
        <li>Kora siporo buri gihe.</li>
    </ol>

    <p><b>Ni iki twakora kugira ngo dutsinde agahinda gakabije?</b></p>

    <ol>
        <li>
            Kugisha inama muganga, umuganga w’indwara zo mu mutwe cyangwa inzobere mu
            by’imitekerereze igihe wumva ufite ibimenyetso by’agahinda gakabije.
        </li>

        <li>
            Kwitoza kugira ubushishozi bwo gutahura kugaragara kw’agahinda gakabije (depression)
            mu muryango, mu nshuti, cyangwa mu bo muziranye, kandi ukabashishikariza gushaka
            ubufasha bakeneye.
        </li>

        <li>
            Kumva kandi ugashyigikira abantu bafite agahinda gakabije ndetse n’abantu babo ba hafi.
        </li>
    </ol>
</div>
HTML
                    ],

                    /*
                    |--------------------------------------------------------------------------
                    | ENGLISH
                    |--------------------------------------------------------------------------
                    */
                    'en' => [
                        'pageTitle' => 'DEPRESSION',

                        'body' => <<<'HTML'
<div>
    1. <b>Understanding Depression</b>

    <p>
        Depression is one of the mental health conditions that commonly affects many people
        around the world. Approximately 350 million people of different ages experience
        depression worldwide. Depression can make it difficult for many people to perform
        their everyday activities properly and can have a major impact on people's health
        and wellbeing.
    </p>

    <p>
        When a person has depression, it does not only affect them. It can also affect people
        close to them, including family members, friends, classmates or colleagues.
    </p>

    <p>
        Depression can begin at a young age and is more commonly reported among women than men.
    </p>

    <p>
        <b>Important:</b> When depression becomes very severe, it can lead to suicidal thoughts
        or suicide. Every year, more than 800,000 people die by suicide worldwide. Suicide is
        also one of the leading causes of death among people aged 15–29.
    </p>
</div>

<div>
    2. <b>Depression in Rwanda</b>

    <p>
        The 2025 Rwanda Mental Health Survey showed that 9.1% of the general population
        experienced a major depressive episode, while the rate reached 17.8% among survivors
        of the 1994 Genocide against the Tutsi.
    </p>

    <p>
        The study also showed that depression was more common among women than men, particularly
        among survivors of the 1994 Genocide against the Tutsi. Among survivors, the rate was
        21.4% among women compared with 11.3% among men.
    </p>
</div>

<div>
    3. <b>Symptoms of Depression</b>

    <p>
        A person experiencing depression may have the following symptoms:
    </p>

    <ol>
        <li>Feeling deeply sad or feeling that you do not want to do anything.</li>
        <li>Losing motivation to do things, including activities you normally enjoy.</li>
        <li>Feeling so discouraged or weak that you cannot carry out your daily activities.</li>
        <li>Feeling guilty or feeling that you no longer have value in life.</li>
        <li>Having difficulty sleeping or losing your appetite.</li>
        <li>Feeling extremely tired most of the time.</li>
        <li>Having difficulty thinking clearly or concentrating on something.</li>
    </ol>

    <p>
        Depression can disrupt a person's normal daily life. For example, it can make it
        difficult to work, study when the person is a student, or even perform simple daily
        activities such as bathing or taking care of oneself.
    </p>

    <p>
        Depression can return repeatedly, especially when it is not treated or addressed
        early after it appears.
    </p>
</div>

<div>
    4. <b>Severity of Depression and Relapse</b>

    <p>
        Depression can be classified into three levels of severity based on the symptoms
        experienced by a person: mild, moderate and severe depression.
    </p>

    <ul>
        <li>
            <b>Mild depression:</b>
            It may cause difficulties in carrying out daily activities or may affect
            relationships with family members or friends, but it does not completely disrupt
            the person's overall daily functioning.
        </li>

        <li>
            <b>Severe depression:</b>
            It can prevent a person from carrying out normal daily activities. For example,
            the person may be unable to work, may have difficulty maintaining relationships
            with family and friends, or may be unable to carry out normal household activities.
            Even when the person is able to work, their performance may be greatly reduced.
        </li>
    </ul>

    <p>
        Depression can return, especially when it is not properly followed up from the time
        it begins or is first identified. Therefore, treating depression as early as possible
        after it appears is very important.
    </p>
</div>

<div>
    5. <b>Causes of Depression and Prevention</b>

    <p>
        Depression can result from a combination or interaction of different factors in a
        person's life. These may include relationships with other people, emotions or
        thought patterns, as well as a person's physical condition.
    </p>

    <p>
        This is why people who experience difficult or painful life events may have a higher
        risk of developing depression.
        <i>
            Examples include losing someone they love, experiencing traumatic events,
            or losing employment.
        </i>
    </p>

    <p>
        Depression can cause significant emotional distress and may further affect a person's
        health, wellbeing and ability to function.
    </p>

    <p>
        Physical health problems can also contribute to the development of depression.
        <i>
            For example, heart disease may contribute to depression in someone who has it.
            At the same time, depression may make heart disease worse because of the stress
            and worry associated with the illness.
        </i>
    </p>

    <p>
        <b>Prevention:</b> Depression may be prevented through different programmes and activities.
        For example, participating in education or training that helps people develop positive
        thinking skills, or engaging in regular physical exercise to support both mental
        and physical health.
    </p>
</div>

<div>
    6. <b>Advice on What You Can Do</b>

    <p><b>Advice to help you cope with depression:</b></p>

    <ol>
        <li>
            Recognize the symptoms of depression you are experiencing. There is no reason
            to feel ashamed about having them.
        </li>

        <li>
            Regularly take part in activities you enjoy, such as recreation or other
            activities that make you happy.
        </li>

        <li>
            Find people you can talk to and spend time doing activities together.
        </li>

        <li>
            Exercise regularly.
        </li>
    </ol>

    <p><b>What can we do to overcome depression?</b></p>

    <ol>
        <li>
            Seek advice from a doctor, psychiatrist or mental health professional when
            you feel that you have symptoms of depression.
        </li>

        <li>
            Learn to recognize signs of depression among family members, friends or people
            you know, and encourage them to seek the support they need.
        </li>

        <li>
            Listen to and support people experiencing depression and their close family members
            or loved ones.
        </li>
    </ol>
</div>
HTML
                    ],

                    /*
                    |--------------------------------------------------------------------------
                    | FRENCH
                    |--------------------------------------------------------------------------
                    */
                    'fr' => [
                        'pageTitle' => 'DÉPRESSION',

                        'body' => <<<'HTML'
<div>
    1. <b>Comprendre la dépression</b>

    <p>
        La dépression est l'un des troubles de santé mentale qui touche fréquemment de nombreuses
        personnes dans le monde. Environ 350 millions de personnes de différents âges souffrent
        de dépression dans le monde. La dépression peut empêcher de nombreuses personnes
        d'accomplir correctement leurs activités quotidiennes et peut avoir un impact important
        sur leur santé et leur bien-être.
    </p>

    <p>
        Lorsqu'une personne souffre de dépression, cela ne l'affecte pas seulement elle-même.
        Cela peut également avoir des conséquences sur les personnes qui lui sont proches,
        notamment sa famille, ses amis, ses camarades de classe ou ses collègues.
    </p>

    <p>
        La dépression peut commencer à un jeune âge et elle est plus fréquemment observée
        chez les femmes que chez les hommes.
    </p>

    <p>
        <b>Important :</b> Lorsque la dépression devient très sévère, elle peut entraîner
        des pensées suicidaires ou le suicide. Chaque année, plus de 800 000 personnes meurent
        par suicide dans le monde. Le suicide constitue également une cause importante de décès
        chez les personnes âgées de 15 à 29 ans.
    </p>
</div>

<div>
    2. <b>La dépression au Rwanda</b>

    <p>
        L'Enquête rwandaise sur la santé mentale de 2025 (Rwanda Mental Health Survey 2025)
        a montré que 9,1 % de la population générale souffrait d'un épisode dépressif majeur,
        tandis que ce taux atteignait 17,8 % chez les survivants du génocide perpétré contre
        les Tutsi en 1994.
    </p>

    <p>
        L'étude a également montré que la dépression était plus fréquente chez les femmes
        que chez les hommes, particulièrement chez les survivants du génocide de 1994.
        Chez les survivants, le taux était de 21,4 % chez les femmes contre 11,3 % chez les hommes.
    </p>
</div>

<div>
    3. <b>Les symptômes de la dépression</b>

    <p>
        Une personne souffrant de dépression peut présenter les symptômes suivants :
    </p>

    <ol>
        <li>Se sentir profondément triste ou ne plus avoir envie de faire quoi que ce soit.</li>
        <li>Perdre la motivation de faire des choses, y compris les activités que l'on apprécie habituellement.</li>
        <li>Se sentir tellement découragé ou faible qu'il devient difficile d'accomplir les activités quotidiennes.</li>
        <li>Se sentir coupable ou avoir l'impression de ne plus avoir de valeur dans la vie.</li>
        <li>Avoir des difficultés à dormir ou perdre l'appétit.</li>
        <li>Se sentir extrêmement fatigué la plupart du temps.</li>
        <li>Avoir des difficultés à penser clairement ou à se concentrer sur quelque chose.</li>
    </ol>

    <p>
        La dépression peut perturber la vie quotidienne d'une personne. Par exemple, elle peut
        rendre difficile le travail, les études lorsqu'il s'agit d'un étudiant, ou même des
        activités simples comme se laver ou prendre soin de soi.
    </p>

    <p>
        La dépression peut revenir plusieurs fois, surtout lorsqu'elle n'est pas traitée ou
        prise en charge suffisamment tôt après son apparition.
    </p>
</div>

<div>
    4. <b>Gravité de la dépression et rechute</b>

    <p>
        La dépression peut être classée en trois niveaux de gravité selon les symptômes
        présentés par la personne : légère, modérée et sévère.
    </p>

    <ul>
        <li>
            <b>Dépression légère :</b>
            Elle peut entraîner des difficultés à accomplir les activités quotidiennes
            ou affecter les relations avec la famille ou les amis, mais elle ne perturbe
            pas complètement le fonctionnement quotidien général de la personne.
        </li>

        <li>
            <b>Dépression sévère :</b>
            Elle peut empêcher une personne d'accomplir ses activités quotidiennes normales.
            Par exemple, elle peut être incapable de travailler, avoir des difficultés à
            maintenir de bonnes relations avec sa famille et ses amis, ou ne plus pouvoir
            effectuer normalement les tâches ménagères. Même lorsqu'elle peut travailler,
            ses performances peuvent être fortement réduites.
        </li>
    </ul>

    <p>
        La dépression peut réapparaître, surtout lorsqu'elle n'est pas correctement suivie
        dès son apparition. C'est pourquoi il est très important de traiter la dépression
        dès les premiers signes.
    </p>
</div>

<div>
    5. <b>Causes de la dépression et prévention</b>

    <p>
        La dépression peut résulter d'une combinaison ou d'une interaction de différents
        facteurs dans la vie d'une personne. Il peut s'agir des relations avec les autres,
        des émotions ou des modes de pensée, ainsi que de l'état physique de la personne.
    </p>

    <p>
        C'est pourquoi les personnes ayant vécu des événements difficiles ou douloureux
        peuvent présenter un risque plus élevé de développer une dépression.
        <i>
            Par exemple, perdre un être cher, vivre des événements traumatisants ou perdre son emploi.
        </i>
    </p>

    <p>
        La dépression peut provoquer une souffrance émotionnelle importante et peut également
        affecter davantage la santé, le bien-être et le fonctionnement de la personne.
    </p>

    <p>
        Les problèmes de santé physique peuvent également contribuer à l'apparition de la dépression.
        <i>
            Par exemple, une maladie cardiaque peut contribuer à la dépression chez une personne
            qui en souffre. Inversement, la dépression peut aggraver une maladie cardiaque en
            raison du stress et des inquiétudes liés à cette maladie.
        </i>
    </p>

    <p>
        <b>Prévention :</b> La dépression peut être prévenue grâce à différents programmes
        et activités. Par exemple, participer à des formations ou à des activités éducatives
        permettant de développer une pensée positive, ou pratiquer régulièrement une activité
        physique afin de préserver la santé mentale et physique.
    </p>
</div>

<div>
    6. <b>Conseils sur ce que vous pouvez faire</b>

    <p><b>Conseils pour faire face à la dépression :</b></p>

    <ol>
        <li>
            Reconnaissez les symptômes de dépression que vous présentez. Il n'y a aucune
            raison d'avoir honte de les ressentir.
        </li>

        <li>
            Participez régulièrement à des activités que vous aimez, comme des loisirs
            ou d'autres activités qui vous procurent du plaisir.
        </li>

        <li>
            Cherchez des personnes avec lesquelles vous pouvez parler et avec lesquelles
            vous pouvez faire des activités.
        </li>

        <li>
            Faites régulièrement de l'exercice.
        </li>
    </ol>

    <p><b>Que pouvons-nous faire pour surmonter la dépression ?</b></p>

    <ol>
        <li>
            Demandez conseil à un médecin, à un psychiatre ou à un professionnel de la santé
            mentale lorsque vous pensez présenter des symptômes de dépression.
        </li>

        <li>
            Apprenez à reconnaître les signes de dépression chez les membres de votre famille,
            vos amis ou les personnes que vous connaissez et encouragez-les à rechercher
            l'aide dont ils ont besoin.
        </li>

        <li>
            Écoutez et soutenez les personnes souffrant de dépression ainsi que leurs proches.
        </li>
    </ol>
</div>
HTML
                    ],

                    /*
                    |--------------------------------------------------------------------------
                    | DUTCH
                    |--------------------------------------------------------------------------
                    */
                    'nl' => [
                        'pageTitle' => 'DEPRESSIE',

                        'body' => <<<'HTML'
<div>
    1. <b>Depressie begrijpen</b>

    <p>
        Depressie is een van de psychische aandoeningen die veel mensen over de hele wereld
        treft. Naar schatting ervaren ongeveer 350 miljoen mensen van verschillende leeftijden
        wereldwijd een depressie. Depressie kan het voor veel mensen moeilijk maken om hun
        dagelijkse activiteiten goed uit te voeren en kan een grote invloed hebben op hun
        gezondheid en welzijn.
    </p>

    <p>
        Wanneer iemand een depressie heeft, heeft dit niet alleen gevolgen voor die persoon.
        Het kan ook invloed hebben op mensen die dicht bij hem of haar staan, zoals familieleden,
        vrienden, klasgenoten of collega's.
    </p>

    <p>
        Depressie kan al op jonge leeftijd beginnen en komt vaker voor bij vrouwen dan bij mannen.
    </p>

    <p>
        <b>Belangrijk:</b> Wanneer een depressie zeer ernstig wordt, kan dit leiden tot
        suïcidale gedachten of zelfdoding. Elk jaar sterven wereldwijd meer dan 800.000 mensen
        door zelfdoding. Zelfdoding is ook een belangrijke doodsoorzaak onder mensen van 15 tot 29 jaar.
    </p>
</div>

<div>
    2. <b>Depressie in Rwanda</b>

    <p>
        Uit de Rwanda Mental Health Survey 2025 bleek dat 9,1% van de algemene bevolking
        een ernstige depressieve episode had doorgemaakt. Onder overlevenden van de genocide
        tegen de Tutsi in 1994 liep dit percentage op tot 17,8%.
    </p>

    <p>
        Uit het onderzoek bleek ook dat depressie vaker voorkwam bij vrouwen dan bij mannen,
        vooral onder overlevenden van de genocide van 1994. Onder de overlevenden was het
        percentage 21,4% bij vrouwen tegenover 11,3% bij mannen.
    </p>
</div>

<div>
    3. <b>Symptomen van depressie</b>

    <p>
        Iemand met een depressie kan de volgende symptomen ervaren:
    </p>

    <ol>
        <li>Diepe droefheid voelen of het gevoel hebben dat je niets meer wilt doen.</li>
        <li>De motivatie verliezen om dingen te doen, zelfs activiteiten die je normaal leuk vindt.</li>
        <li>Je zo ontmoedigd of zwak voelen dat dagelijkse activiteiten moeilijk worden.</li>
        <li>Je schuldig voelen of het gevoel hebben dat je geen waarde meer hebt in het leven.</li>
        <li>Moeite hebben met slapen of je eetlust verliezen.</li>
        <li>Je het grootste deel van de tijd extreem moe voelen.</li>
        <li>Moeite hebben om helder te denken of je op iets te concentreren.</li>
    </ol>

    <p>
        Depressie kan het normale dagelijkse leven van iemand verstoren. Het kan bijvoorbeeld
        moeilijk worden om te werken, te studeren wanneer iemand student is, of zelfs eenvoudige
        dagelijkse activiteiten uit te voeren, zoals douchen of voor zichzelf zorgen.
    </p>

    <p>
        Depressie kan meerdere keren terugkomen, vooral wanneer de aandoening niet vroegtijdig
        wordt behandeld of opgevolgd.
    </p>
</div>

<div>
    4. <b>Ernst van depressie en terugval</b>

    <p>
        Depressie kan op basis van de symptomen worden ingedeeld in drie niveaus van ernst:
        licht, matig en ernstig.
    </p>

    <ul>
        <li>
            <b>Lichte depressie:</b>
            Dit kan problemen veroorzaken bij het uitvoeren van dagelijkse activiteiten
            of invloed hebben op relaties met familie of vrienden, maar het verstoort het
            algemene dagelijkse functioneren van de persoon niet volledig.
        </li>

        <li>
            <b>Ernstige depressie:</b>
            Dit kan ervoor zorgen dat iemand normale dagelijkse activiteiten niet meer kan
            uitvoeren. De persoon kan bijvoorbeeld niet meer werken, moeite hebben om goede
            relaties met familie en vrienden te onderhouden of normale huishoudelijke taken
            niet meer uitvoeren. Zelfs wanneer werken nog mogelijk is, kunnen de prestaties
            sterk verminderd zijn.
        </li>
    </ul>

    <p>
        Depressie kan terugkomen, vooral wanneer er vanaf het begin onvoldoende opvolging
        plaatsvindt. Daarom is het zeer belangrijk om depressie zo vroeg mogelijk te behandelen.
    </p>
</div>

<div>
    5. <b>Oorzaken van depressie en preventie</b>

    <p>
        Depressie kan ontstaan door een combinatie of wisselwerking van verschillende factoren
        in het leven van een persoon. Dit kan te maken hebben met relaties met anderen,
        emoties of denkpatronen, maar ook met de lichamelijke toestand van de persoon.
    </p>

    <p>
        Daarom lopen mensen die moeilijke of pijnlijke gebeurtenissen in hun leven meemaken
        een groter risico om een depressie te ontwikkelen.
        <i>
            Voorbeelden zijn het verlies van een geliefde, traumatische gebeurtenissen
            of het verlies van werk.
        </i>
    </p>

    <p>
        Depressie kan veel emotioneel leed veroorzaken en kan ook de gezondheid, het welzijn
        en het dagelijks functioneren van iemand verder beïnvloeden.
    </p>

    <p>
        Lichamelijke gezondheidsproblemen kunnen ook bijdragen aan het ontstaan van depressie.
        <i>
            Zo kan een hartziekte bijdragen aan depressie bij iemand die eraan lijdt.
            Omgekeerd kan depressie een hartziekte verergeren door stress en zorgen over de ziekte.
        </i>
    </p>

    <p>
        <b>Preventie:</b> Depressie kan worden voorkomen door verschillende programma's en
        activiteiten. Bijvoorbeeld door deel te nemen aan trainingen of educatieve activiteiten
        die helpen om positief te leren denken, of door regelmatig lichamelijke oefeningen
        te doen om zowel de geestelijke als lichamelijke gezondheid te ondersteunen.
    </p>
</div>

<div>
    6. <b>Advies over wat je kunt doen</b>

    <p><b>Advies om met depressie om te gaan:</b></p>

    <ol>
        <li>
            Herken de symptomen van depressie die je ervaart. Je hoeft je niet te schamen
            omdat je deze symptomen hebt.
        </li>

        <li>
            Doe regelmatig activiteiten die je leuk vindt, zoals ontspanning of andere
            activiteiten waar je plezier aan beleeft.
        </li>

        <li>
            Zoek mensen met wie je kunt praten en met wie je samen activiteiten kunt ondernemen.
        </li>

        <li>
            Beweeg of sport regelmatig.
        </li>
    </ol>

    <p><b>Wat kunnen we doen om depressie te overwinnen?</b></p>

    <ol>
        <li>
            Vraag advies aan een arts, psychiater of professional in de geestelijke gezondheidszorg
            wanneer je denkt dat je symptomen van depressie hebt.
        </li>

        <li>
            Leer de tekenen van depressie te herkennen bij familieleden, vrienden of mensen
            die je kent en moedig hen aan om de hulp te zoeken die zij nodig hebben.
        </li>

        <li>
            Luister naar en steun mensen met een depressie en hun naaste familieleden of geliefden.
        </li>
    </ol>
</div>
HTML
                    ],
                ],
            ]
        );
    }
}