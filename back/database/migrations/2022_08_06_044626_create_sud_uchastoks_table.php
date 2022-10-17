<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sud_uchastoks', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('court_name')->nullable();
            $table->string('court_address')->nullable();
            $table->string('court_city')->nullable();
            $table->string('city_district')->nullable();
            $table->string('court_type')->nullable();
            $table->string('court_region')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('court_phone')->nullable();
            $table->string('court_email')->nullable();
            $table->string('work_time')->nullable();
            $table->string('judge_name')->nullable();
            $table->string('url');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sud_uchastoks');
    }
};
