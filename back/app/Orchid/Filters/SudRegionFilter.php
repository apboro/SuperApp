<?php

namespace App\Orchid\Filters;

use App\Models\SudUchastok;
use Illuminate\Database\Eloquent\Builder;
use Orchid\Filters\Filter;
use Orchid\Screen\Field;
use Orchid\Screen\Fields\Input;
use Orchid\Screen\Fields\Select;

class SudRegionFilter extends Filter
{

    /**
     * The displayable name of the filter.
     *
     * @return string
     */
    public function name(): string
    {
        return 'Регионы';
    }

    /**
     * The array of matched parameters.
     *
     * @return array|null
     */
    public function parameters(): ?array
    {
        return ['court_region'];
    }

    /**
     * Apply to a given Eloquent query builder.
     *
     * @param Builder $builder
     *
     * @return Builder
     */
    public function run(Builder $builder): Builder
    {
        return $builder->where('court_region', $this->request->get('court_region'));
    }

    /**
     * Get the display fields.
     *
     * @return Field[]
     */
    public function display(): iterable
    {
        return [
            Select::make('court_region')
                ->fromModel(SudUchastok::class, 'court_region','court_region')
                ->empty('Все', 0)
                ->value($this->request->get('court_region'))
                ->placeholder('Поиск...')
                ->title('Регион'),
        ];
    }
}
