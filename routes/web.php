<?php

use App\Http\Controllers\Admin\ActivityController;
use App\Http\Controllers\Admin\AnalyticsController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\DocumentController as AdminDocumentController;
use App\Http\Controllers\Admin\HealthContentController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\DepressionController;
use App\Http\Controllers\DocumentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('UserPage/Index');
})->name('guided-act-feel');

Route::get('/mental-health/depression', [
    DepressionController::class,
    'show'
])->name('mental-health.depression')->middleware('auth');

Route::get('/login', fn() => redirect()->route('login'));

// ---- Guest ----
Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'create'])->name('login');
    Route::post('/login', [LoginController::class, 'store']);
});

Route::post('/logout', [LoginController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');

// ---- Public reader area (any authenticated account) ----
Route::middleware('auth')->group(function () {
    Route::get('/documents', [DocumentController::class, 'index'])->name('documents.index');
    Route::get('/documents/{document}', [DocumentController::class, 'show'])->name('documents.show');
    Route::get('/documents/{document}/view/{language}', [DocumentController::class, 'stream'])->name('documents.stream');
});

// ---- Admin area ----
Route::middleware(['auth', 'admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {

        Route::get('/dashboard', [DashboardController::class, 'index'])
            ->name('dashboard');

        Route::get('/activity', [ActivityController::class, 'index'])
            ->name('activity.index');

        Route::get('/users', [UserController::class, 'index'])
            ->name('users.index');

        Route::get('/users/create', [UserController::class, 'create'])
            ->name('users.create');

        Route::post('/users', [UserController::class, 'store'])
            ->name('users.store');

        Route::get('/users/{id}/edit', [UserController::class, 'edit'])
            ->name('users.edit');

        Route::put('/users/{id}', [UserController::class, 'update'])
            ->name('users.update');

        Route::delete('/users/{id}', [UserController::class, 'destroy'])
            ->name('users.destroy');

        Route::get('/documents', [AdminDocumentController::class, 'index'])
            ->name('documents.index');

        Route::get('/documents/create', [AdminDocumentController::class, 'create'])
            ->name('documents.create');

        Route::post('/documents', [AdminDocumentController::class, 'store'])
            ->name('documents.store');

        Route::get('/documents/{id}/edit', [AdminDocumentController::class, 'edit'])
            ->name('documents.edit');

        Route::put('/documents/{id}', [AdminDocumentController::class, 'update'])
            ->name('documents.update');

        Route::delete('/documents/{id}', [AdminDocumentController::class, 'destroy'])
            ->name('documents.destroy');

        Route::get('/documents/{id}/view', [AdminDocumentController::class, 'view'])
            ->name('documents.view');

        Route::delete(
            '/documents/{document}/versions/{version}',
            [AdminDocumentController::class, 'destroyVersion']
        )->name('documents.versions.destroy');

        // Analytics
        Route::post('/analytics/chat', [AnalyticsController::class, 'chat'])
            ->name('analytics.chat');

        Route::get(
            '/health-content/depression',
            [HealthContentController::class, 'show']
        )->name('health-content.depression.show');

        Route::get(
            '/health-content/depression/edit',
            [HealthContentController::class, 'edit']
        )->name('health-content.depression.edit');

        Route::put(
            '/health-content/depression',
            [HealthContentController::class, 'update']
        )->name('health-content.depression.update');
    });

// route to create admin user if no admin user exists
Route::get('/admin/create-admin-user', [UserController::class, 'createAdminUser'])
    ->name('admin.create-admin-user')
    ->middleware('admin.create-admin-user');
