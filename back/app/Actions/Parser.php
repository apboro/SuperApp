<?php

namespace App\Actions;

use App\Models\SudUchastok;
use Goutte;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\SudParsedAddress;
use Illuminate\Support\Facades\Log;
use MoveMoveIo\DaData\Facades\DaDataAddress;

class Parser

{
    /**
     * @param $url
     * @param $id
     * @return void
     */
    public static function parse_sud($url, $id)
    {
        $crawler = Goutte::request('GET', $url . '/modules.php?name=terr');
        $crawler->filter('div.terr-item')
            ->each(function ($node) use ($id) {
                $city = $node->filter('div.left')->innerText();
                $address = $node->filter('div.right')->innerText();
                $adr_note = $node->filter('div.address-note');
                if ($adr_note->count() > 0)
                    $address_note = $adr_note->innerText();
                if ($city != 'Населенный пункт') {
                    SudParsedAddress::create(
                        [
                            'sud_uchastok_id' => $id,
                            'city' => $city,
                            'address' => $address,
                            'address_note' => $address_note ?? '',
                        ]);
                }
            });
    }

    /**
     * @param $url
     * @return string
     */
    public static function parse_main($url)
    {
        $existed = SudUchastok::where('url', $url)->exists();
//WORKING DATA
        $crawler = Goutte::request('GET', $url);
        $court_name = $crawler->filter('#court_name')->text();
        $court_address = $crawler->filter('#court_address')->text();
        $phone = $crawler->filter('.person-phone > .right')->text();

        $work_time = $crawler->filterXPath('//html/body/div[1]/div[3]/div[4]/div/div')->count() ?
            mb_strimwidth($crawler->filterXPath('//html/body/div[1]/div[3]/div[4]/div/div')->text(), 0, 250) : 0;

        $judge_name = $crawler->filterXPath('//html/body/div[1]/div[3]/div[3]/div/div/p[1]/b')->count() ?
                   $crawler->filterXPath('//html/body/div[1]/div[3]/div[3]/div/div/p[1]/b')->text() : $crawler->filterXPath('//html/body/div/div[3]/div[1]/div/div/p[1]/b')->text() ;

        $court_email = $crawler->filterXPath('//*[@id="court_email"]/a')->text();

        $court_type = $crawler->filterXPath('//html/body/div[1]/div[3]/div[5]/div/div/h2[3]')->count()
            ? $crawler->filterXPath('//html/body/div[1]/div[3]/div[5]/div/div/h2[3]')->text() : 0;

        $dadata_results = DaDataAddress::standardization($court_address);
        $court_city = $dadata_results[0]['city'];
        $court_region = $dadata_results[0]['region_with_type'];
        $postal_code = $dadata_results[0]['postal_code'];
        $city_district = isset($dadata_results[0]['city_district']) ?? '';

//TESTING DATA
//        $court_city = fake()->city;
//        $court_region = 'moskva';
//        $postal_code = 115522;
//        $city_district = 'moskvore4-saburovo';
//        $court_name = 'sudoku';
//        $court_address = 'borodoku';
//        $phone = '11-22-33';
//        $work_time = 'very much';
//        $judge_name = 'Afanas';
//        $court_email = 'shmail2@';
//        $court_type = 'rayonnik';

//        dd($url);
        SudUchastok::updateOrCreate(
            ['url' => $url],
            ['court_name' => $court_name,
                'court_address' => $court_address,
                'court_city' => $court_city,
                'court_phone' => $phone,
                'work_time' => $work_time,
                'judge_name' => $judge_name,
                'court_email' => $court_email,
                'court_type' => $court_type,
                'court_region' => $court_region,
                'postal_code' => $postal_code,
                'city_district' => $city_district,
            ]
        );
        if ($existed) return 'Обновлен';
        else return 'Добавлен';
    }

    /**
     * @param $file
     * @return void
     */
    public static function parse_from_file($file)
    {
        $separator = "\r\n";
        $urls = explode($separator, $file);
        if (count($urls) == 1) $separator = "\n";
        $urls = explode($separator, $file);

        array_pop($urls);

        $user = Auth::user()->id;
        $log_message='';
        foreach ($urls as $url) {
            $existed = Parser::parse_main($url);
            $log_message .= 'Участок '. $url. ' - '. $existed. '; ';
        }
//        dd($log_message);
        Log::info('Пользователь - '. $user .'. '. $log_message);
    }

}
