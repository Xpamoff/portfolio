<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Student;
use App\Models\Certificate;
use App\Models\Teacher;

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

    public function getCertificates(Request $request) {
        $token = $request->bearerToken();
        $data = Student::query()->where(['token' => $token])->get();
        $studentId = $data[0]['id'];
        $data = Certificate::query()->where(['student_id' => $studentId]);
        if($data->count()) {
            $data = $data->get();
            $responseArr = [];
            foreach($data as $certificateData) {
//                var_dump($certificateData->id);
                $responseArr[] = [
                    "id"=> $certificateData->id,
                    "event"=> $certificateData->event,
                    "level"=> $certificateData->level,
                    "place"=> $certificateData->place,
                    "student_id"=> $certificateData->student_id,
                    "img"=> $certificateData->img,
                    "teacher_id"=> $certificateData->teacher_id,
                    "student_first_name"=> $certificateData->student_first_name,
                    "student_last_name"=> $certificateData->student_last_name,
                    "score"=> $certificateData->score
                ];
            }
            var_dump($responseArr);
//            return response([
//                'data' => ['1', $responseArr[0]]
//            ], 403);
        }
        else {
            return response([
                'error' => [
                    'code' => 404,
                    'message' => 'Not found',
                ]
            ], 404);
        }
    }

    public function getTeacherCertificates(Request $request) {
        $id = $request->get('id');
        if($id == 0) {
            $token = $request->bearerToken();
            $data = Teacher::query()->where(['token' => $token])->get();
            $id = $data[0]['id'];
            $data = Certificate::query()->where(['teacher_id' => $id]);
        }
        else {
            $data = Certificate::query()->where(['student_id' => $id]);
        }
        if($data->count()) {
            $data = $data->get();
            $responseArr = [];
            foreach($data as $certificateData) {
//                var_dump($certificateData->id);
                $responseArr[] = [
                    "id"=> $certificateData->id,
                    "event"=> $certificateData->event,
                    "level"=> $certificateData->level,
                    "place"=> $certificateData->place,
                    "student_id"=> $certificateData->student_id,
                    "img"=> $certificateData->img,
                    "teacher_id"=> $certificateData->teacher_id,
                    "student_first_name"=> $certificateData->student_first_name,
                    "student_last_name"=> $certificateData->student_last_name,
                    "score"=> $certificateData->score
                ];
            }
            var_dump($responseArr);
//            return response([
//                'data' => ['1', $responseArr[0]]
//            ], 403);
        }
        else {
            return response([
                'error' => [
                    'code' => 404,
                    'message' => 'Not found',
                ]
            ], 404);
        }
    }
}
