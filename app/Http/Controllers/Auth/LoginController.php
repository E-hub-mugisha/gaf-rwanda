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

        Log::info('LOGIN FAILED');

        throw ValidationException::withMessages([
            'email' => 'The email or password you entered is incorrect.',
        ]);
    }

    Log::info('LOGIN SUCCESS', [
        'user_id' => Auth::id(),
    ]);

    $request->session()->regenerate();

    Log::info('SESSION REGENERATED');

    return redirect('/documents');
}

    public function destroy(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}