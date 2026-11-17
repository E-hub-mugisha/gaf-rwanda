<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\Request;

/**
 * Public "Vugana natwe" contact form.
 */
class ContactController extends Controller
{
    public function store(Request $request)
    {
        // Honeypot: real visitors never fill this hidden field.
        if ($request->filled('website_url')) {
            return back()->with('success', 'Message sent.');
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'subject' => ['nullable', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        ContactMessage::create($validated + ['status' => 'new']);

        return back()->with('success', 'Message sent.');
    }
}
