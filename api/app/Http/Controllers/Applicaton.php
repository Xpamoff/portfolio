<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Http\Request;

class Applicaton extends Controller
{
    public function getTeachers(Request $request)
    {
        $token = $request->bearerToken();
        $data = Student::query()->where(['token' => $token])->select('school_number')->get();
        $teachers = Teacher::query()->where(['school_number' => $data[0]['school_number']]);
        if ($teachers->count()) {
            return response([
                'data' => $teachers->get()
            ], 200);
        } else {
            return response([
                'error' => [
                    'code' => 404,
                    'message' => 'Not found',
                ]
            ], 404);
        }
    }

    public function send(Request $request) {
        \App\Models\Request::query()->insert($request->all());
        response(null, 204);
    }
}
