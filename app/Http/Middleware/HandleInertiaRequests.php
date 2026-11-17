<?php

namespace App\Http\Middleware;

use App\Models\ContactMessage;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'role' => $request->user()->role,
                ] : null,
            ],
            'flash' => [
                'status' => fn () => $request->session()->get('status'),
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],

            // Contacts and social links edited in Admin > Site settings.
            'site' => fn () => SiteSetting::forWebsite(),

            // Badge in the admin sidebar.
            'unreadMessages' => fn () => $request->user()?->role === 'admin'
                ? ContactMessage::where('status', 'new')->count()
                : 0,
        ];
    }
}
