<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Orchid\Attachment\Attachable;
use Orchid\Filters\Filterable;
use Orchid\Screen\AsSource;

class SudParsedAddress extends Model
{
    use AsSource, Filterable, Attachable, HasFactory;
    protected $fillable = [
        'sud_uchastok_id',
        'city',
        'address',
        'address_note',
    ];
    protected $hidden = [
      'id',
      'created_at',
      'updated_at',
    ];

    protected $allowedFilters = [
        'city'
    ];

    protected $allowedSorts = [
        'city',
        'address',
    ];

    public function sud_uchastok(){
        return $this->belongsTo(SudUchastok::class);
    }
}
