<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Student;
use App\Models\Certificate;

class Certificate1 extends Controller
{
    public function upload(Request $request) {
        $path = $request->file('img')->store('images');

        $token = $request->bearerToken();
        $data = Student::query()->where(['token' => $token])->get();
        $studentId = $data[0]['id'];
        $firstName = $data[0]['first_name'];
        $lastName = $data[0]['first_name'];
        $teacherId = $data[0]['teacher_id'];


        Certificate::query()->insert([
           'event' => $request->get('event'),
            'level' => $request->get('level'),
            'place' => $request->get('place'),
            'student_id' => $studentId,
            'img' => $path,
            'teacher_id' => $teacherId,
            'student_first_name' => $firstName,
            'student_last_name' => $lastName
        ]);

        response(null, 204);
    }
}
