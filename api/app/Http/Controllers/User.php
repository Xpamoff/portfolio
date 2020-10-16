<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Http\Request;

class User extends Controller
{
    public function getData(Request $request) {
        $token = $request->bearerToken();
        $data = Student::query()->where(['token' => $token]);
        if($data->count()) {
            return response([
                'data' => $data->get()
            ], 200);
        }
        else {
            $data = Teacher::query()->where(['token' => $token])->get();
            return response([
                'data' => $data
            ], 200);
        }
    }
}