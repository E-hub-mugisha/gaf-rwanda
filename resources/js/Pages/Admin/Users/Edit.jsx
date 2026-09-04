import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    Save,
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ShieldCheck,
    Info,
    CheckCircle2,
    UserRoundPen,
    KeyRound,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { getLanguage, LANGUAGE_EVENT } from '@/lib/language';

/*
|--------------------------------------------------------------------------
| UI translations (admin chrome only)
|--------------------------------------------------------------------------
| Same four admin-panel UI languages as AdminLayout (rw/en/fr/nl). Unrelated
| to the document content languages (en/es/rw) used elsewhere in the portal.
*/

const translations = {
    rw: {
        eyebrow: 'Gucunga Abasoma',
        pageTitle: 'Hindura Konti y’Umusomyi',
        pageSubtitle:
            'Vugurura amakuru ya konti y’umusomyi n’igenamiterere ry’ijambobanga.',
        checkInfo: 'Nyamuneka reba amakuru akurikira',
        accountInformation: 'Amakuru ya Konti',
        updateDetails:
            'Vugurura amakuru bwite n’ayo kwinjira y’umusomyi.',
        fullName: 'Amazina Yombi',
        required: '*',
        fullNamePlaceholder: 'Andika amazina yombi',
        fullNameHint:
            'Amazina yombi y’umusomyi nk’uko agomba kugaragara muri sisitemu.',
        emailAddress: 'Aderesi ya Imeyili',
        emailPlaceholder: 'reader@example.com',
        emailHint: 'Iyi imeyili izakoreshwa mu kwinjira.',
        passwordSection: 'Ijambobanga',
        newPassword: 'Ijambobanga Rishya',
        newPasswordPlaceholder:
            'Reka ubusa kugira ngo ukomeze ijambobanga rya none',
        newPasswordHint:
            'Reka ubu bwanya bube ubusa niba udashaka guhindura ijambobanga rya none.',
        showPassword: 'Erekana ijambobanga',
        hidePassword: 'Hisha ijambobanga',
        passwordSecurity: 'Umutekano w’ijambobanga',
        passwordSecurityBody:
            'Andika ijambobanga rishya gusa igihe ukeneye gusimbura irisanzwe. Ntukigere usangira ijambobanga mu ruhame.',
        cancel: 'Hagarika',
        saving: 'Birabikwa...',
        saveChanges: 'Bika Impinduka',
        accountPreview: 'Kureba Konti',
        currentInfo: 'Amakuru y’ubu y’umusomyi',
        readerNamePlaceholder: 'Izina ry’Umusomyi',
        readerAccountLabel: 'Konti y’Umusomyi',
        accessLevel: 'Urwego rw’Uburenganzira',
        accountPermissions: 'Uburenganzira bwa konti',
        permReaderTitle: 'Usoma',
        permReaderBody: 'Ashobora kubona inyandiko zasohotse',
        permViewingTitle: 'Kureba Inyandiko',
        permViewingBody:
            'Ashobora kureba verisiyo z’inyandiko ziboneka',
        permAdminTitle: 'Ubuyobozi',
        permAdminBody: 'Nta burenganzira bw’ubuyobozi afite',
        important: 'Ingenzi',
        importantBody:
            'Guhindura aderesi ya imeyili bishobora kugira ingaruka ku buryo uyu musomyi yinjira. Nihindura ijambobanga rye, menya neza ko abona irishya mu buryo bwizewe.',
    },

    en: {
        eyebrow: 'Reader Management',
        pageTitle: 'Edit Reader Account',
        pageSubtitle:
            "Update the reader's account information and password settings.",
        checkInfo: 'Please check the information below',
        accountInformation: 'Account Information',
        updateDetails:
            "Update the reader's personal and login details.",
        fullName: 'Full Name',
        required: '*',
        fullNamePlaceholder: 'Enter full name',
        fullNameHint:
            "The reader's full name as it should appear in the system.",
        emailAddress: 'Email Address',
        emailPlaceholder: 'reader@example.com',
        emailHint: 'This email address will be used to sign in.',
        passwordSection: 'Password',
        newPassword: 'New Password',
        newPasswordPlaceholder: 'Leave blank to keep current password',
        newPasswordHint:
            'Leave this field blank if you do not want to change the current password.',
        showPassword: 'Show password',
        hidePassword: 'Hide password',
        passwordSecurity: 'Password security',
        passwordSecurityBody:
            'Only enter a new password when you need to replace the existing one. Never share passwords publicly.',
        cancel: 'Cancel',
        saving: 'Saving...',
        saveChanges: 'Save Changes',
        accountPreview: 'Account Preview',
        currentInfo: 'Current reader information',
        readerNamePlaceholder: 'Reader Name',
        readerAccountLabel: 'Reader Account',
        accessLevel: 'Access Level',
        accountPermissions: 'Account permissions',
        permReaderTitle: 'Reader',
        permReaderBody: 'Can access published documents',
        permViewingTitle: 'Document Viewing',
        permViewingBody: 'Can view available document versions',
        permAdminTitle: 'Administration',
        permAdminBody: 'No administrative privileges',
        important: 'Important',
        importantBody:
            'Changes to the email address may affect how this reader signs in. If you change their password, make sure they receive the new password securely.',
    },

    fr: {
        eyebrow: 'Gestion des lecteurs',
        pageTitle: 'Modifier le compte lecteur',
        pageSubtitle:
            'Mettez à jour les informations du compte et les paramètres de mot de passe du lecteur.',
        checkInfo: 'Veuillez vérifier les informations ci-dessous',
        accountInformation: 'Informations du compte',
        updateDetails:
            'Mettez à jour les informations personnelles et de connexion du lecteur.',
        fullName: 'Nom complet',
        required: '*',
        fullNamePlaceholder: 'Saisissez le nom complet',
        fullNameHint:
            'Le nom complet du lecteur tel qu’il doit apparaître dans le système.',
        emailAddress: 'Adresse e-mail',
        emailPlaceholder: 'reader@example.com',
        emailHint: 'Cette adresse e-mail sera utilisée pour se connecter.',
        passwordSection: 'Mot de passe',
        newPassword: 'Nouveau mot de passe',
        newPasswordPlaceholder:
            'Laisser vide pour conserver le mot de passe actuel',
        newPasswordHint:
            'Laissez ce champ vide si vous ne souhaitez pas changer le mot de passe actuel.',
        showPassword: 'Afficher le mot de passe',
        hidePassword: 'Masquer le mot de passe',
        passwordSecurity: 'Sécurité du mot de passe',
        passwordSecurityBody:
            'Ne saisissez un nouveau mot de passe que si vous devez remplacer l’actuel. Ne partagez jamais de mots de passe publiquement.',
        cancel: 'Annuler',
        saving: 'Enregistrement...',
        saveChanges: 'Enregistrer',
        accountPreview: 'Aperçu du compte',
        currentInfo: 'Informations actuelles du lecteur',
        readerNamePlaceholder: 'Nom du lecteur',
        readerAccountLabel: 'Compte lecteur',
        accessLevel: 'Niveau d’accès',
        accountPermissions: 'Permissions du compte',
        permReaderTitle: 'Lecteur',
        permReaderBody: 'Peut accéder aux documents publiés',
        permViewingTitle: 'Consultation des documents',
        permViewingBody:
            'Peut consulter les versions de documents disponibles',
        permAdminTitle: 'Administration',
        permAdminBody: 'Aucun privilège administratif',
        important: 'Important',
        importantBody:
            'Les modifications de l’adresse e-mail peuvent affecter la connexion de ce lecteur. Si vous changez son mot de passe, assurez-vous qu’il le reçoive de manière sécurisée.',
    },

    nl: {
        eyebrow: 'Lezersbeheer',
        pageTitle: 'Lezersaccount bewerken',
        pageSubtitle:
            'Werk de accountgegevens en wachtwoordinstellingen van de lezer bij.',
        checkInfo: 'Controleer de onderstaande informatie',
        accountInformation: 'Accountgegevens',
        updateDetails:
            'Werk de persoonlijke en inloggegevens van de lezer bij.',
        fullName: 'Volledige naam',
        required: '*',
        fullNamePlaceholder: 'Voer volledige naam in',
        fullNameHint:
            'De volledige naam van de lezer zoals die in het systeem moet verschijnen.',
        emailAddress: 'E-mailadres',
        emailPlaceholder: 'reader@example.com',
        emailHint: 'Dit e-mailadres wordt gebruikt om in te loggen.',
        passwordSection: 'Wachtwoord',
        newPassword: 'Nieuw wachtwoord',
        newPasswordPlaceholder:
            'Laat leeg om het huidige wachtwoord te behouden',
        newPasswordHint:
            'Laat dit veld leeg als u het huidige wachtwoord niet wilt wijzigen.',
        showPassword: 'Wachtwoord tonen',
        hidePassword: 'Wachtwoord verbergen',
        passwordSecurity: 'Wachtwoordbeveiliging',
        passwordSecurityBody:
            'Voer alleen een nieuw wachtwoord in wanneer u het bestaande wilt vervangen. Deel wachtwoorden nooit openbaar.',
        cancel: 'Annuleren',
        saving: 'Bezig met opslaan...',
        saveChanges: 'Wijzigingen opslaan',
        accountPreview: 'Accountvoorbeeld',
        currentInfo: 'Huidige lezersgegevens',
        readerNamePlaceholder: 'Naam lezer',
        readerAccountLabel: 'Lezersaccount',
        accessLevel: 'Toegangsniveau',
        accountPermissions: 'Accountrechten',
        permReaderTitle: 'Lezer',
        permReaderBody: 'Heeft toegang tot gepubliceerde documenten',
        permViewingTitle: 'Documenten bekijken',
        permViewingBody:
            'Kan beschikbare documentversies bekijken',
        permAdminTitle: 'Administratie',
        permAdminBody: 'Geen beheerdersrechten',
        important: 'Belangrijk',
        importantBody:
            'Wijzigingen aan het e-mailadres kunnen invloed hebben op hoe deze lezer inlogt. Als u het wachtwoord wijzigt, zorg er dan voor dat de lezer het nieuwe wachtwoord veilig ontvangt.',
    },
};

