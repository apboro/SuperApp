<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SudUchastokController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('sud_uchastoks', [SudUchastokController::class, 'index']);
Route::get('cities', [SudUchastokController::class, 'cities']);
Route::get('uchastoks_with_addresses', [SudUchastokController::class, 'uchastoks_with_addresses']);

