<?php

namespace App\Support;

use Illuminate\Http\UploadedFile;
use Illuminate\Validation\ValidationException;
use Throwable;

/**
 * Local file uploads for website media, using PHP's move().
 *
 * Files are saved in public/uploads/{folder}/ and the database keeps only the
 * relative path, e.g. "events/1731900000_6739a1b2c3d4e.jpg". The browser loads
 * them from /uploads/... No Storage facade, store() or symbolic link is used.
 *
 *   $path = FileUpload::save($request->file('cover_image'), 'events');
 *   FileUpload::delete($event->cover_image);
 *   FileUpload::url($event->cover_image);   // "/uploads/events/..."
 */
class FileUpload
{
    /** Folder inside public/ that holds every upload. */
    public const ROOT = 'uploads';

    /**
     * Move an uploaded file into public/uploads/{folder} and return its
     * relative path. Throws a validation error when the file cannot be saved.
     */
    public static function save(UploadedFile $file, string $folder, string $field = 'file'): string
    {
        if (! $file->isValid()) {
            throw ValidationException::withMessages([
                $field => 'The file could not be uploaded: '.$file->getErrorMessage(),
            ]);
        }

        $folder = trim(str_replace('\\', '/', $folder), '/');
        $destinationPath = public_path(self::ROOT.'/'.$folder);

        if (! is_dir($destinationPath) && ! mkdir($destinationPath, 0755, true) && ! is_dir($destinationPath)) {
            throw ValidationException::withMessages([
                $field => 'The upload folder could not be created.',
            ]);
        }

        // Extension from the file's real content, falling back to the name.
        $extension = strtolower($file->guessExtension() ?: $file->getClientOriginalExtension() ?: 'bin');
        $filename = time().'_'.uniqid().'.'.$extension;

        try {
            $file->move($destinationPath, $filename);
        } catch (Throwable $exception) {
            report($exception);

            throw ValidationException::withMessages([
                $field => 'The file could not be saved. Please try again.',
            ]);
        }

        return $folder.'/'.$filename;
    }

    /**
     * Save the request's file for $field, or return null when none was sent.
     */
    public static function fromRequest($request, string $field, string $folder): ?string
    {
        return $request->hasFile($field)
            ? self::save($request->file($field), $folder, $field)
            : null;
    }

    /**
     * Replace an old file: saves the new upload, then deletes the old one.
     * Returns the new path, or the old path when no file was sent.
     */
    public static function replace($request, string $field, string $folder, ?string $oldPath): ?string
    {
        $newPath = self::fromRequest($request, $field, $folder);

        if ($newPath === null) {
            return $oldPath;
        }

        self::delete($oldPath);

        return $newPath;
    }

    /** Delete a stored file. Paths outside public/uploads are ignored. */
    public static function delete(?string $path): bool
    {
        $fullPath = self::path($path);

        if ($fullPath && is_file($fullPath)) {
            return @unlink($fullPath);
        }

        return false;
    }

    public static function exists(?string $path): bool
    {
        $fullPath = self::path($path);

        return $fullPath !== null && is_file($fullPath);
    }

    /** Absolute path on disk, or null for empty, external or unsafe paths. */
    public static function path(?string $path): ?string
    {
        if (! $path || self::isExternal($path)) {
            return null;
        }

        $path = ltrim(str_replace('\\', '/', $path), '/');

        // Accept "uploads/events/a.jpg" as well as "events/a.jpg".
        if (str_starts_with($path, self::ROOT.'/')) {
            $path = substr($path, strlen(self::ROOT) + 1);
        }

        // Never leave the uploads folder.
        if ($path === '' || str_contains($path, '..')) {
            return null;
        }

        return public_path(self::ROOT.'/'.$path);
    }

    /** Public URL (relative, so it works on any domain). */
    public static function url(?string $path): ?string
    {
        if (! $path) {
            return null;
        }

        if (self::isExternal($path) || str_starts_with($path, '/')) {
            return $path;
        }

        $path = ltrim(str_replace('\\', '/', $path), '/');

        if (str_starts_with($path, self::ROOT.'/')) {
            return '/'.$path;
        }

        return '/'.self::ROOT.'/'.$path;
    }

    private static function isExternal(string $path): bool
    {
        return str_starts_with($path, 'http://') || str_starts_with($path, 'https://');
    }
}
