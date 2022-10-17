<?php

namespace App\Orchid\Actions;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Orchid\Crud\Action;
use Orchid\Screen\Actions\Button;
use Orchid\Support\Facades\Toast;
use App\Actions\Parser;
use Illuminate\Support\Facades\Log;

class ParseMainSudAction extends Action
{
    /**
     * The button of the action.
     *
     * @return Button
     */
    public function button(): Button
    {
        return Button::make('Обновить данные участка')->icon('refresh');
    }

    /**
     * Perform the action on the given models.
     *
     * @param \Illuminate\Support\Collection $models
     */
    public function handle(Collection $models)
    {
        $user = Auth::user()->name;
        $log_message = '';
        $models->each(function ($model) use (& $log_message){
            Parser::parse_main($model->url);
            $log_message .= 'Участок '. $model->url. ' - обновлен; ';
            return $log_message;
        });

        Log::info('Пользователь - '. $user .'. ' . $log_message);

        Toast::message('Данные участков обновлены!');

    }
}
