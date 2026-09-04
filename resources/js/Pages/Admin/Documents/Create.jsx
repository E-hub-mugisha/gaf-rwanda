import { useEffect, useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    UploadCloud,
    FileText,
    CheckCircle2,
    Languages,
    Info,
    X,
} from 'lucide-react';

import { getLanguage, LANGUAGE_EVENT } from '@/lib/language';

// These are the document upload languages (which PDF versions can be
// attached), unrelated to the admin UI language selected in the header.
const LANGUAGES = [
    {
        code: 'en',
        label: 'English',
        short: 'EN',
        description: 'English version',
    },
    {
        code: 'es',
        label: 'Spanish',
        short: 'ES',
        description: 'Spanish version',
    },
    {
        code: 'rw',
        label: 'Kinyarwanda',
        short: 'RW',
        description: 'Kinyarwanda version',
    },
];

const translations = {
    rw: {
        uploadDocument: 'Shyiraho Inyandiko',
        pageDescription:
            'Ongeramo inyandiko nshya washyireho verisiyo z’indimi ziboneka.',

        fixErrors: 'Nyamuneka kosora ibi bibazo',

        documentDetails: 'Ibisobanuro by’Inyandiko',
        documentDetailsDescription: 'Amakuru y’ibanze ku nyandiko.',

        documentTitle: 'Umutwe w’Inyandiko',
        titlePlaceholder: 'urugero: Raporo y’Ubuzima Buri Mwaka 2026',
        titleHint:
            'Koresha umutwe usobanutse kandi wumvikana neza ku basoma.',

        description: 'Ibisobanuro',
        optional: 'Ntibisabwa',
        descriptionPlaceholder:
            'Sobanura muri make ibiri muri iyi nyandiko...',
        descriptionHint:
            'Ibisobanuro bigufi bifasha abasoma gusobanukirwa inyandiko mbere yo kuyifungura.',

        languageVersions: 'Verisiyo z’Indimi',
        languageVersionsDescription:
            'Shyiraho PDF iboneka kuri buri rurimi.',
        languageInfo:
            'Shyiraho nibura verisiyo imwe ya PDF. Verisiyo z’indimi zindi zishobora kongerwaho cyangwa gusimburwa nyuma.',

        choosePdfFile: 'Hitamo dosiye ya PDF',
        pdfOnly: 'PDF gusa',
        removeFile: 'Kuraho dosiye',

        readyToUpload: 'Witeguye gushyiraho?',
        reviewInformation:
            'Reba amakuru yawe mbere yo kohereza.',

        checkTitleProvided: 'Umutwe w’inyandiko watanzwe',
        checkOnePdfRequired: 'Nibura PDF imwe irasabwa',
        checkLanguagesSupported: 'Verisiyo z’indimi zemewe',

        uploading: 'Birimo gushyirwaho...',
        cancel: 'Hagarika',

        guidelines: 'Amabwiriza yo gushyiraho',
        guidelinePdfFormat: 'Amadosiye agomba kuba muri PDF.',
        guidelineOneLanguage: 'Shyiraho nibura verisiyo imwe y’ururimi.',
        guidelineMeaningfulTitle: 'Koresha imitwe y’inyandiko isobanutse.',
        guidelineAddLater: 'Ushobora kongeraho izindi ndimi nyuma.',
    },

    en: {
        uploadDocument: 'Upload Document',
        pageDescription:
            'Add a new document and provide its available language versions.',

        fixErrors: 'Please fix the following errors',

        documentDetails: 'Document Details',
        documentDetailsDescription: 'Basic information about the document.',

        documentTitle: 'Document Title',
        titlePlaceholder: 'e.g. Annual Health Report 2026',
        titleHint:
            'Use a clear and descriptive title that readers can easily recognize.',

        description: 'Description',
        optional: 'Optional',
        descriptionPlaceholder:
            'Briefly describe what this document contains...',
        descriptionHint:
            'A short description helps readers understand the document before opening it.',

        languageVersions: 'Language Versions',
        languageVersionsDescription:
            'Upload the PDF available for each language.',
        languageInfo:
            'Upload at least one PDF version. Additional language versions can be added or replaced later.',

        choosePdfFile: 'Choose PDF file',
        pdfOnly: 'PDF only',
        removeFile: 'Remove file',

        readyToUpload: 'Ready to upload?',
        reviewInformation: 'Review your information before submitting.',

        checkTitleProvided: 'Document title provided',
        checkOnePdfRequired: 'At least one PDF required',
        checkLanguagesSupported: 'Language versions supported',

        uploading: 'Uploading...',
        cancel: 'Cancel',

        guidelines: 'Upload guidelines',
        guidelinePdfFormat: 'Files must be in PDF format.',
        guidelineOneLanguage: 'Upload at least one language version.',
        guidelineMeaningfulTitle: 'Use meaningful document titles.',
        guidelineAddLater: 'You can add more languages later.',
    },

    fr: {
        uploadDocument: 'Télécharger un document',
        pageDescription:
            'Ajoutez un nouveau document et fournissez ses versions linguistiques disponibles.',

        fixErrors: 'Veuillez corriger les erreurs suivantes',

        documentDetails: 'Détails du document',
        documentDetailsDescription:
            'Informations de base sur le document.',

        documentTitle: 'Titre du document',
        titlePlaceholder: 'ex. Rapport de santé annuel 2026',
        titleHint:
            'Utilisez un titre clair et descriptif que les lecteurs peuvent facilement reconnaître.',

        description: 'Description',
        optional: 'Facultatif',
        descriptionPlaceholder:
            'Décrivez brièvement le contenu de ce document...',
        descriptionHint:
            'Une courte description aide les lecteurs à comprendre le document avant de l’ouvrir.',

        languageVersions: 'Versions linguistiques',
        languageVersionsDescription:
            'Téléchargez le PDF disponible pour chaque langue.',
        languageInfo:
            'Téléchargez au moins une version PDF. D’autres versions linguistiques peuvent être ajoutées ou remplacées ultérieurement.',

        choosePdfFile: 'Choisir un fichier PDF',
        pdfOnly: 'PDF uniquement',
        removeFile: 'Supprimer le fichier',

        readyToUpload: 'Prêt à télécharger ?',
        reviewInformation: 'Vérifiez vos informations avant de soumettre.',

        checkTitleProvided: 'Titre du document fourni',
        checkOnePdfRequired: 'Au moins un PDF requis',
        checkLanguagesSupported: 'Versions linguistiques prises en charge',

        uploading: 'Téléchargement...',
        cancel: 'Annuler',

        guidelines: 'Consignes de téléchargement',
        guidelinePdfFormat: 'Les fichiers doivent être au format PDF.',
        guidelineOneLanguage:
            'Téléchargez au moins une version linguistique.',
        guidelineMeaningfulTitle:
            'Utilisez des titres de document pertinents.',
        guidelineAddLater:
            'Vous pouvez ajouter d’autres langues ultérieurement.',
    },

    nl: {
        uploadDocument: 'Document uploaden',
        pageDescription:
            'Voeg een nieuw document toe en geef de beschikbare taalversies op.',

        fixErrors: 'Los de volgende fouten op',

        documentDetails: 'Documentgegevens',
        documentDetailsDescription: 'Basisinformatie over het document.',

        documentTitle: 'Documenttitel',
        titlePlaceholder: 'bijv. Jaarlijks gezondheidsrapport 2026',
        titleHint:
            'Gebruik een duidelijke en beschrijvende titel die lezers gemakkelijk herkennen.',

        description: 'Beschrijving',
        optional: 'Optioneel',
        descriptionPlaceholder:
            'Beschrijf kort wat dit document bevat...',
        descriptionHint:
            'Een korte beschrijving helpt lezers het document te begrijpen voordat ze het openen.',

        languageVersions: 'Taalversies',
        languageVersionsDescription:
            'Upload de beschikbare PDF voor elke taal.',
        languageInfo:
            'Upload minstens één PDF-versie. Extra taalversies kunnen later worden toegevoegd of vervangen.',

        choosePdfFile: 'Kies PDF-bestand',
        pdfOnly: 'Alleen PDF',
        removeFile: 'Bestand verwijderen',

        readyToUpload: 'Klaar om te uploaden?',
        reviewInformation: 'Controleer uw gegevens voordat u indient.',

        checkTitleProvided: 'Documenttitel opgegeven',
        checkOnePdfRequired: 'Minstens één PDF vereist',
        checkLanguagesSupported: 'Taalversies ondersteund',

        uploading: 'Uploaden...',
        cancel: 'Annuleren',

        guidelines: 'Uploadrichtlijnen',
        guidelinePdfFormat: 'Bestanden moeten in PDF-formaat zijn.',
        guidelineOneLanguage: 'Upload minstens één taalversie.',
        guidelineMeaningfulTitle: 'Gebruik betekenisvolle documenttitels.',
        guidelineAddLater: 'U kunt later meer talen toevoegen.',
    },
};

