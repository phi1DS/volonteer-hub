<?php

namespace App\Http\Middleware;

use App\Models\Task;
use App\Models\VolunteerAnswer;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        $user = $request->user();

        $translationFile = lang_path(app()->getLocale().'.json');
        $translations = is_readable($translationFile)
            ? json_decode(file_get_contents($translationFile), true)
            : [];

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $user,
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'flash' => [
                'message' => $request->session()->get('message'),
                'type' => $request->session()->get('type'),
            ],
            'locale' => app()->getLocale(),
            'translations' => $translations,
            'sidebarCounts' => fn () => Auth::check()
                    ? [
                        'openedTasks' => Task::query()->where('user_id', Auth::id())->where('active', true)->count(),
                        'closedTasks' => Task::query()->where('user_id', Auth::id())->where('active', false)->count(),
                        'volunteerAnswers' => VolunteerAnswer::query()->whereRelation('task', 'user_id', Auth::id())->count(),
                    ] : null,
        ];
    }
}
