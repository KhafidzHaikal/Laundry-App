<?php

namespace App\Http\Controllers;

use App\Models\Laundry;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLaundryRequest;
use App\Http\Requests\UpdateLaundryRequest;
use App\Models\Kategori;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class LaundryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $laundries = Laundry::join('kategoris', 'laundries.kategori_id', '=', 'kategoris.id')->select('laundries.*', DB::raw('(kategoris.nama) as kategori_nama'))->get();
        // dd($laundries);
        return Inertia::render('Laundry/Index', [
            'laundries' => $laundries,
            'kategori' => Kategori::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Laundry/Create', [
            'kategoris' => Kategori::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validateData = $request->validate([
            'nama' => 'required',
            'kategori_id' => 'required',
            'harga' => 'required',
            'waktu_selesai' => 'required',
        ]);

        Laundry::create($validateData);

        return redirect()->route('laundry.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Laundry $laundry)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Laundry $laundry)
    {
        return Inertia::render('Laundry/Edit', [
            'laundry' => $laundry,
            'kategoris' => Kategori::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Laundry $laundry)
    {
        $request->validate([
            'nama' => 'required',
            'kategori_id' => 'required',
            'harga' => 'required',
            'waktu_selesai' => 'required',
        ]);
        
        $laundry->update([
            'nama' => $request->nama,
            'harga' => $request->harga,
            'waktu_selesai' => $request->waktu_selesai,
            'kategori_id' => $request->kategori_id,
        ]);
        return redirect()->route('laundry.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Laundry $laundry)
    {
        $laundry = Laundry::findOrFail($laundry->id);
        $laundry->delete();
        
        return redirect()->back();
    }
}
