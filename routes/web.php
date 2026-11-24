<?php

use App\Http\Controllers\Admin\ActivityController;
use App\Http\Controllers\Admin\AnalyticsController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\DocumentController as AdminDocumentController;
use App\Http\Controllers\Admin\EventCategoryController;
use App\Http\Controllers\Admin\EventController as AdminEventController;
use App\Http\Controllers\Admin\EventGalleryController;
use App\Http\Controllers\Admin\FaqController;
use App\Http\Controllers\Admin\GalleryMediaController;
use App\Http\Controllers\Admin\HealthContentController;
use App\Http\Controllers\Admin\HeroMediaController;
use App\Http\Controllers\Admin\NewsArticleController as AdminNewsArticleController;
use App\Http\Controllers\Admin\NewsCategoryController;
use App\Http\Controllers\Admin\ProgramController;
use App\Http\Controllers\Admin\SiteSettingController;
use App\Http\Controllers\Admin\TeamMemberController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\DepressionController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\PageViewController;
use App\Http\Controllers\PublicEventController;
use App\Http\Controllers\PublicNewsController;
use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public website
|--------------------------------------------------------------------------
*/

Route::get('/', [HomeController::class, 'index'])->name('guided-act-feel');

// Events
Route::get('/events', [PublicEventController::class, 'index'])->name('events.index');
Route::get('/events/{event:slug}', [PublicEventController::class, 'show'])->name('events.show');

// News
Route::get('/news', [PublicNewsController::class, 'index'])
    ->name('news.index');

Route::get('/news/{slug}', [PublicNewsController::class, 'show'])
    ->name('news.show');

// Gallery
Route::get('/gallery', [GalleryController::class, 'index'])
    ->name('gallery.index');

Route::get('/gallery/{slug}', [GalleryController::class, 'show'])
    ->name('gallery.show');

// Team
// Team page content is written in code (resources/js/Data/gafStories.js).
Route::inertia('/team', 'UserPage/TeamStatic')->name('team.index');

// News stories written in code (resources/js/Data/gafStories.js).
Route::get('/stories/{slug}', fn (string $slug) => \Inertia\Inertia::render('UserPage/Story', ['slug' => $slug]))
    ->where('slug', '[a-z0-9-]+')->name('stories.show');

// Participant login page (not in the menu; linked from the footer)
Route::inertia('/abitabiriye', 'UserPage/Participants')->name('participants');

// Mental health content (requires login)
Route::get('/mental-health/depression', [DepressionController::class, 'show'])
    ->name('mental-health.depression')
    ->middleware('auth');

/*
|--------------------------------------------------------------------------
| Authentication
|--------------------------------------------------------------------------
*/

Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'create'])->name('login');
    Route::post('/login', [LoginController::class, 'store']);
});

