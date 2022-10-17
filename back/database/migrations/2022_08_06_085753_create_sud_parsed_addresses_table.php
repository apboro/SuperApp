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
        Schema::create('sud_parsed_addresses', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('sud_uchastok_id')->constrained()->onDelete('cascade');
            $table->string('city');
            $table->text('address');
            $table->text('address_note');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sud_parsed_addresses');
    }
};
