<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserAccessController;
use App\Http\Controllers\Client\ClientController;
use App\Http\Controllers\RolePermissionController;
use App\Http\Controllers\Caja\CajaEgresoController;
use App\Http\Controllers\Product\ProductController;
use App\Http\Controllers\Caja\CajaIngresoController;
use App\Http\Controllers\Proforma\ProformaController;
use App\Http\Controllers\Caja\CajaSucursaleController;
use App\Http\Controllers\Configuration\UnitController;
use App\Http\Controllers\Comission\ComissionController;
use App\Http\Controllers\Product\ProductWalletController;
use App\Http\Controllers\Configuration\ProviderController;
use App\Http\Controllers\Configuration\SucusaleController;
use App\Http\Controllers\Comission\WeekComissionController;
use App\Http\Controllers\Configuration\WarehouseController;
use App\Http\Controllers\Proforma\ProformaDetailController;
use App\Http\Controllers\Product\ProductWarehouseController;
use App\Http\Controllers\Proforma\CalendarProformaController;
use App\Http\Controllers\Comission\PositionComissionController;
use App\Http\Controllers\Configuration\ClientSegmentController;
use App\Http\Controllers\Configuration\MethodPaymentController;
use App\Http\Controllers\Comission\CategorieComissionController;
use App\Http\Controllers\Configuration\ProductCategorieController;
use App\Http\Controllers\Comission\SegmentClientComissionController;
use App\Http\Controllers\Configuration\SucursaleDeliverieController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
 
    // 'middleware' => 'auth:api',
    'prefix' => 'auth',
//    'middleware' => ['auth:api'],//,'permission:publish articles|edit articles'
], function ($router) {
    Route::post('/register', [AuthController::class, 'register'])->name('register');
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::post('/refresh', [AuthController::class, 'refresh'])->name('refresh');
    Route::post('/me', [AuthController::class, 'me'])->name('me');
});

Route::group([
    'middleware' => 'auth:api',
], function ($router) {
    Route::resource("roles",RolePermissionController::class); 
    Route::post('/users/{id}', [UserAccessController::class, 'update']);
    Route::get("users/config", [UserAccessController::class, 'config']);
    Route::resource("users",UserAccessController::class); 

    Route::resource("sucursales",SucusaleController::class); 
    Route::resource("warehouses",WarehouseController::class); 
    Route::resource("sucursale_deliveries",SucursaleDeliverieController::class); 
    Route::resource("method_payments",MethodPaymentController::class); 
    Route::resource("client_segments",ClientSegmentController::class); 

    Route::post('/product_categories/{id}', [ProductCategorieController::class, 'update']);
    Route::resource("product_categories",ProductCategorieController::class); 

    Route::post('/providers/{id}', [ProviderController::class, 'update']);
    Route::resource("providers",ProviderController::class); 

    Route::post('/units/add-transform', [UnitController::class, 'add_transform']);
    Route::delete('/units/delete-transform/{id}', [UnitController::class, 'delete_transform']);
    Route::resource("units",UnitController::class);

    Route::post('/products/index', [ProductController::class, 'index']);
    Route::post('/products/import', [ProductController::class, 'import_product']);
    Route::post('/products/{id}', [ProductController::class, 'update']);
    Route::get("products/config", [ProductController::class, 'config']);
    Route::resource("products",ProductController::class); 

    Route::resource("product_wallets",ProductWalletController::class); 
    Route::resource("product_warehouses",ProductWarehouseController::class); 

    Route::post("clients/index",[ClientController::class,'index']);
    Route::post("clients/import",[ClientController::class,'import_clients']);
    Route::get("clients/config", [ClientController::class, 'config']);
    Route::resource("clients",ClientController::class); 

    Route::post("proformas/index",[ProformaController::class,'index']);
    Route::post("proformas/cronograma",[CalendarProformaController::class,'cronograma']);
    Route::get("proformas/eval-disponibilidad/{id}", [ProformaController::class, 'eval_disponibilidad']);
    Route::get("proformas/search-clients", [ProformaController::class, 'search_clients']);
    Route::get("proformas/search-products", [ProformaController::class, 'search_products']);
    Route::get("proformas/config", [ProformaController::class, 'config']);
    Route::post('/proformas/{id}', [ProformaController::class, 'update']);
    Route::resource("proformas",ProformaController::class); 

    Route::resource("proforma-details",ProformaDetailController::class); 

    Route::group(["prefix" => "caja"],function($router) {
        Route::get("config",[CajaSucursaleController::class,"config"]);
        Route::post("apertura_caja",[CajaSucursaleController::class,"apertura_caja"]);
        Route::post("cierre_caja",[CajaSucursaleController::class,"cierre_caja"]);

        Route::get("search_proformas/{client_id}",[CajaSucursaleController::class,"search_proformas"]);

        Route::post("updated_payment/{id}",[CajaSucursaleController::class,"updated_payment"]);
        Route::post("created_payment",[CajaSucursaleController::class,"created_payment"]);

        Route::post("process_payment",[CajaSucursaleController::class,"process_payment"]);

        Route::post("contract_process",[CajaSucursaleController::class,"contract_process"]);

        Route::get("report_caja_day/{caja_sucursale_id}",[CajaSucursaleController::class,"report_caja_day"]);

        Route::post("report_caja",[CajaSucursaleController::class,"report_caja"]);

        Route::resource("ingresos",CajaIngresoController::class); 
        Route::resource("egresos",CajaEgresoController::class); 
    });

    Route::post("comission",[ComissionController::class,"comission_asesor"]);
    Route::get("comission/config",[ComissionController::class,"config"]);
    Route::resource("comission-week",WeekComissionController::class); 
    Route::resource("comission-categorie",CategorieComissionController::class); 
    Route::resource("comission-client-segment",SegmentClientComissionController::class); 
    Route::resource("comission-position",PositionComissionController::class); 
});

Route::get("pdf/proforma/{id}",[ProformaController::class,"proforma_pdf"]);
Route::get("excel/export-proforma-generales",[ProformaController::class,"export_proforma_general"]);
Route::get("excel/export-proforma-details",[ProformaController::class,"export_proforma_details"]);
Route::get("excel/export-products",[ProductController::class,"export_products"]);
Route::get("excel/export-clients",[ClientController::class,"export_clients"]);
Route::get("excel/export-contract-processs",[CajaSucursaleController::class,"export_report_caja"]);