<?php

namespace App\Orchid\Resources;

use App\Models\SudUchastok;
use App\Orchid\Filters\SudAddressCityFilter;
use Orchid\Crud\Resource;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Fields\Select;
use Orchid\Screen\TD;
use App\Models\SudParsedAddress;
use Orchid\Screen\Sight;
use Orchid\Screen\Fields\Relation;

class SudParsedAddresResource extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var string
     */
    public static $model = SudParsedAddress::class;

    /**
     * Get the fields displayed by the resource.
     *
     * @return array
     */
    public function fields(): array
    {
        return [
            Input::make('city')->title('Город'),
            Relation::make('sud_uchastoks.court_name')
                ->fromModel(SudUchastok::class,'court_name')
                ->title( 'Участок'),
            Input::make('address')->title('Адрес'),
            Input::make('address_note')->title('Подробности адреса'),
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
            TD::make('id', 'ID'),
            TD::make('sud_uchastok.court_name', 'Участок')->sort(),
//                ->filter(
//                    Select::make('sud_uchastok')
//                    ->fromModel(SudParsedAddress::class, 'sud_uchastok.court_name', 'sud_uchastoks.court_name')
//                    ->empty('Все', 0)
//                    ->placeholder('Поиск...')
//                    ->title('Участок'),
//                ),
            TD::make('city','Город')
                ->filter(
                Select::make('')
                    ->fromModel(SudParsedAddress::class, 'city', 'city')
                    ->empty('Все', 0)
                    ->placeholder('Поиск...')
                    ->title('Город'),
            ),
            TD::make('address','Адрес'),
            TD::make('address_note','Подробности адреса'),
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
            Sight::make('city','Город'),
            Sight::make('sud_uchastoks.court_name', 'Участок'),
            Sight::make('address','Адрес'),
            Sight::make('address_note','Подробности адреса'),
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
//            SudAddressCityFilter::class,
        ];
    }

    /**
     * Get the displayable label of the resource.
     *
     * @return string
     */
    public static function label(): string
    {
        return __('Территориальная подсудность');
    }

    /**
     * Get the displayable singular label of the resource.
     *
     * @return string
     */
    public static function singularLabel(): string
    {
        return __('Территориальная подсудность');
    }

    /**
     * Get relationships that should be eager loaded when performing an index query.
     *
     * @return array
     */
    public function with(): array
    {
        return ['sud_uchastok'];
    }

}
