<?php

namespace App\Orchid\Actions;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Orchid\Crud\Action;
use Orchid\Screen\Actions\Button;
use Orchid\Support\Facades\Toast;
use App\Actions\Parser;
use App\Models\SudParsedAddress;
use Illuminate\Support\Arr;
use App\Actions\Standartize;

class ParseAction extends Action
{
    /**
     * The button of the action.
     *
     * @return Button
     */
    public function button(): Button
    {
        return Button::make('Загрузить адреса')->icon('fire');
    }

    /**
     * Perform the action on the given models.
     *
     * @param \Illuminate\Support\Collection $models
     */
    public function handle(Collection $models)
    {
        $user = Auth::user()->name;
        $parsed_uchastoks_ids = Arr::flatten(SudParsedAddress::select('sud_uchastok_id')
            ->distinct()
            ->get()
            ->toArray());

        $models->each(function ($model) use ($parsed_uchastoks_ids, $user)
        {
            if (in_array($model->id, $parsed_uchastoks_ids)) {
                Toast::info("Участок {$model->id} уже загружен");
            } else {
                Parser::parse_sud($model->url, $model->id);
                Standartize::standartize_cities($model->id);
                Log::info('Пользователь - '. $user .' добавил адреса для '.$model->url);
                Toast::info("Адреса загружены");
            }
        });
    }
}
