<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ExitFromOffce extends Controller
{
    public function exit(Request $request) {
        $token = $request->bearerToken();
        Student::query()->where(['token' => $token])->update(['token'=>null]);
        Teacher::query()->where(['token' => $token])->update(['token'=>null]);
        return response(null, 204);
    }
}
