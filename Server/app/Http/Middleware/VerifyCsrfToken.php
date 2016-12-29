<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as BaseVerifier;

class VerifyCsrfToken extends BaseVerifier
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        '/get-playlist',
        '/add-playlist-item',
        '/add-playlist',
        '/get-list-playlist',
        '/add-user',
        '/connect-playlist',
        '/get-playlist-status',
        '/change-playlist-status'
    ];
}
