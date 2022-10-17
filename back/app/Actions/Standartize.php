<?php

namespace App\Actions;

use App\Models\SudParsedAddress;
use App\Models\SudUchastok;
use Illuminate\Support\Arr;
use MoveMoveIo\DaData\Facades\DaDataAddress;

class Standartize
{
    public static function standartize_cities($uchastok_id)
    {
        $cities = SudParsedAddress::select('*')
            ->where('sud_uchastok_id',$uchastok_id)
            ->distinct()
            ->get('city')
            ->pluck('city');
        $region = SudUchastok::where('id', $uchastok_id)->value('court_region');
        foreach ($cities as $city) {
            $region_and_city = $region .' '. $city;
            $dadata_results = DaDataAddress::standardization($region_and_city);
            $city_standartized = Arr::flatten($dadata_results);
            SudParsedAddress::where('city', $city)->update(['city' => $city_standartized[1]]);
        }
    }
}
