<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Throwable;

/**
 * Post-deploy hook for hosting without SSH (cPanel + FTP).
 *
 * The GitHub Actions workflow uploads the files by FTP, then calls
 *   POST /deploy/run   with header  X-Deploy-Token: <DEPLOY_TOKEN>
 * to run the database migrations and clear the caches.
 *
 * Disabled (404) while DEPLOY_TOKEN is empty in the server's .env.
 */
class DeployController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $token = (string) config('app.deploy_token');
        $given = (string) $request->header('X-Deploy-Token', '');

        if ($token === '' || $given === '' || ! hash_equals($token, $given)) {
            abort(404);
        }

        @set_time_limit(300);

        $steps = [
            ['migrate', ['--force' => true]],
            ['optimize:clear', []],
            ['view:cache', []],
        ];

        $results = [];

        foreach ($steps as [$command, $options]) {
            try {
                $code = Artisan::call($command, $options);
                $results[] = [
                    'command' => $command,
                    'ok' => $code === 0,
                    'output' => trim(Artisan::output()),
                ];

                if ($code !== 0) {
                    return response()->json(['ok' => false, 'steps' => $results], 500);
                }
            } catch (Throwable $e) {
                report($e);
                $results[] = ['command' => $command, 'ok' => false, 'output' => $e->getMessage()];

                return response()->json(['ok' => false, 'steps' => $results], 500);
            }
        }

        return response()->json(['ok' => true, 'steps' => $results]);
    }
}
