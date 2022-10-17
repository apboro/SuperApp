<?php

namespace App\Http\Controllers;

use App\Models\SudParsedAddress;
use App\Models\SudUchastok;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;


class SudUchastokController extends Controller
{
    /**@OA\Get
     *
     */
    public function uchastoks_with_addresses(): JsonResponse
    {
        $uchastoks_with_addresses = DB::table('sud_parsed_addresses as spa')
            ->join('sud_uchastoks as su',
            'spa.sud_uchastok_id', '=', 'su.id')->get();
//        dd($uchastoks_with_addresses);
        return new JsonResponse(['uch' => $uchastoks_with_addresses]);
    }


    /**
     * @OA\Get(
     *     path="/api/cities",
     *     tags={"cities"},
     *     summary="Get cities with pagination",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json"
     *     )
     * ),
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *         @OA\JsonContent(
     *             @OA\Examples(example="result", value={"city": "Нижегородская обл, г Семенов, д Сутырь"}, summary="Результат запроса")
     *         )
     *     )
     * )
     */
    public function cities(): JsonResponse
    {
        $city = SudParsedAddress::select('city')->distinct()->paginate();
        return new JsonResponse(['cities' => $city]);

    }

    /**
     * @OA\Get(
     *     path="/api/sud_uchastoks",
     *     tags={"sud_uchastoks"},
     *     summary="Get all database data",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json"
     *     )
     * ),
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *     )
     * )
     */
    public
    function index(): JsonResponse
    {
        $adr = SudParsedAddress::select('city', 'sud_uchastok_id', 'id', 'address', 'address_note')->get();
        $city = SudParsedAddress::select('city')->distinct()->get();
        $uchastki = SudUchastok::get();
        return new JsonResponse(
            ['addresses' => $adr, 'cities' => $city, 'uchastki' => $uchastki]
        );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public
    function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\StoreSudUchastokRequest $request
     * @return \Illuminate\Http\Response
     */
    public
    function store(StoreSudUchastokRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\SudUchastok $sudUchastok
     * @return \Illuminate\Http\Response
     */
    public
    function show(SudUchastok $sudUchastok)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\SudUchastok $sudUchastok
     * @return \Illuminate\Http\Response
     */
    public
    function edit(SudUchastok $sudUchastok)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateSudUchastokRequest $request
     * @param \App\Models\SudUchastok $sudUchastok
     * @return \Illuminate\Http\Response
     */
    public
    function update(UpdateSudUchastokRequest $request, SudUchastok $sudUchastok)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\SudUchastok $sudUchastok
     * @return \Illuminate\Http\Response
     */
    public
    function destroy(SudUchastok $sudUchastok)
    {
        //
    }
}
