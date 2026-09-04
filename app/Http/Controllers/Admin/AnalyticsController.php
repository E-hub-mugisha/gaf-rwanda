<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Document;
use App\Models\User;
use Illuminate\Http\Request;

class AnalyticsController extends Controller
{
    public function chat(Request $request)
    {
        $validated = $request->validate([
            'question' => ['required', 'string', 'max:1000'],
        ]);

        $question = strtolower(trim($validated['question']));

        $documents = Document::count();
        $readers = User::where('role', 'user')->count();
        $admins = User::where('role', 'admin')->count();

        if (
            str_contains($question, 'overview') ||
            str_contains($question, 'summary')
        ) {
            $answer = "Here is the current portal overview: {$documents} documents, {$readers} reader accounts, and {$admins} administrators are currently registered.";

        } elseif (
            str_contains($question, 'document') &&
            (
                str_contains($question, 'how many') ||
                str_contains($question, 'total') ||
                str_contains($question, 'number')
            )
        ) {
            $answer = "The portal currently contains {$documents} documents.";

        } elseif (
            str_contains($question, 'reader') ||
            str_contains($question, 'user')
        ) {
            $answer = "There are currently {$readers} registered reader accounts.";

        } elseif (
            str_contains($question, 'admin')
        ) {
            $answer = "There are currently {$admins} administrator accounts.";

        } else {
            $answer = "I can currently help with portal overviews, document totals, reader accounts and administrator accounts. Try asking: 'Give me a portal overview'.";
        }

        return response()->json([
            'answer' => $answer,
        ]);
    }
}