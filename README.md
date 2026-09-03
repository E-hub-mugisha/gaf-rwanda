# Multilingual Document Portal — Laravel + Inertia + React

Same app as the Blade version, rebuilt with an Inertia/React frontend:
admin uploads PDFs in English / Spanish / Kinyarwanda, public readers get
accounts created by the admin (no self-registration), log in, and read in
their preferred language.

## What's included

```
app/Models/{User,Document,DocumentVersion,DocumentView}.php
app/Http/Middleware/{EnsureUserIsAdmin,HandleInertiaRequests}.php
app/Http/Controllers/Auth/LoginController.php
app/Http/Controllers/Admin/{DashboardController,UserController,DocumentController,ActivityController}.php
app/Http/Controllers/DocumentController.php        (public reader-facing)
database/migrations/*                               (role column, documents, versions, views)
database/seeders/AdminUserSeeder.php
routes/web.php
resources/views/app.blade.php                       (Inertia root view)
resources/js/app.jsx                                 (Inertia entry point)
resources/js/app.css                                 (shared design tokens/styles)
resources/js/Layouts/{AdminLayout,AppLayout}.jsx
resources/js/Components/Pagination.jsx
resources/js/Pages/Auth/Login.jsx
resources/js/Pages/Admin/Dashboard.jsx
resources/js/Pages/Admin/Documents/{Index,Create,Edit}.jsx
resources/js/Pages/Admin/Users/{Index,Create,Edit}.jsx
resources/js/Pages/Admin/Activity/Index.jsx
resources/js/Pages/Documents/{Index,Show}.jsx
vite.config.js
jsconfig.json
package.json.additions                               (deps to merge in)
```

## 1. Scaffold Laravel + Inertia + React

Easiest path — start from Laravel's official Breeze Inertia/React
preset, which wires up Inertia, Ziggy, and Vite+React for you:

```bash
composer create-project laravel/laravel document-portal
cd document-portal
composer require laravel/breeze --dev
php artisan breeze:install react
```

This gives you a working Inertia+React skeleton (with its own
login/register pages) plus `tightenco/ziggy` already installed, which is
what makes the JS-side `route()` helper (used throughout these pages)
work. If you'd rather not use Breeze, install the pieces yourself:

```bash
composer require inertiajs/inertia-laravel tightenco/ziggy
npm install @inertiajs/react react react-dom
npm install -D @vitejs/plugin-react
```

Either way, once the base is in place, delete Breeze's own
auth pages/controllers (or just let ours overwrite them in the next
step) — this app only needs one login form, shared by admins and readers.

## 2. Copy files in

Copy `app/`, `database/`, `resources/js/`, and `resources/views/app.blade.php`
from this package into your project, overwriting Breeze's versions of
anything with the same name. Merge `package.json.additions` into your
actual `package.json` (don't replace the whole file — just add the
listed dependencies), then:

```bash
npm install
```

Also replace `vite.config.js` with the one included here (it adds the
`@` → `resources/js` alias used by every page's imports).

## 3. Register the admin + Inertia middleware

**Laravel 11+** — in `bootstrap/app.php`:

```php
->withMiddleware(function (Middleware $middleware) {
    $middleware->web(append: [
        \App\Http\Middleware\HandleInertiaRequests::class,
    ]);
    $middleware->alias([
        'admin' => \App\Http\Middleware\EnsureUserIsAdmin::class,
    ]);
})
```

(If you used Breeze's installer, `HandleInertiaRequests` is likely
already registered — just replace its contents with the version here,
which adds the `auth.user.role` and `flash.status` props the pages use.)

**Laravel 10 and earlier** — add both to `app/Http/Kernel.php`
(`HandleInertiaRequests` in the `web` middleware group, `admin` in
`$middlewareAliases`).

## 4. Database

```bash
php artisan migrate

ADMIN_EMAIL=you@kerihub.rw ADMIN_PASSWORD="a-strong-password" \
    php artisan db:seed --class=AdminUserSeeder
```

## 5. Run it

```bash
php artisan serve
npm run dev
```

Visit `/login`, sign in with the seeded admin, and you're on
`/admin/dashboard`.

## Notes on the port from Blade

- **PDF storage/serving is unchanged** — files still live in
  `storage/app/documents/{id}/{lang}.pdf`, never on the public disk, and
  are only reachable through the authenticated `/documents/{id}/view/{lang}`
  route. No `storage:link` needed.
- **`route()` in JS** comes from Ziggy (`@routes` in `app.blade.php`
  injects it). If you skip Ziggy, you'll need to swap every `route(...)`
  call in the `.jsx` files for a literal URL string.
- Controllers now hand pre-formatted fields to the frontend (e.g.
  `language_label`, `created_at_date`) instead of calling model
  helper methods from Blade — React can't call PHP, so that formatting
  moved server-side into the controllers.
- File uploads from React go through Inertia's `useForm` with
  `forceFormData: true`, which is why `Create.jsx`/`Edit.jsx` post as
  `multipart/form-data` under the hood — no manual FormData wiring needed.
- Delete/logout actions use `router.delete()` / `router.post()` with a
  native `confirm()` instead of a `<form onsubmit>` — Inertia intercepts
  these and does the redirect/flash-message dance for you.
