<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::where('role', 'user')->latest()->paginate(15)->withQueryString();

        $users->getCollection()->transform(fn ($user) => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'created_at_date' => $user->created_at->format('d M Y'),
        ]);

        return Inertia::render('Admin/Users/Index', ['users' => $users]);
    }

    public function create()
    {
        return Inertia::render('Admin/Users/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => 'user',
            'created_by' => $request->user()->id,
        ]);

        return redirect()->route('admin.users.index')
            ->with('status', "Account created for {$data['email']}. Share the password with them directly.");
    }

    public function edit(int $id)
    {
        $user = User::where('role', 'user')->findOrFail($id);

        return Inertia::render('Admin/Users/Edit', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
        ]);
    }

    public function update(Request $request, int $id)
    {
        $user = User::where('role', 'user')->findOrFail($id);

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', Rule::unique('users', 'email')->ignore($user->id)],
            'password' => ['nullable', 'string', 'min:8'],
        ]);

        $user->name = $data['name'];
        $user->email = $data['email'];
        if (! empty($data['password'])) {
            $user->password = Hash::make($data['password']);
        }
        $user->save();

        return redirect()->route('admin.users.index')->with('status', 'Account updated.');
    }

    public function destroy(int $id)
    {
        $user = User::where('role', 'user')->findOrFail($id);
        $user->delete();

        return redirect()->route('admin.users.index')->with('status', 'Account removed.');
    }

    public function createAdminUser()
    {
        // Check if any admin user exists
        $adminExists = User::where('role', 'admin')->exists();

        if ($adminExists) {
            return redirect()->route('login')->with('status', 'Admin user already exists.');
        }

        // Create a new admin user with default credentials
        $adminUser = User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        return redirect()->route('login')->with('status', 'Admin user created successfully.');
    }

}