export default function Edit({ user }) {
    /*
    |--------------------------------------------------------------------------
    | Admin UI language
    |--------------------------------------------------------------------------
    | Same shared-state pattern as AdminLayout: read once on mount, then
    | subscribe to LANGUAGE_EVENT so a change made anywhere (the layout's
    | header switcher, the login page, etc.) is picked up here instantly,
    | including across Inertia navigations within the same tab.
    */

    const [language, setLanguageState] = useState(getLanguage);

    const t = translations[language] || translations.rw;

    useEffect(() => {
        const handleLanguageChange = (event) => {
            setLanguageState(event.detail);
        };

        window.addEventListener(LANGUAGE_EVENT, handleLanguageChange);

        return () => {
            window.removeEventListener(LANGUAGE_EVENT, handleLanguageChange);
        };
    }, []);

    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        _method: 'put',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.users.update', user.id));
    };

    const initials = useMemo(() => {
        if (!data.name?.trim()) return 'U';

        return data.name
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((word) => word.charAt(0).toUpperCase())
            .join('');
    }, [data.name]);

    const hasErrors = Object.keys(errors).length > 0;

    return (
        <AdminLayout title={t.pageTitle}>
            <div className="edit-user-page">

                {/* ================= HEADER ================= */}
                <div className="page-header">
                    <div className="header-left">
                        <Link
                            href={route('admin.users.index')}
                            className="back-button"
                        >
                            <ArrowLeft size={18} />
                        </Link>

                        <div>
                            <div className="eyebrow">{t.eyebrow}</div>

                            <h1>{t.pageTitle}</h1>

                            <p>{t.pageSubtitle}</p>
                        </div>
                    </div>
                </div>

                {/* ================= ERROR MESSAGE ================= */}
                {hasErrors && (
                    <div className="error-alert">
                        <div className="error-icon">
                            <Info size={19} />
                        </div>

                        <div>
                            <strong>{t.checkInfo}</strong>

                            <ul>
                                {Object.values(errors).map((message, index) => (
                                    <li key={index}>{message}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* ================= MAIN CONTENT ================= */}
                <div className="content-grid">

                    {/* ================= FORM ================= */}
                    <div className="main-card">

                        <div className="card-header">
                            <div className="card-header-icon">
                                <UserRoundPen size={21} />
                            </div>

                            <div>
                                <h2>{t.accountInformation}</h2>
                                <p>{t.updateDetails}</p>
                            </div>
                        </div>

                        <form onSubmit={submit}>

                            {/* NAME */}
                            <div className="form-group">
                                <label htmlFor="name">
                                    {t.fullName}
                                    <span>{t.required}</span>
                                </label>

                                <div className="input-wrapper">
                                    <User
                                        size={18}
                                        className="input-icon"
                                    />

                                    <input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        required
                                        autoComplete="name"
                                        placeholder={
                                            t.fullNamePlaceholder
                                        }
                                        onChange={(e) =>
                                            setData(
                                                'name',
                                                e.target.value
                                            )
                                        }
                                        className={
                                            errors.name
                                                ? 'input-error'
                                                : ''
                                        }
                                    />

                                    {data.name && !errors.name && (
                                        <CheckCircle2
                                            size={18}
                                            className="valid-icon"
                                        />
                                    )}
                                </div>

                                {errors.name && (
                                    <div className="field-error">
                                        {errors.name}
                                    </div>
                                )}

                                <div className="field-hint">
                                    {t.fullNameHint}
                                </div>
                            </div>

                            {/* EMAIL */}
                            <div className="form-group">
                                <label htmlFor="email">
                                    {t.emailAddress}
                                    <span>{t.required}</span>
                                </label>

                                <div className="input-wrapper">
                                    <Mail
                                        size={18}
                                        className="input-icon"
                                    />

                                    <input
                                        type="email"
                                        id="email"
                                        value={data.email}
                                        required
                                        autoComplete="email"
                                        placeholder={
                                            t.emailPlaceholder
                                        }
                                        onChange={(e) =>
                                            setData(
                                                'email',
                                                e.target.value
                                            )
                                        }
                                        className={
                                            errors.email
                                                ? 'input-error'
                                                : ''
                                        }
                                    />

                                    {data.email && !errors.email && (
                                        <CheckCircle2
                                            size={18}
                                            className="valid-icon"
                                        />
                                    )}
                                </div>

                                {errors.email && (
                                    <div className="field-error">
                                        {errors.email}
                                    </div>
                                )}

                                <div className="field-hint">
                                    {t.emailHint}
                                </div>
                            </div>

                            {/* PASSWORD */}
                            <div className="password-section">
                                <div className="section-title">
                                    <KeyRound size={18} />
                                    <span>{t.passwordSection}</span>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">
                                        {t.newPassword}
                                    </label>

                                    <div className="input-wrapper">
                                        <Lock
                                            size={18}
                                            className="input-icon"
                                        />

                                        <input
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            id="password"
                                            value={data.password}
                                            autoComplete="new-password"
                                            placeholder={
                                                t.newPasswordPlaceholder
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    'password',
                                                    e.target.value
                                                )
                                            }
                                            className={
                                                errors.password
                                                    ? 'input-error'
                                                    : ''
                                            }
                                        />

                                        <button
                                            type="button"
                                            className="password-toggle"
                                            onClick={() =>
                                                setShowPassword(
                                                    !showPassword
                                                )
                                            }
                                            aria-label={
                                                showPassword
                                                    ? t.hidePassword
                                                    : t.showPassword
                                            }
                                        >
                                            {showPassword ? (
                                                <EyeOff size={18} />
                                            ) : (
                                                <Eye size={18} />
                                            )}
                                        </button>
                                    </div>

                                    {errors.password && (
                                        <div className="field-error">
                                            {errors.password}
                                        </div>
                                    )}

                                    <div className="field-hint">
                                        {t.newPasswordHint}
                                    </div>
                                </div>

                                <div className="password-notice">
                                    <div className="notice-icon">
                                        <ShieldCheck size={19} />
                                    </div>

                                    <div>
                                        <strong>
                                            {t.passwordSecurity}
                                        </strong>
                                        <p>{t.passwordSecurityBody}</p>
                                    </div>
                                </div>
                            </div>

                            {/* ACTIONS */}
                            <div className="form-actions">
                                <Link
                                    href={route('admin.users.index')}
                                    className="cancel-button"
                                >
                                    {t.cancel}
                                </Link>

                                <button
                                    type="submit"
                                    className="save-button"
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <>
                                            <span className="spinner"></span>
                                            {t.saving}
                                        </>
                                    ) : (
                                        <>
                                            <Save size={18} />
                                            {t.saveChanges}
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* ================= SIDEBAR ================= */}
                    <aside className="sidebar">

                        {/* ACCOUNT PREVIEW */}
                        <div className="side-card preview-card">
                            <div className="side-card-header">
                                <div className="side-icon">
                                    <User size={19} />
                                </div>

                                <div>
                                    <h3>{t.accountPreview}</h3>
                                    <p>{t.currentInfo}</p>
                                </div>
                            </div>

                            <div className="profile-preview">
                                <div className="avatar">
                                    {initials}
                                </div>

                                <div className="profile-info">
                                    <h4>
                                        {data.name ||
                                            t.readerNamePlaceholder}
                                    </h4>

                                    <span>
                                        {data.email ||
                                            'reader@example.com'}
                                    </span>
                                </div>
                            </div>

                            <div className="account-status">
                                <span className="status-dot"></span>

                                <span>{t.readerAccountLabel}</span>
                            </div>
                        </div>

                        {/* PERMISSIONS */}
                        <div className="side-card">
                            <div className="side-card-header">
                                <div className="side-icon">
                                    <ShieldCheck size={19} />
                                </div>

                                <div>
                                    <h3>{t.accessLevel}</h3>
                                    <p>{t.accountPermissions}</p>
                                </div>
                            </div>

                            <div className="permission">
                                <div className="permission-check">
                                    <CheckCircle2 size={16} />
                                </div>

                                <div>
                                    <strong>{t.permReaderTitle}</strong>
                                    <span>{t.permReaderBody}</span>
                                </div>
                            </div>

                            <div className="permission">
                                <div className="permission-check">
                                    <CheckCircle2 size={16} />
                                </div>

                                <div>
                                    <strong>{t.permViewingTitle}</strong>
                                    <span>{t.permViewingBody}</span>
                                </div>
                            </div>

                            <div className="permission disabled">
                                <div className="permission-check">
                                    <CheckCircle2 size={16} />
                                </div>

                                <div>
                                    <strong>{t.permAdminTitle}</strong>
                                    <span>{t.permAdminBody}</span>
                                </div>
                            </div>
                        </div>

                        {/* INFORMATION */}
                        <div className="info-card">
                            <div className="info-card-icon">
                                <Info size={19} />
                            </div>

                            <div>
                                <h3>{t.important}</h3>

                                <p>{t.importantBody}</p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            <style>{`
                .edit-user-page {
                    --blue: #5D89C8;
                    --blue-dark: #466FA9;
                    --blue-light: #EEF4FC;
                    --ink: #172033;
                    --muted: #718096;
                    --border: #E5EAF1;
                    --surface: #FFFFFF;
                    --background: #F6F8FB;
                    --danger: #DC5A5A;
                    --success: #2E9B68;

                    min-height: 100%;
                    padding: 4px 0 40px;
                    color: var(--ink);
                }

                /* HEADER */

                .page-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 26px;
                }

                .header-left {
                    display: flex;
                    align-items: flex-start;
                    gap: 15px;
                }

                .back-button {
                    width: 42px;
                    height: 42px;
                    border: 1px solid var(--border);
                    border-radius: 12px;
                    background: #fff;
                    color: #526174;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-decoration: none;
                    transition: .2s ease;
                    flex-shrink: 0;
                }

                .back-button:hover {
                    color: var(--blue);
                    border-color: #C9D9EE;
                    background: var(--blue-light);
                    transform: translateX(-2px);
                }

                .eyebrow {
                    font-size: 11px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: .09em;
                    color: var(--blue);
                    margin-bottom: 5px;
                }

                .page-header h1 {
                    margin: 0;
                    font-size: 27px;
                    line-height: 1.2;
                    font-weight: 800;
                    letter-spacing: -.025em;
                    color: var(--ink);
                }

                .page-header p {
                    margin: 7px 0 0;
                    color: var(--muted);
                    font-size: 14px;
                }

                /* ERROR */

                .error-alert {
                    display: flex;
                    gap: 12px;
                    padding: 15px 17px;
                    margin-bottom: 22px;
                    border: 1px solid #F0C8C8;
                    background: #FFF7F7;
                    border-radius: 13px;
                    color: #8D3535;
                }

                .error-icon {
                    width: 32px;
                    height: 32px;
                    border-radius: 9px;
                    background: #FBE2E2;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .error-alert strong {
                    display: block;
                    font-size: 13px;
                    margin-bottom: 5px;
                }

                .error-alert ul {
                    margin: 0;
                    padding-left: 17px;
                    font-size: 13px;
                }

                .error-alert li {
                    margin-top: 3px;
                }

                /* GRID */

                .content-grid {
                    display: grid;
                    grid-template-columns: minmax(0, 1fr) 340px;
                    gap: 22px;
                    align-items: start;
                }

                /* MAIN CARD */

                .main-card {
                    background: var(--surface);
                    border: 1px solid var(--border);
                    border-radius: 18px;
                    box-shadow: 0 5px 20px rgba(24, 43, 70, .045);
                    overflow: hidden;
                }

                .card-header {
                    display: flex;
                    align-items: center;
                    gap: 13px;
                    padding: 23px 25px;
                    border-bottom: 1px solid var(--border);
                }

                .card-header-icon {
                    width: 42px;
                    height: 42px;
                    border-radius: 12px;
                    background: var(--blue-light);
                    color: var(--blue);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .card-header h2 {
                    margin: 0;
                    font-size: 16px;
                    font-weight: 750;
                }

                .card-header p {
                    margin: 4px 0 0;
                    color: var(--muted);
                    font-size: 12px;
                }

                .main-card form {
                    padding: 25px;
                }

                /* FORM */

                .form-group {
                    margin-bottom: 22px;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 8px;
                    font-size: 13px;
                    font-weight: 700;
                    color: #303C4D;
                }

                .form-group label span {
                    color: var(--danger);
                    margin-left: 3px;
                }

                .input-wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                }

                .input-wrapper input {
                    width: 100%;
                    height: 48px;
                    border: 1px solid #DCE2EA;
                    border-radius: 11px;
                    background: #fff;
                    padding: 0 45px 0 43px;
                    font-size: 14px;
                    color: var(--ink);
                    outline: none;
                    transition: .2s ease;
                    box-sizing: border-box;
                }

                .input-wrapper input::placeholder {
                    color: #A5AFBD;
                }

                .input-wrapper input:focus {
                    border-color: var(--blue);
                    box-shadow: 0 0 0 3px rgba(93, 137, 200, .12);
                }

                .input-icon {
                    position: absolute;
                    left: 14px;
                    color: #8995A5;
                    pointer-events: none;
                    z-index: 2;
                }

                .valid-icon {
                    position: absolute;
                    right: 14px;
                    color: var(--success);
                    pointer-events: none;
                }

                .input-error {
                    border-color: #E09A9A !important;
                }

                .input-error:focus {
                    box-shadow: 0 0 0 3px rgba(220, 90, 90, .10) !important;
                }

                .field-error {
                    margin-top: 6px;
                    color: var(--danger);
                    font-size: 12px;
                    font-weight: 600;
                }

                .field-hint {
                    margin-top: 7px;
                    color: #8994A4;
                    font-size: 11.5px;
                    line-height: 1.5;
                }

                /* PASSWORD */

                .password-section {
                    padding-top: 5px;
                    margin-top: 4px;
                    border-top: 1px solid var(--border);
                }

                .section-title {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin: 22px 0 17px;
                    font-size: 13px;
                    font-weight: 800;
                    color: #3B4657;
                }

                .section-title svg {
                    color: var(--blue);
                }

                .password-toggle {
                    position: absolute;
                    right: 8px;
                    width: 35px;
                    height: 35px;
                    border: 0;
                    border-radius: 8px;
                    background: transparent;
                    color: #7B8796;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                }

                .password-toggle:hover {
                    color: var(--blue);
                    background: var(--blue-light);
                }

                .password-notice {
                    display: flex;
                    gap: 11px;
                    padding: 13px 14px;
                    border: 1px solid #DDE8F6;
                    background: #F5F8FD;
                    border-radius: 11px;
                    margin-top: 5px;
                }

                .notice-icon {
                    width: 31px;
                    height: 31px;
                    border-radius: 8px;
                    background: #E5EFFB;
                    color: var(--blue);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .password-notice strong {
                    font-size: 12px;
                    display: block;
                    margin-bottom: 3px;
                    color: #344155;
                }

                .password-notice p {
                    margin: 0;
                    color: #718096;
                    font-size: 11.5px;
                    line-height: 1.55;
                }

                /* ACTIONS */

                .form-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 10px;
                    border-top: 1px solid var(--border);
                    padding-top: 21px;
                    margin-top: 25px;
                }

                .cancel-button,
                .save-button {
                    min-height: 44px;
                    padding: 0 17px;
                    border-radius: 10px;
                    font-size: 13px;
                    font-weight: 700;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    cursor: pointer;
                    text-decoration: none;
                    transition: .2s ease;
                }

                .cancel-button {
                    border: 1px solid #DCE2EA;
                    background: #fff;
                    color: #566375;
                }

                .cancel-button:hover {
                    background: #F7F9FB;
                    border-color: #C8D0DA;
                }

                .save-button {
                    border: 1px solid var(--blue);
                    background: var(--blue);
                    color: #fff;
                    box-shadow: 0 5px 13px rgba(93, 137, 200, .22);
                }

                .save-button:hover:not(:disabled) {
                    background: var(--blue-dark);
                    border-color: var(--blue-dark);
                    transform: translateY(-1px);
                }

                .save-button:disabled {
                    opacity: .65;
                    cursor: not-allowed;
                }

                .spinner {
                    width: 15px;
                    height: 15px;
                    border: 2px solid rgba(255,255,255,.4);
                    border-top-color: #fff;
                    border-radius: 50%;
                    animation: spin .7s linear infinite;
                }

                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }

                /* SIDEBAR */

                .sidebar {
                    display: flex;
                    flex-direction: column;
                    gap: 17px;
                }

                .side-card {
                    background: #fff;
                    border: 1px solid var(--border);
                    border-radius: 16px;
                    padding: 19px;
                    box-shadow: 0 5px 20px rgba(24, 43, 70, .035);
                }

                .side-card-header {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding-bottom: 15px;
                    border-bottom: 1px solid #EEF1F5;
                }

                .side-icon {
                    width: 36px;
                    height: 36px;
                    border-radius: 10px;
                    background: var(--blue-light);
                    color: var(--blue);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .side-card-header h3 {
                    margin: 0;
                    font-size: 13px;
                    font-weight: 800;
                }

                .side-card-header p {
                    margin: 3px 0 0;
                    color: var(--muted);
                    font-size: 11px;
                }

                /* PROFILE */

                .profile-preview {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 18px 0 14px;
                }

                .avatar {
                    width: 48px;
                    height: 48px;
                    border-radius: 13px;
                    background: linear-gradient(
                        135deg,
                        var(--blue),
                        #779DD0
                    );
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 800;
                    font-size: 15px;
                    box-shadow: 0 5px 12px rgba(93,137,200,.2);
                    flex-shrink: 0;
                }

                .profile-info {
                    min-width: 0;
                }

                .profile-info h4 {
                    margin: 0 0 4px;
                    font-size: 13px;
                    font-weight: 750;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .profile-info span {
                    display: block;
                    color: var(--muted);
                    font-size: 11px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .account-status {
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    padding: 9px 10px;
                    background: #F4FAF7;
                    border: 1px solid #D9EDE2;
                    border-radius: 9px;
                    color: #38805E;
                    font-size: 11px;
                    font-weight: 700;
                }

                .status-dot {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background: #39A56F;
                }

                /* PERMISSIONS */

                .permission {
                    display: flex;
                    gap: 9px;
                    padding: 13px 0;
                    border-bottom: 1px solid #EEF1F5;
                }

                .permission:last-child {
                    border-bottom: 0;
                    padding-bottom: 1px;
                }

                .permission-check {
                    color: #49A373;
                    padding-top: 1px;
                }

                .permission strong {
                    display: block;
                    font-size: 11.5px;
                    color: #394558;
                    margin-bottom: 3px;
                }

                .permission span {
                    display: block;
                    color: #8994A4;
                    font-size: 10.5px;
                    line-height: 1.45;
                }

                .permission.disabled {
                    opacity: .6;
                }

                /* INFO */

                .info-card {
                    display: flex;
                    gap: 11px;
                    padding: 15px;
                    background: #F5F8FC;
                    border: 1px solid #DEE8F4;
                    border-radius: 14px;
                }

                .info-card-icon {
                    width: 31px;
                    height: 31px;
                    background: #E5EFFB;
                    color: var(--blue);
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .info-card h3 {
                    margin: 0 0 5px;
                    font-size: 12px;
                    font-weight: 800;
                }

                .info-card p {
                    margin: 0;
                    color: #748195;
                    font-size: 10.8px;
                    line-height: 1.55;
                }

                /* RESPONSIVE */

                @media (max-width: 1000px) {
                    .content-grid {
                        grid-template-columns: 1fr;
                    }

                    .sidebar {
                        display: grid;
                        grid-template-columns: repeat(2, minmax(0, 1fr));
                    }

                    .info-card {
                        grid-column: 1 / -1;
                    }
                }

                @media (max-width: 700px) {
                    .edit-user-page {
                        padding-bottom: 25px;
                    }

                    .page-header {
                        margin-bottom: 20px;
                    }

                    .page-header h1 {
                        font-size: 22px;
                    }

                    .page-header p {
                        font-size: 12px;
                    }

                    .back-button {
                        width: 38px;
                        height: 38px;
                    }

                    .card-header {
                        padding: 18px;
                    }

                    .main-card form {
                        padding: 18px;
                    }

                    .sidebar {
                        display: flex;
                    }

                    .form-actions {
                        flex-direction: column-reverse;
                    }

                    .cancel-button,
                    .save-button {
                        width: 100%;
                    }
                }

                @media (max-width: 430px) {
                    .header-left {
                        gap: 10px;
                    }

                    .page-header h1 {
                        font-size: 20px;
                    }

                    .eyebrow {
                        font-size: 9px;
                    }

                    .card-header-icon {
                        width: 38px;
                        height: 38px;
                    }
                }
            `}</style>
        </AdminLayout>
    );
}