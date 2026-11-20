# Deployment to cPanel (GitHub Actions + FTP, no SSH)

Every push to `main` builds the site on GitHub and uploads it to cPanel by FTP.
Then it calls a protected URL on the site that runs the database migrations and
clears the caches. You can also run it by hand: **GitHub › Actions › Deploy to
cPanel › Run workflow**.

Workflow file: [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml)

## What happens on each deploy

1. `composer install --no-dev` and `npm run build` run on GitHub, so cPanel
   does not need Composer, Node or a terminal.
2. **FTP upload of changed files only.** The FTP action keeps a small state file
   (`.ftp-deploy-sync-state.json`) on the server. The first deploy uploads
   everything, including `vendor/`, which can take 10–30 minutes. Later deploys
   upload only what changed.
3. `POST {APP_URL}/deploy/run` with the `X-Deploy-Token` header runs:
   - `php artisan migrate --force`
   - `php artisan optimize:clear`
   - `php artisan view:cache`
4. A final request checks that the home page answers.

**Never uploaded or overwritten:**
- `.env`
- `public/uploads/` (files added in the admin)
- storage logs, sessions and caches
- `node_modules`, `tests`

## One-time setup

### 1. cPanel

1. **FTP account.** In *cPanel › FTP Accounts*, create an account and note the
   server, username and password. Restrict its directory to the app's folder,
   or use the main account.
2. **Choose where the app lives.** This is the setting for `FTP_SERVER_DIR`.

   **Recommended:** a folder outside `public_html`, for example
   `/home/USER/gaf-rwanda/`. Then point the domain's document root at its
   `public` folder: *cPanel › Domains › Manage › Document Root* →
   `gaf-rwanda/public`.

   **Alternative:** if the document root cannot be changed, upload the app
   straight into `public_html/`. The root [`.htaccess`](../.htaccess) sends all
   requests to `public/`, so `.env` and other private files are never served.
3. **Database.** In *MySQL Databases*, create the database and user, and give
   the user all privileges.
4. **`.env` file.** Create it in the app folder with *File Manager*. Copy
   `.env.example` and set at least:
   ```
   APP_ENV=production
   APP_DEBUG=false
   APP_URL=https://your-domain
   APP_KEY=base64:...      # generate locally: php artisan key:generate --show
   DB_DATABASE=...
   DB_USERNAME=...
   DB_PASSWORD=...
   DEPLOY_TOKEN=...        # long random string, see step 2 below
   ```
5. **PHP version.** In *Select PHP Version* / *MultiPHP Manager*, choose PHP
   **8.2 or newer**. Enable these extensions:
   - `pdo_mysql`
   - `mbstring`
   - `intl`
   - `gd`
   - `fileinfo`
   - `zip`
   - `bcmath`
6. **Writable folders.** `storage/` and `bootstrap/cache/` must be writable
   (permission 755 or 775). `public/uploads/` is created automatically on the
   first upload.

### 2. GitHub

In *Repository › Settings › Secrets and variables › Actions*:

**Secrets**

| Name | Example | |
|---|---|---|
| `FTP_SERVER` | `ftp.gafrwanda.com` | from cPanel FTP Accounts › Configure FTP Client |
| `FTP_USERNAME` | `deploy@gafrwanda.com` | |
| `FTP_PASSWORD` | `••••••` | |
| `FTP_SERVER_DIR` | `gaf-rwanda/` | relative to the FTP account's home, **must end with `/`**. If the FTP account is already restricted to the app folder, use `./` |
| `DEPLOY_TOKEN` | `9f2c…` (40+ random characters) | same value as `DEPLOY_TOKEN` in the server `.env` |

To generate a token, run `php -r "echo bin2hex(random_bytes(24));"`.

**Variables**

| Name | Example | |
|---|---|---|
| `APP_URL` | `https://gafrwanda.com` | no trailing slash. While it is empty, the migrations step is skipped |
| `FTP_PROTOCOL` | `ftps` | optional. Use `ftp` if your host has no FTPS, or `ftps-legacy` for implicit FTPS on port 990 |

### 3. First deploy

1. Push to `main`, or run the workflow by hand.
2. Watch *Actions*. The first upload is long because it includes `vendor/`.
3. Open the site, then create the first admin at `/admin/create-admin-user`.

## Troubleshooting

| Problem | Fix |
|---|---|
| FTP login or TLS errors | Check the secrets. Set the variable `FTP_PROTOCOL` to `ftp` |
| Upload timeouts on the first deploy | Re-run the workflow. It continues from where it stopped |
| Post-deploy hook returns 404 | `DEPLOY_TOKEN` is missing from the server `.env`, or the token is different. A config cache can also hold old values: delete `bootstrap/cache/config.php` in File Manager |
| Post-deploy hook returns 500 | The JSON response shows which command failed, usually a database error (check the `DB_*` values in `.env`). Laravel's log is in `storage/logs/laravel.log` |
| Everything needs to be uploaded again | Delete `.ftp-deploy-sync-state.json` in the app folder on the server and run the workflow |

## Security notes

- `/deploy/run` only accepts POST with the correct token. It answers 404 when
  the token is wrong or `DEPLOY_TOKEN` is empty, and it is rate limited to
  5 calls per minute.
- Keep `APP_DEBUG=false` in production.
