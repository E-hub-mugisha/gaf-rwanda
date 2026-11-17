<?php

namespace Database\Seeders;

use App\Models\Faq;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    public function run(): void
    {
        $faqs = [
            [
                'question' => 'Ubushakashatsi bwa GAF-RWANDA ni iki?',
                'answer' => '<p>Guided Act and Feel Rwanda (GAF-Rw) ni ubushakashatsi bukorerwa mu Rwanda hose, bugamije gusuzuma uburyo bwo kuvura agahinda gakabije (Depression) hifashishijwe ikoranabuhanga (interineti).</p>',
            ],
            [
                'question' => 'Ni iyihe ntego y’ubu bushakashatsi?',
                'answer' => '<p>Intego nyamukuru y’ubu bushakashatsi ni ukugerageza gahunda nshya yifashisha ikoranabuhanga (interineti) yitwa “Guided Act &amp; Feel Rwanda”, kugira ngo turebe niba ifasha mu kugabanya ibimenyetso by’agahinda gakabije ku bayikoresha.</p>',
            ],
            [
                'question' => 'Ni bande bemerewe kwitabira ubu bushakashatsi?',
                'answer' => '<p>Abemerewe kwitabira ubu bushakashatsi ni:</p>
                    <ul>
                        <li>Umuntu ufite ibimenyetso by’agahinda gakabije.</li>
                        <li>Umuntu ufite imyaka 18 kuzamura.</li>
                        <li>Umuntu uba mu Rwanda.</li>
                        <li>Umuntu uvuga Ikinyarwanda.</li>
                        <li>Umuntu ushobora gukoresha interineti.</li>
                    </ul>',
            ],
            [
                'question' => 'Nigute nakwitabira ubu bushakashatsi?',
                'answer' => '<p>Ushobora kwitabira ukanze kuri iyi link:</p>
                    <p><a href="https://redcap.rbc.gov.rw/surveys/?s=YFPCATP3JAWD3PNP" target="_blank" rel="noopener noreferrer">Iyandikishe muri ubu bushakashatsi</a></p>',
            ],
            [
                'question' => 'Ni iki kizaba nyuma yo kwemera kwitabira ubu bushakashatsi?',
                'answer' => '<p>Ubu bushakashatsi buzakorerwa kuri interineti no kuri telefone, nta nama y’imbonankubone izabaho.</p>
                    <p>Abazitabira bazabanza kugirana ikiganiro n’umushakashatsi kugira ngo abasobanurire bimwe mu bibazo byujujwe mu isuzuma ry’ibanze no kureba ko bujuje ibisabwa. Hanyuma bazashyirwa muri imwe muri gahunda ebyiri: iyoborwa n’umujyanama mu byumweru 8 cyangwa ihabwa amakuru yo kwifasha.</p>
                    <p>Bazajya kandi buzuza ibibazo kuri interineti mu bihe bitandukanye kugira ngo hakurikiranwe uko bitabira gahunda.</p>',
            ],
            [
                'question' => 'Ubushakashatsi buzamara igihe kingana gute?',
                'answer' => '<p>Uruhare rwawe muri ubu bushakashatsi ruzakomeza mu gihe cy’amezi 6 uhereye igihe utangiriye.</p>',
            ],
            [
                'question' => 'Ese hari ingaruka zishobora guterwa no kwitabira ubu bushakashatsi?',
                'answer' => '<p>Kwitabira ubu bushakashatsi nta ngaruka cyangwa ibyago bidasanzwe bishobora kuzaguteza. Gusa, ibibazo bijyanye n’ubuzima bwo mu mutwe bishobora gutuma wumva ubabaye cyangwa ubangamiwe.</p>
                    <p>Ufite uburenganzira bwo kutazasubiza ikibazo utishimiye cyangwa guhagarika kwitabira igihe icyo ari cyo cyose.</p>',
            ],
            [
                'question' => 'Ese hari inyungu zishobora guterwa no kwitabira ubu bushakashatsi?',
                'answer' => '<p>Kwitabira ubu bushakashatsi bishobora kuzagufasha kugabanya ibimenyetso by’agahinda no kunoza ubuzima bwo mu mutwe.</p>
                    <p>Uzahabwa amakuru n’inama zo kwifasha, kandi ubuzima bwawe buzakurikiranwa n’inzobere mu buzima bwo mu mutwe. Kandi abazaba badafite interineti bazafashwa kuyibona.</p>',
            ],
            [
                'question' => 'Amakuru yanjye bwite ndetse n’ibanga ryanjye bizabikwa bite?',
                'answer' => '<p>Amakuru yose atanzwe afatwa nk’ay’ibanga kandi akitabwaho mu buryo bwubahiriza uburenganzira bwa nyirayo.</p>
                    <p>Azabikwa n’Ikigo cy’Igihugu gishinzwe Ubuzima (RBC) kandi hakurikijwe Itegeko Nº 058/2021 ryo ku wa 13/10/2021 ryerekeye kurinda amakuru bwite n’imibereho bwite by’umuntu.</p>',
            ],
            [
                'question' => 'Ese nshobora kuva mu bushakashatsi nyuma yo kubwemera no kubutangira?',
                'answer' => '<p>Yego, ushobora guhitamo kwanga kwitabira, cyangwa ukaba wavamo igihe cyose ubishakiye, kandi nta nkurikizi n’imwe cyangwa igihombo bizaguteza ku burenganzira bwawe.</p>
                    <p>Mu gihe wuzuza ibibazo kuri interineti, wemerewe gusimbuka ikibazo icyo ari cyo cyose wumva udashaka gusubiza.</p>
                    <p>Ntabwo ari ngombwa gufata icyemezo cyo kwiyandikisha uyu munsi; ushobora kubanza kubitekerezaho ukabona kuzuza no kwemeza urupapuro rwo kwitabira rwo kuri interineti (e-consent) igihe wumva witeguye.</p>',
            ],
            [
                'question' => 'Ni nde nakwiyambaza mfite ibibazo, impungenge cyangwa nkeneye andi makuru yerekeye ubu bushakashatsi?',
                'answer' => '<p>Ushobora kubaza ibibazo byose wifuza, maze tugafata umwanya uhagije wo kubisubiza binyuze kuri telefone cyangwa WhatsApp.</p>
                    <p>Watwandikira kuri iyi nimero cyangwa ukaduhamagara: <a href="tel:0781684259">0781684259</a>.</p>
                    <p>Cyangwa ugakanda kuri <a href="/#contact">CONTACT US</a>.</p>',
            ],
        ];

        foreach ($faqs as $index => $faq) {
            // The FAQ text is written in Kinyarwanda.
            Faq::updateOrCreate(
                ['question_rw' => $faq['question']],
                [
                    'answer_rw' => $faq['answer'],
                    'sort_order' => $index + 1,
                    'is_active' => true,
                ]
            );
        }
    }
}