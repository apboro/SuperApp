<?php

namespace App\Orchid\Screens\SudScreens;

use Orchid\Support\Facades\Toast;
use Orchid\Screen\Fields\Input;
use Orchid\Platform\Models\User;
use Orchid\Screen\Action;
use Orchid\Screen\Actions\Button;
use Orchid\Screen\Fields\Upload;
use Orchid\Screen\Screen;
use Orchid\Support\Facades\Layout;
use App\Actions\Parser;
use Illuminate\Http\Request;
use Storage;

class UploadFileForParseScreen extends Screen
{
    /**
     * Query data.
     *
     * @return array
     */
    public function query(): iterable
    {
        return [
        ];
    }

    /**
     * Display header name.
     *
     * @return string|null
     */
    public function name(): ?string
    {
        return 'Форма загрузки файлов';
    }

    /**
     * Display header description.
     *
     * @return string|null
     */
    public function description(): ?string
    {
        return 'Загрузка файла с ссылками на участки';
    }

    /**
     * Button commands.
     *
     * @return Action[]
     */
    public function commandBar(): iterable
    {
        return [];
    }

    public function import(Request $request)
    {
//        dd($request);
        Storage::disk('local')
            ->putFileAs('tmp', $request->file('raw_file'), 'imp');
        $import_data = Storage::get('tmp/imp');
        Parser::parse_from_file($import_data);
        Toast::info("Файл обработан");
    }
    /**
     * Views.
     *
     * @throws \Throwable
     *
     * @return \Orchid\Screen\Layout[]
     */
    public function layout(): iterable
    {
        return [

            Layout::rows([

                Input::make('raw_file')
                ->type('file')
                ->title('Выберите txt файл для импорта:')
                ->horizontal(),

                Button::make('Импорт')
                ->icon('arrow-down-circle')
                ->class('')
                ->method('import'),

            ])->title('Загрузка файла'),
        ];
    }
}
