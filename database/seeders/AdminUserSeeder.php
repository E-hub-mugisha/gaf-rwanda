<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Creates the very first admin account. Every account after this one
     * is created through the admin panel (Reader Accounts / this seeder
     * is not meant to run again for extra admins).
     *
     * Run: php artisan db:seed --class=AdminUserSeeder
     * Change the email/password below before running, or override with
     * env vars if you prefer.
     */
    public function run(): void
    {
        User::updateOrCreate(
            [
                'name' => 'Site Admin',
                'email' => 'admin@example.com',
                'password' => Hash::make('password123'),
                'role' => 'admin',
            ]
        );
    }
}
