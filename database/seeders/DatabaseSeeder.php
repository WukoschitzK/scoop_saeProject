<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        $this->call([
            AllergenSeeder::class,
//            UserSeeder::class,
            CategorySeeder::class,
//            RecipeSeeder::class
        ]);
    }
}
