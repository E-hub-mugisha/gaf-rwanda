<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function create(Request $request)
    {
        return Inertia::render('Auth/Login', [
            'status' => $request->session()->get('status'),
        ]);
    }

    public function store(Request $request)
    {
        Log::info('LOGIN STORE REACHED', [
            'email' => $request->email,
        ]);

        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        Log::info('LOGIN VALIDATION PASSED');

        if (!Auth::attempt($credentials, $request->boolean('remember'))) {

            Log::warning('LOGIN FAILED', [
                'email' => $request->email,
            ]);

            throw ValidationException::withMessages([
                'email' => 'The email or password you entered is incorrect.',
            ]);
        }

        // Regenerate session after successful authentication
        $request->session()->regenerate();

        $user = Auth::user();

        Log::info('LOGIN SUCCESS', [
            'user_id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
        ]);

        /*
    |--------------------------------------------------------------------------
    | Redirect based on user role
    |--------------------------------------------------------------------------
    */

        if ($user->role === 'admin') {
            return redirect()->route('admin.dashboard');
        }

        return redirect()->route('mental-health.depression');
    }

    public function destroy(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}
