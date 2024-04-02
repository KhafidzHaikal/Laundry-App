<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Laundry;
use App\Models\Kategori;
use App\Models\Transaksi;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateTransaksiRequest;
use Illuminate\Support\Facades\Auth;

class TransaksiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $transaksi = Transaksi::where('users_id', '=', Auth::id())
            ->join('laundries', 'transaksis.laundries_id', '=', 'laundries.id')
            ->select(
                'transaksis.no_transaksi',
                'transaksis.status',
                'transaksis.berat',
                'transaksis.total_harga',
                'transaksis.created_at',
                DB::raw('(laundries.nama) as laundry_nama'),
                DB::raw('(laundries.waktu_selesai) as waktu_selesai'),
                DB::raw('(laundries.harga) as laundry_harga'),
            )
            ->get();

        return Inertia::render('Transaksi/Index', [
            'transaksi' => $transaksi
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $laundries = Laundry::join('kategoris', 'laundries.kategori_id', '=', 'kategoris.id')->select('laundries.*', DB::raw('(kategoris.nama) as kategori_nama'))->get();

        return Inertia::render('Transaksi/Create', [
            'laundries' => $laundries,
            'kategoris' => Kategori::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'laundries_id' => 'required',
            'berat' => 'required',
            'total_harga' => 'required',
        ]);

        $transaksi = new Transaksi();
        $transaksi->id = Str::uuid();
        $transaksi->no_transaksi = 'TRNS' . Str::random(7);
        $transaksi->users_id = Auth::user()->id;
        $transaksi->laundries_id = $request->laundries_id;
        $transaksi->berat = $request->berat;
        $transaksi->status = 0;
        $transaksi->total_harga = $request->total_harga;

        $transaksi->save();

        return redirect()->route('transaksi.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaksi $transaksi)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transaksi $transaksi)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Transaksi $transaksi)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaksi $transaksi)
    {
        //
    }
}
