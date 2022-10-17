<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Orchid\Attachment\Attachable;
use Orchid\Filters\Filterable;
use Orchid\Screen\AsSource;

class SudUchastok extends Model
{
    use AsSource, Filterable, Attachable, HasFactory;

    protected $fillable = [
        'court_name',
        'court_address',
        'court_city',
        'court_phone',
        'work_time',
        'judge_name',
        'court_email',
        'court_type',
        'court_region',
        'postal_code',
        'city_district',
        'url',
    ];

    protected $allowedFilters = [
        'court_city',
        'court_name',
        'court_type',
        'court_region',
        'city_district',
        'postal_code',
    ];
    protected $allowedSorts = [
        'id',
        'court_city',
        'court_name',
        'court_type',
        'court_region',
        'city_district',
        'postal_code',
    ];

    protected $hidden = ['created_at', 'updated_at'];

    public function sud_parsed_address()
    {
        return $this->hasMany(SudParsedAddress::class, 'sud_uchastok_id');
    }
}
