<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Transaksi extends Model
{
    use HasFactory;
    protected $table = 'transaksis';

    protected $primaryKey = 'id';

    public $incrementing = false;

    protected $casts = [
        'id' => 'string',
    ];

    protected $keyType = 'string';

    protected function status(): Attribute
    {
        return new Attribute(
            get: fn ($value) => ["menunggu konfirmasi", "diproses", "selesai"][$value],
        );
    }
}
