<?php

namespace App\Orchid\Resources;

use App\Models\SudUchastok;
use App\Orchid\Actions\ParseAction;
use App\Orchid\Actions\ParseMainSudAction;
use App\Orchid\Filters\SudRegionFilter;
use Orchid\Crud\Filters\DefaultSorted;
use Orchid\Crud\Resource;
use Orchid\Screen\Fields\Select;
use Orchid\Screen\TD;
use Orchid\Screen\Sight;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Actions\Link;



class SudResource extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var string
     */
    public static $model = SudUchastok::class;

    /**
     * Get the fields displayed by the resource.
     *
     * @return array
     */
    public function fields(): array
    {
        return [
            Input::make('court_name')->title('Название'),
            Input::make('court_address')->title('Адрес'),
            Input::make('court_city')->title('Город'),
            Input::make('city_district')->title('Район'),
            Input::make('court_region')->title('Регион'),
            Input::make('court_type')->title('Тип'),
            Input::make('postal_code')->title('Индекс'),
            Input::make('court_phone')->title('Телефон'),
            Input::make('court_email')->title('E-mail'),
            Input::make('judge_name')->title('Судья'),
            Input::make('work_time')->title('График'),
            Input::make('url')->title('Ссылка'),
        ];
    }

    /**
     * Get the columns displayed by the resource.
     *
     * @return TD[]
     */
    public function columns(): array
    {
        return [
            TD::make('id', 'ID')->sort(),
            TD::make('court_name', 'Название'),
            TD::make('court_region','Регион')
                ->filter(
                    Select::make('court_region')
                        ->fromModel(SudUchastok::class, 'court_region', 'court_region')
                        ->empty('Все', '')
                        ->placeholder('Поиск...')
                        ->title('Регион'),
                )->sort(),
            TD::make('court_city','Город')
                ->filter(
                    Select::make('court_city')
                        ->fromModel(SudUchastok::class, 'court_city', 'court_city')
                        ->empty('Все', '')
                        ->placeholder('Поиск...')
                        ->title('Город'),
                )->sort(),
            TD::make('city_district','Район')->sort(),
            TD::make('court_address','Адрес')
                ->render(function ($model) {
                return Link::make()->name($model->court_address)
                    ->href('https://yandex.ru/maps/?text='. $model->court_address);
                }),
            TD::make('court_type','Тип'),
            TD::make('postal_code','Индекс')->sort(),
            TD::make('court_phone','Телефон'),
            TD::make('court_email','E-mail'),
            TD::make('judge_name','Судья'),
            TD::make('work_time','График'),
            TD::make('url','Ссылка'),
        ];
    }

    /**
     * Get the sights displayed by the resource.
     *
     * @return Sight[]
     */
    public function legend(): array
    {
        return [
            Sight::make('id', 'ID'),
            Sight::make('court_name', 'Название'),
            Sight::make('court_address','Адрес'),
            Sight::make('court_city','Город'),
            Sight::make('city_district','Район'),
            Sight::make('court_region','Регион'),
            Sight::make('court_type','Тип'),
            Sight::make('postal_code','Индекс'),
            Sight::make('court_phone','Телефон'),
            Sight::make('court_email','E-mail'),
            Sight::make('judge_name','Судья'),
            Sight::make('work_time','График'),
            Sight::make('url','Ссылка'),
        ];
    }

    /**
     * Get the filters available for the resource.
     *
     * @return array
     */
    public function filters(): array
    {
        return [
//            SudRegionFilter::class,
        ];
    }

    /**
     * Get relationships that should be eager loaded when performing an index query.
     *
     * @return array
     */
    public function with(): array
    {
        return [];
    }

    /**
     * Get the number of models to return per page
     *
     * @return int
     */
    public static function perPage(): int
    {
        return 30;
    }

    public function actions(): array
    {
        return [
            ParseAction::class,
            ParseMainSudAction::class,
        ];
    }

    /**
     * Indicates whether should check for modifications
     * between viewing and updating a resource.
     *
     * @return  bool
     */
    public static function trafficCop(): bool
    {
        return true;
    }

    /**
     * Get the displayable label of the resource.
     *
     * @return string
     */
    public static function label(): string
    {
        return __('Участки');
    }

    /**
     * Get the displayable singular label of the resource.
     *
     * @return string
     */
    public static function singularLabel(): string
    {
        return __('Участок');
    }

}