Route::post('/logout', [LoginController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');

/*
|--------------------------------------------------------------------------
| Reader area (any authenticated account)
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {
    Route::get('/documents', [DocumentController::class, 'index'])->name('documents.index');
    Route::get('/documents/{document}', [DocumentController::class, 'show'])->name('documents.show');
    Route::get('/documents/{document}/view/{language}', [DocumentController::class, 'stream'])
        ->name('documents.stream');
});

Route::middleware('auth')
    ->post('/page-views', [PageViewController::class, 'store'])
    ->name('page-views.store');

/*
|--------------------------------------------------------------------------
| Admin area
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {

        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // Content search for the command palette (Ctrl+K)
        Route::get('/search', \App\Http\Controllers\Admin\AdminSearchController::class)->name('search');
        Route::get('/activity', [ActivityController::class, 'index'])->name('activity.index');

        // Users
        Route::get('/users', [UserController::class, 'index'])->name('users.index');
        Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
        Route::post('/users', [UserController::class, 'store'])->name('users.store');
        Route::get('/users/{id}/edit', [UserController::class, 'edit'])->name('users.edit');
        Route::put('/users/{id}', [UserController::class, 'update'])->name('users.update');
        Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('users.destroy');

        // Documents
        Route::get('/documents', [AdminDocumentController::class, 'index'])->name('documents.index');
        Route::get('/documents/create', [AdminDocumentController::class, 'create'])->name('documents.create');
        Route::post('/documents', [AdminDocumentController::class, 'store'])->name('documents.store');
        Route::get('/documents/{id}/edit', [AdminDocumentController::class, 'edit'])->name('documents.edit');
        Route::put('/documents/{id}', [AdminDocumentController::class, 'update'])->name('documents.update');
        Route::delete('/documents/{id}', [AdminDocumentController::class, 'destroy'])->name('documents.destroy');
        Route::get('/documents/{id}/view', [AdminDocumentController::class, 'view'])->name('documents.view');
        Route::delete(
            '/documents/{document}/versions/{version}',
            [AdminDocumentController::class, 'destroyVersion']
        )->name('documents.versions.destroy');

        // Analytics
        Route::post('/analytics/chat', [AnalyticsController::class, 'chat'])->name('analytics.chat');
        Route::get('/analytics', [AnalyticsController::class, 'index'])->name('analytics.index');

        // Health content
        Route::get('/health-content/depression', [HealthContentController::class, 'show'])
            ->name('health-content.depression.show');
        Route::get('/health-content/depression/edit', [HealthContentController::class, 'edit'])
            ->name('health-content.depression.edit');
        Route::put('/health-content/depression', [HealthContentController::class, 'update'])
            ->name('health-content.depression.update');

        // Programmes, events, galleries
        Route::resource('programs', ProgramController::class);
        Route::resource('event-categories', EventCategoryController::class);
        Route::resource('events', AdminEventController::class);

        Route::prefix('events/{event}/galleries')
            ->name('events.galleries.')
            ->controller(EventGalleryController::class)
            ->group(function () {
                Route::get('/', 'index')->name('index');
                Route::post('/', 'store')->name('store');
                Route::put('/{gallery}', 'update')->name('update');
                Route::delete('/{gallery}', 'destroy')->name('destroy');
            });

        Route::prefix('events/{event}/galleries/{gallery}/media')
            ->name('events.galleries.media.')
            ->controller(GalleryMediaController::class)
            ->group(function () {
                Route::get('/', 'index')->name('index');
                Route::post('/', 'store')->name('store');
                Route::put('/{media}', 'update')->name('update');
                Route::delete('/{media}', 'destroy')->name('destroy');
            });

        // News
        Route::resource('news-categories', NewsCategoryController::class)
            ->only(['index', 'store', 'update', 'destroy']);
        Route::resource('news-articles', AdminNewsArticleController::class);

        // Hero media
        Route::get('/hero-media', [HeroMediaController::class, 'index'])->name('hero-media.index');
        Route::post('/hero-media', [HeroMediaController::class, 'store'])->name('hero-media.store');
        Route::put('/hero-media/{heroMedia}', [HeroMediaController::class, 'update'])->name('hero-media.update');
        Route::patch('/hero-media/{heroMedia}/activate', [HeroMediaController::class, 'activate'])
            ->name('hero-media.activate');
        Route::delete('/hero-media/{heroMedia}', [HeroMediaController::class, 'destroy'])
            ->name('hero-media.destroy');

        // Team
        Route::get('/team', [TeamMemberController::class, 'index'])->name('team.index');
        Route::post('/team', [TeamMemberController::class, 'store'])->name('team.store');
        Route::put('/team/{teamMember}', [TeamMemberController::class, 'update'])->name('team.update');
        Route::delete('/team/{teamMember}', [TeamMemberController::class, 'destroy'])->name('team.destroy');

        // FAQs
        Route::get('/faqs', [FaqController::class, 'index'])->name('faqs.index');
        Route::post('/faqs', [FaqController::class, 'store'])->name('faqs.store');
        Route::put('/faqs/{faq}', [FaqController::class, 'update'])->name('faqs.update');
        Route::delete('/faqs/{faq}', [FaqController::class, 'destroy'])->name('faqs.destroy');
        Route::patch('/faqs/{faq}/toggle-status', [FaqController::class, 'toggleStatus'])
            ->name('faqs.toggle-status');

        // Contact messages

        // Site settings (contacts, participation link, social media)
        Route::get('/settings', [SiteSettingController::class, 'edit'])->name('settings.edit');
        Route::put('/settings', [SiteSettingController::class, 'update'])->name('settings.update');
    });

// Create the first admin user (only while no admin exists)
Route::get('/admin/create-admin-user', [UserController::class, 'createAdminUser'])
    ->name('admin.create-admin-user')
    ->middleware('admin.create-admin-user');

// Post-deploy hook for the FTP deployment (migrations + cache clear).
// Protected by the X-Deploy-Token header; 404 when DEPLOY_TOKEN is not set.
Route::post('/deploy/run', \App\Http\Controllers\DeployController::class)
    ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class])
    ->middleware('throttle:5,1')
    ->name('deploy.run');
