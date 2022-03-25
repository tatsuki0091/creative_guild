<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePhotographerRequest;
use App\Http\Requests\UpdatePhotographerRequest;
use App\Models\Photographer;
use Illuminate\Support\Facades\DB;

class PhotographerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Thd number of argument shold be dynamical number.
        $photographer = Photographer::with('albums')->find(1);
        // Return JSON
        return response()->json($photographer);
    }
}