<?php

namespace App\Http\Controllers\Compras;

use Illuminate\Http\Request;
use App\Models\Configuration\Unit;
use App\Http\Controllers\Controller;
use App\Models\Configuration\Provider;
use App\Models\Configuration\Warehouse;

class ComprasController extends Controller
{
    public function config(Request $request)
    {
        $warehouses = Warehouse::where("state", 1)->get();
        $providers = Provider::where("state", 1)->get();
        $units = Unit::where("state", 1)->get();
        
        return response()->json([
            "warehouses" => $warehouses,
            "providers" => $providers,
            "units" => $units,
            "now" => now()->format("Y-m-d"),
        ]);
    }
}
