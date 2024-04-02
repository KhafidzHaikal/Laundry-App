<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Kategori;
use App\Models\Laundry;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        User::create([
            'id' => 1,
            'name' => 'Haikal',
            'email' => 'admin@gmail.com',
            'no_telp' => '081293058325',
            'type' => 0,
            'password' => bcrypt('123')
        ]);

        User::create([
            'id' => 2,
            'name' => 'Khopadz',
            'email' => 'user@gmail.com',
            'no_telp' => '081293058298',
            'type' => 1,
            'password' => bcrypt('123')
        ]);

        Kategori::create([
            'id' => 1,
            'nama' => 'Kiloan'
        ]);

        Kategori::create([
            'id' => 2,
            'nama' => 'Satuan (Dry Cleaning)'
        ]);

        Laundry::create([
            'id' => 1,
            'kategori_id' => 1,
            'nama' => 'Biasa',
            'harga' => 10000,
            'waktu_selesai' => '2 Hari',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        Laundry::create([
            'id' => 2,
            'kategori_id' => 1,
            'nama' => 'Next Day',
            'harga' => 12500,
            'waktu_selesai' => '1 Hari',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        Laundry::create([
            'id' => 3,
            'kategori_id' => 1,
            'nama' => 'Kilat',
            'harga' => 13000,
            'waktu_selesai' => '10 Jam',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        Laundry::create([
            'id' => 4,
            'kategori_id' => 2,
            'nama' => 'Biasa',
            'harga' => 15000,
            'waktu_selesai' => '2 Hari',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        Laundry::create([
            'id' => 5,
            'kategori_id' => 2,
            'nama' => 'Next Day',
            'harga' => 18750,
            'waktu_selesai' => '1 Hari',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        Laundry::create([
            'id' => 6,
            'kategori_id' => 2,
            'nama' => 'Kilat',
            'harga' => 19500,
            'waktu_selesai' => '10 Jam',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