export default function Create() {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        title: '',
        description: '',
        file_en: null,
        file_es: null,
        file_rw: null,
    });

    const [selectedFiles, setSelectedFiles] = useState({
        en: null,
        es: null,
        rw: null,
    });

    /*
    |--------------------------------------------------------------------------
    | Language
    |--------------------------------------------------------------------------
    | Reads the shared UI language on mount and subscribes to the
    | "gaf-language-change" window event (see resources/js/lib/language.js)
    | so switching languages from AdminLayout's header dropdown updates this
    | page immediately too. Unrelated to the LANGUAGES array above, which
    | lists the document versions that can be uploaded.
    */

    const [language, setLanguage] = useState(getLanguage);

    const t = translations[language] || translations.en;

    useEffect(() => {
        const handleLanguageChange = (event) => {
            setLanguage(event.detail);
        };

        window.addEventListener(LANGUAGE_EVENT, handleLanguageChange);

        return () => {
            window.removeEventListener(LANGUAGE_EVENT, handleLanguageChange);
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('admin.documents.store'), {
            forceFormData: true,
        });
    };

    const handleFileChange = (code, file) => {
        setData(`file_${code}`, file || null);

        setSelectedFiles((prev) => ({
            ...prev,
            [code]: file || null,
        }));
    };

    const removeFile = (code) => {
        setData(`file_${code}`, null);

        setSelectedFiles((prev) => ({
            ...prev,
            [code]: null,
        }));
    };

    const formatFileSize = (bytes) => {
        if (!bytes) return '';

        if (bytes < 1024 * 1024) {
            return `${(bytes / 1024).toFixed(1)} KB`;
        }

        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    return (
        <AdminLayout title={t.uploadDocument}>
            <div className="upload-page">

                {/* ================= HEADER ================= */}

                <div className="page-header">
                    <div className="header-left">
                        <Link
                            href={route('admin.documents.index')}
                            className="back-button"
                        >
                            <ArrowLeft size={17} />
                        </Link>

                        <div>
                            <h1>{t.uploadDocument}</h1>
                            <p>{t.pageDescription}</p>
                        </div>
                    </div>
                </div>

                {/* ================= ERRORS ================= */}

                {Object.keys(errors).length > 0 && (
                    <div className="error-alert">
                        <div className="error-alert-icon">
                            !
                        </div>

                        <div>
                            <strong>
                                {t.fixErrors}
                            </strong>

                            <ul>
                                {Object.values(errors).map((msg, index) => (
                                    <li key={index}>{msg}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* ================= FORM ================= */}

                <form onSubmit={submit}>

                    <div className="content-grid">

                        {/* ================= LEFT COLUMN ================= */}

                        <div className="main-column">

                            {/* DOCUMENT DETAILS */}

                            <div className="form-card">
                                <div className="card-heading">
                                    <div className="heading-icon blue">
                                        <FileText size={19} />
                                    </div>

                                    <div>
                                        <h2>{t.documentDetails}</h2>
                                        <p>
                                            {t.documentDetailsDescription}
                                        </p>
                                    </div>
                                </div>

                                <div className="form-body">

                                    {/* TITLE */}

                                    <div className="form-group">
                                        <label htmlFor="title">
                                            {t.documentTitle}
                                            <span>*</span>
                                        </label>

                                        <input
                                            type="text"
                                            id="title"
                                            placeholder={t.titlePlaceholder}
                                            required
                                            value={data.title}
                                            onChange={(e) =>
                                                setData(
                                                    'title',
                                                    e.target.value
                                                )
                                            }
                                            className={
                                                errors.title
                                                    ? 'input-error'
                                                    : ''
                                            }
                                        />

                                        {errors.title && (
                                            <small className="field-error">
                                                {errors.title}
                                            </small>
                                        )}

                                        <small className="field-hint">
                                            {t.titleHint}
                                        </small>
                                    </div>

                                    {/* DESCRIPTION */}

                                    <div className="form-group">
                                        <label htmlFor="description">
                                            {t.description}
                                            <span className="optional">
                                                {t.optional}
                                            </span>
                                        </label>

                                        <textarea
                                            id="description"
                                            rows={5}
                                            placeholder={
                                                t.descriptionPlaceholder
                                            }
                                            value={data.description}
                                            onChange={(e) =>
                                                setData(
                                                    'description',
                                                    e.target.value
                                                )
                                            }
                                            className={
                                                errors.description
                                                    ? 'input-error'
                                                    : ''
                                            }
                                        />

                                        {errors.description && (
                                            <small className="field-error">
                                                {errors.description}
                                            </small>
                                        )}

                                        <small className="field-hint">
                                            {t.descriptionHint}
                                        </small>
                                    </div>
                                </div>
                            </div>

                            {/* LANGUAGE VERSIONS */}

                            <div className="form-card">
                                <div className="card-heading">
                                    <div className="heading-icon purple">
                                        <Languages size={19} />
                                    </div>

                                    <div>
                                        <h2>{t.languageVersions}</h2>
                                        <p>
                                            {t.languageVersionsDescription}
                                        </p>
                                    </div>
                                </div>

                                <div className="language-body">

                                    <div className="language-info">
                                        <Info size={16} />

                                        <p>
                                            {t.languageInfo}
                                        </p>
                                    </div>

                                    <div className="language-grid">
                                        {LANGUAGES.map((languageOption) => {
                                            const file =
                                                selectedFiles[
                                                    languageOption.code
                                                ];

                                            const error =
                                                errors[
                                                    `file_${languageOption.code}`
                                                ];

                                            return (
                                                <div
                                                    className={`language-card ${
                                                        file
                                                            ? 'has-file'
                                                            : ''
                                                    } ${
                                                        error
                                                            ? 'has-error'
                                                            : ''
                                                    }`}
                                                    key={languageOption.code}
                                                >
                                                    <div className="language-card-header">
                                                        <div className="language-name">
                                                            <div className="language-badge">
                                                                {
                                                                    languageOption.short
                                                                }
                                                            </div>

                                                            <div>
                                                                <strong>
                                                                    {
                                                                        languageOption.label
                                                                    }
                                                                </strong>

                                                                <span>
                                                                    {
                                                                        languageOption.description
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {file && (
                                                            <CheckCircle2
                                                                size={19}
                                                                className="file-success"
                                                            />
                                                        )}
                                                    </div>

                                                    {!file ? (
                                                        <label className="file-dropzone">
                                                            <input
                                                                type="file"
                                                                accept="application/pdf"
                                                                onChange={(
                                                                    e
                                                                ) =>
                                                                    handleFileChange(
                                                                        languageOption.code,
                                                                        e
                                                                            .target
                                                                            .files?.[0]
                                                                    )
                                                                }
                                                            />

                                                            <div className="upload-icon">
                                                                <UploadCloud
                                                                    size={24}
                                                                />
                                                            </div>

                                                            <strong>
                                                                {
                                                                    t.choosePdfFile
                                                                }
                                                            </strong>

                                                            <span>
                                                                {t.pdfOnly}
                                                            </span>
                                                        </label>
                                                    ) : (
                                                        <div className="selected-file">
                                                            <div className="selected-file-icon">
                                                                <FileText
                                                                    size={21}
                                                                />
                                                            </div>

                                                            <div className="selected-file-info">
                                                                <strong>
                                                                    {
                                                                        file.name
                                                                    }
                                                                </strong>

                                                                <span>
                                                                    {formatFileSize(
                                                                        file.size
                                                                    )}
                                                                </span>
                                                            </div>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    removeFile(
                                                                        languageOption.code
                                                                    )
                                                                }
                                                                className="remove-file"
                                                                title={
                                                                    t.removeFile
                                                                }
                                                            >
                                                                <X size={16} />
                                                            </button>
                                                        </div>
                                                    )}

                                                    {error && (
                                                        <div className="file-error">
                                                            {error}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ================= RIGHT COLUMN ================= */}

                        <aside className="side-column">

                            {/* PUBLISH CARD */}

                            <div className="side-card publish-card">
                                <div className="side-card-heading">
                                    <h3>{t.readyToUpload}</h3>
                                    <p>
                                        {t.reviewInformation}
                                    </p>
                                </div>

                                <div className="check-list">

                                    <div className="check-item">
                                        <CheckCircle2 size={17} />
                                        <span>
                                            {t.checkTitleProvided}
                                        </span>
                                    </div>

                                    <div className="check-item">
                                        <CheckCircle2 size={17} />
                                        <span>
                                            {t.checkOnePdfRequired}
                                        </span>
                                    </div>

                                    <div className="check-item">
                                        <CheckCircle2 size={17} />
                                        <span>
                                            {t.checkLanguagesSupported}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="submit-button"
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <>
                                            <span className="spinner" />
                                            {t.uploading}
                                        </>
                                    ) : (
                                        <>
                                            <UploadCloud size={18} />
                                            {t.uploadDocument}
                                        </>
                                    )}
                                </button>

                                <Link
                                    href={route(
                                        'admin.documents.index'
                                    )}
                                    className="cancel-button"
                                >
                                    {t.cancel}
                                </Link>
                            </div>

                            {/* GUIDELINES */}

                            <div className="side-card guidelines-card">
                                <div className="guideline-icon">
                                    <Info size={18} />
                                </div>

                                <div>
                                    <h3>{t.guidelines}</h3>

                                    <ul>
                                        <li>
                                            {t.guidelinePdfFormat}
                                        </li>

                                        <li>
                                            {t.guidelineOneLanguage}
                                        </li>

                                        <li>
                                            {t.guidelineMeaningfulTitle}
                                        </li>

                                        <li>
                                            {t.guidelineAddLater}
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </aside>
                    </div>
                </form>
            </div>

            {/* ================= STYLES ================= */}

            <style>{`
                .upload-page {
                    --primary: #5D89C8;
                    --primary-dark: #416FAE;
                    --text: #172033;
                    --muted: #718096;
                    --border: #E5E9F0;
                    --background: #F6F8FB;
                    --white: #FFFFFF;

                    min-height: 100%;
                    padding: 28px;
                    background: var(--background);
                }

                /* ================= HEADER ================= */

                .page-header {
                    margin-bottom: 25px;
                }

                .header-left {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                }

                .back-button {
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid var(--border);
                    border-radius: 10px;
                    background: white;
                    color: #667085;
                    text-decoration: none;
                    transition: .2s ease;
                }

                .back-button:hover {
                    border-color: #C7D5E8;
                    background: #F8FAFD;
                    color: var(--primary);
                }

                .header-left h1 {
                    margin: 0;
                    color: var(--text);
                    font-size: 26px;
                    font-weight: 750;
                    letter-spacing: -.5px;
                }

                .header-left p {
                    margin: 4px 0 0;
                    color: var(--muted);
                    font-size: 13px;
                }

                /* ================= ERROR ================= */

                .error-alert {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    margin-bottom: 22px;
                    padding: 15px 17px;
                    border: 1px solid #F1C9CE;
                    border-radius: 12px;
                    background: #FFF7F8;
                    color: #A93442;
                }

                .error-alert-icon {
                    width: 27px;
                    height: 27px;
                    flex: 0 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    background: #FCE1E4;
                    font-weight: 800;
                }

                .error-alert strong {
                    font-size: 13px;
                }

                .error-alert ul {
                    margin: 6px 0 0;
                    padding-left: 18px;
                    font-size: 12px;
                    line-height: 1.6;
                }

                /* ================= GRID ================= */

                .content-grid {
                    display: grid;
                    grid-template-columns: minmax(0, 1fr) 310px;
                    gap: 20px;
                    align-items: start;
                    max-width: 1250px;
                }

                .main-column {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    min-width: 0;
                }

                .side-column {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    position: sticky;
                    top: 20px;
                }

                /* ================= CARDS ================= */

                .form-card,
                .side-card {
                    background: white;
                    border: 1px solid var(--border);
                    border-radius: 15px;
                    box-shadow: 0 3px 12px rgba(20, 30, 50, .035);
                    overflow: hidden;
                }

                .card-heading {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 19px 21px;
                    border-bottom: 1px solid var(--border);
                }

                .heading-icon {
                    width: 39px;
                    height: 39px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 10px;
                }

                .heading-icon.blue {
                    background: #EAF1FC;
                    color: var(--primary);
                }

                .heading-icon.purple {
                    background: #F1ECFC;
                    color: #805AD5;
                }

                .card-heading h2 {
                    margin: 0;
                    color: var(--text);
                    font-size: 15px;
                    font-weight: 700;
                }

                .card-heading p {
                    margin: 3px 0 0;
                    color: var(--muted);
                    font-size: 11px;
                }

                .form-body {
                    padding: 22px;
                }

                /* ================= FORM ================= */

                .form-group {
                    margin-bottom: 20px;
                }

                .form-group:last-child {
                    margin-bottom: 0;
                }

                .form-group label {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    margin-bottom: 7px;
                    color: #344054;
                    font-size: 12px;
                    font-weight: 700;
                }

                .form-group label > span:first-of-type {
                    color: #D14B58;
                }

                .form-group label .optional {
                    margin-left: 5px;
                    color: #98A2B3;
                    font-size: 10px;
                    font-weight: 500;
                }

                .form-group input,
                .form-group textarea {
                    width: 100%;
                    box-sizing: border-box;
                    border: 1px solid #DCE2EA;
                    border-radius: 9px;
                    background: #FCFDFE;
                    color: var(--text);
                    font-family: inherit;
                    font-size: 13px;
                    outline: none;
                    transition: .2s ease;
                }

                .form-group input {
                    height: 43px;
                    padding: 0 12px;
                }

                .form-group textarea {
                    padding: 11px 12px;
                    resize: vertical;
                    line-height: 1.5;
                }

                .form-group input:focus,
                .form-group textarea:focus {
                    border-color: var(--primary);
                    background: white;
                    box-shadow: 0 0 0 3px rgba(93, 137, 200, .10);
                }

                .form-group input::placeholder,
                .form-group textarea::placeholder {
                    color: #A7AFBC;
                }

                .input-error {
                    border-color: #D14B58 !important;
                }

                .field-hint {
                    display: block;
                    margin-top: 6px;
                    color: #98A2B3;
                    font-size: 10px;
                    line-height: 1.5;
                }

                .field-error {
                    display: block;
                    margin-top: 5px;
                    color: #D14B58;
                    font-size: 11px;
                }

                /* ================= LANGUAGE ================= */

                .language-body {
                    padding: 20px 21px 22px;
                }

                .language-info {
                    display: flex;
                    align-items: flex-start;
                    gap: 9px;
                    padding: 11px 13px;
                    margin-bottom: 17px;
                    border-radius: 9px;
                    background: #F4F7FC;
                    color: #526581;
                }

                .language-info svg {
                    flex: 0 0 auto;
                    margin-top: 1px;
                }

                .language-info p {
                    margin: 0;
                    font-size: 11px;
                    line-height: 1.5;
                }

                .language-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 12px;
                }

                .language-card {
                    padding: 14px;
                    border: 1px solid #E3E7EE;
                    border-radius: 11px;
                    background: #FCFDFE;
                    transition: .2s ease;
                }

                .language-card:hover {
                    border-color: #CBD7E8;
                }

                .language-card.has-file {
                    border-color: #BFD7C8;
                    background: #FBFEFC;
                }

                .language-card.has-error {
                    border-color: #E5B5BB;
                }

                .language-card-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 8px;
                    margin-bottom: 13px;
                }

                .language-name {
                    display: flex;
                    align-items: center;
                    gap: 9px;
                }

                .language-badge {
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    background: #EAF1FC;
                    color: var(--primary);
                    font-size: 10px;
                    font-weight: 800;
                }

                .language-name strong {
                    display: block;
                    color: #344054;
                    font-size: 12px;
                }

                .language-name span {
                    display: block;
                    margin-top: 2px;
                    color: #98A2B3;
                    font-size: 9px;
                }

                .file-success {
                    color: #35A060;
                }

                /* ================= DROPZONE ================= */

                .file-dropzone {
                    min-height: 100px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 12px;
                    border: 1px dashed #CBD5E3;
                    border-radius: 9px;
                    background: #FAFBFD;
                    cursor: pointer;
                    text-align: center;
                    transition: .2s ease;
                }

                .file-dropzone:hover {
                    border-color: var(--primary);
                    background: #F6F9FE;
                }

                .file-dropzone input {
                    display: none;
                }

                .upload-icon {
                    width: 35px;
                    height: 35px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 7px;
                    border-radius: 9px;
                    background: #EAF1FC;
                    color: var(--primary);
                }

                .file-dropzone strong {
                    color: #475467;
                    font-size: 11px;
                }

                .file-dropzone span {
                    margin-top: 3px;
                    color: #98A2B3;
                    font-size: 9px;
                }

                /* ================= SELECTED FILE ================= */

                .selected-file {
                    display: flex;
                    align-items: center;
                    gap: 9px;
                    min-height: 65px;
                    padding: 9px;
                    border-radius: 9px;
                    background: #F4FAF6;
                }

                .selected-file-icon {
                    width: 34px;
                    height: 34px;
                    flex: 0 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    background: #DFF2E5;
                    color: #31945A;
                }

                .selected-file-info {
                    min-width: 0;
                    flex: 1;
                }

                .selected-file-info strong {
                    display: block;
                    overflow: hidden;
                    color: #344054;
                    font-size: 10px;
                    font-weight: 650;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .selected-file-info span {
                    display: block;
                    margin-top: 3px;
                    color: #98A2B3;
                    font-size: 9px;
                }

                .remove-file {
                    width: 27px;
                    height: 27px;
                    flex: 0 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #E1E7E3;
                    border-radius: 7px;
                    background: white;
                    color: #98A2B3;
                    cursor: pointer;
                }

                .remove-file:hover {
                    border-color: #E5B5BB;
                    background: #FFF7F8;
                    color: #D14B58;
                }

                .file-error {
                    margin-top: 7px;
                    color: #D14B58;
                    font-size: 10px;
                }

                /* ================= SIDE ================= */

                .side-card {
                    padding: 20px;
                }

                .side-card-heading h3 {
                    margin: 0;
                    color: var(--text);
                    font-size: 15px;
                    font-weight: 700;
                }

                .side-card-heading p {
                    margin: 5px 0 17px;
                    color: var(--muted);
                    font-size: 11px;
                    line-height: 1.5;
                }

                .check-list {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    padding: 14px 0;
                    border-top: 1px solid #F0F2F5;
                    border-bottom: 1px solid #F0F2F5;
                }

                .check-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: #667085;
                    font-size: 11px;
                }

                .check-item svg {
                    color: #35A060;
                }

                .submit-button {
                    width: 100%;
                    height: 43px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    margin-top: 17px;
                    border: none;
                    border-radius: 9px;
                    background: var(--primary);
                    color: white;
                    font-family: inherit;
                    font-size: 12px;
                    font-weight: 700;
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(93, 137, 200, .18);
                    transition: .2s ease;
                }

                .submit-button:hover:not(:disabled) {
                    background: var(--primary-dark);
                    transform: translateY(-1px);
                }

                .submit-button:disabled {
                    opacity: .65;
                    cursor: not-allowed;
                }

                .cancel-button {
                    width: 100%;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-top: 7px;
                    border-radius: 9px;
                    color: #667085;
                    font-size: 11px;
                    font-weight: 650;
                    text-decoration: none;
                }

                .cancel-button:hover {
                    background: #F6F8FB;
                }

                .spinner {
                    width: 14px;
                    height: 14px;
                    border: 2px solid rgba(255,255,255,.45);
                    border-top-color: white;
                    border-radius: 50%;
                    animation: spin .7s linear infinite;
                }

                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }

                /* ================= GUIDELINES ================= */

                .guidelines-card {
                    display: flex;
                    align-items: flex-start;
                    gap: 11px;
                    background: #F8FAFD;
                }

                .guideline-icon {
                    width: 31px;
                    height: 31px;
                    flex: 0 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    background: #EAF1FC;
                    color: var(--primary);
                }

                .guidelines-card h3 {
                    margin: 1px 0 9px;
                    color: #344054;
                    font-size: 12px;
                }

                .guidelines-card ul {
                    margin: 0;
                    padding-left: 15px;
                    color: #667085;
                    font-size: 10px;
                    line-height: 1.8;
                }

                /* ================= RESPONSIVE ================= */

                @media (max-width: 1050px) {
                    .content-grid {
                        grid-template-columns: 1fr;
                    }

                    .side-column {
                        position: static;
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                    }
                }

                @media (max-width: 800px) {
                    .upload-page {
                        padding: 20px 15px;
                    }

                    .language-grid {
                        grid-template-columns: 1fr;
                    }

                    .side-column {
                        grid-template-columns: 1fr;
                    }
                }

                @media (max-width: 520px) {
                    .header-left {
                        align-items: flex-start;
                    }

                    .header-left h1 {
                        font-size: 22px;
                    }

                    .header-left p {
                        font-size: 11px;
                    }

                    .back-button {
                        width: 36px;
                        height: 36px;
                    }

                    .form-body,
                    .language-body {
                        padding: 16px;
                    }

                    .card-heading {
                        padding: 16px;
                    }
                }
            `}</style>
        </AdminLayout>
    );
}