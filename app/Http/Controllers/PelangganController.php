<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Transaksi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class PelangganController extends Controller
{
    public function index()
    {
        $transaksi = Transaksi::join('laundries', 'transaksis.laundries_id', '=', 'laundries.id')
            ->join('users', 'transaksis.users_id', '=', 'users.id')
            ->select(
                'transaksis.id',
                'transaksis.no_transaksi',
                'transaksis.status',
                'transaksis.berat',
                'transaksis.total_harga',
                'transaksis.created_at',
                DB::raw('(laundries.nama) as laundry_nama'),
                DB::raw('(laundries.waktu_selesai) as waktu_selesai'),
                DB::raw('(laundries.harga) as laundry_harga'),
                DB::raw('(users.name) as user_name'),
            )
            ->get();
        return Inertia::render('Pelanggan/Index', [
            'transaksi' => $transaksi,
        ]);
    }

    public function update(Request $request, Transaksi $transaksi, $id)
    {
        $rules = [
            'status' => 'required',
        ];

        $validatedData = $request->validate($rules);
        Transaksi::where('id', $id)->update($validatedData);
        return redirect()->back();
    }
}
