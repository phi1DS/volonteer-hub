<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\Http;

class CaptchaService
{
    private string $recaptchaSecretKey;

    public function __construct()
    {
        $this->recaptchaSecretKey = config('services.recaptcha.secret');
    }

    public function isCaptchaTokenValid(string $captcha_token): bool
    {
        $response = Http::asForm()->post(
            'https://www.google.com/recaptcha/api/siteverify',
            [
                'secret' => $this->recaptchaSecretKey,
                'response' => $captcha_token,
            ]
        );

        if ($response->failed()) {
            return false;
        }

        $success = $response->json('success', false);
        $score = $response->json('score');

        if (! $success) {
            return false;
        }

        return $score !== null && $score >= 0.5;
    }
}
