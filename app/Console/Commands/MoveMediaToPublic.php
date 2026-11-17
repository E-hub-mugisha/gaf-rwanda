<?php

namespace App\Console\Commands;

use App\Models\GalleryMedia;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

/**
 * Moves website media from storage/app/public to public/uploads.
 *
 * Paths saved in the database (e.g. "events/abc.jpg") stay the same, only
 * the folder changes. Private documents (storage/app/documents) are not moved.
 *
 *   php artisan media:move-to-public          move the files
 *   php artisan media:move-to-public --dry-run show what would be moved
 */
class MoveMediaToPublic extends Command
{
    protected $signature = 'media:move-to-public {--dry-run : List the files without moving them}';

    protected $description = 'Move uploaded website media from storage/app/public to public/uploads';

    /** Media folders created by the admin uploads. */
    private const FOLDERS = [
        'events',
        'event-galleries',
        'hero-media',
        'news-articles',
        'programs',
        'team-members',
        'team',
    ];

    public function handle(): int
    {
        $from = storage_path('app/public');
        $to = public_path('uploads');
        $dryRun = (bool) $this->option('dry-run');

        $moved = 0;
        $skipped = 0;

        foreach (self::FOLDERS as $folder) {
            $source = "{$from}/{$folder}";

            if (! File::isDirectory($source)) {
                continue;
            }

            foreach (File::allFiles($source) as $file) {
                $relative = str_replace('\\', '/', $folder.'/'.$file->getRelativePathname());
                $target = "{$to}/{$relative}";

                if (File::exists($target)) {
                    $this->line("  exists  {$relative}");
                    $skipped++;
                    continue;
                }

                $this->line(($dryRun ? '  would move ' : '  moved   ').$relative);

                if (! $dryRun) {
                    File::ensureDirectoryExists(dirname($target));
                    File::move($file->getPathname(), $target);
                }

                $moved++;
            }
        }

        if (! $dryRun) {
            // Gallery items remember which disk their file is on.
            $updated = GalleryMedia::where('disk', 'public')->update(['disk' => 'uploads']);
            $this->info("Gallery media records updated: {$updated}");

            // Remove folders left empty.
            foreach (self::FOLDERS as $folder) {
                $this->removeEmptyDirectories("{$from}/{$folder}");
            }
        }

        $this->info(($dryRun ? 'Would move' : 'Moved')." {$moved} file(s), skipped {$skipped} already in public/uploads.");

        return self::SUCCESS;
    }

    private function removeEmptyDirectories(string $directory): void
    {
        if (! File::isDirectory($directory)) {
            return;
        }

        foreach (File::directories($directory) as $child) {
            $this->removeEmptyDirectories($child);
        }

        if (count(File::allFiles($directory)) === 0 && count(File::directories($directory)) === 0) {
            File::deleteDirectory($directory);
        }
    }
}
