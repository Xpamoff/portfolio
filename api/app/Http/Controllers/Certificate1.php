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
            return response([
                'data' => $responseArr
            ], 200);
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
            return response([
                'data' => $responseArr
            ], 200);
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

    public function approveCertificate(Request $request){
        $id = $request->get('id');
        $certificate = Certificate::query()->where(['id' => $id])->get();
        $certificate = $certificate[0];
        $level = $certificate['level'];
        $score = 0;
        $place = $certificate['place'];
        $id = $certificate['id'];
        $modificator = 0;
        switch($place) {
            case 1: $modificator = 1;
            break;
            case 2: $modificator = 0.5;
            break;
            case 3: $modificator = 0.5;
            break;
            case 0: $modificator =  0;
        }
        switch($level) {
            case 'Школьный': $score = 0;
            break;
            case 'Муниципальный': $score = 1 + $modificator;
            break;
            case 'Региональный': $score = 2 + $modificator*2;
            break;
            case 'Всероссийский': $score = 5 + $modificator*2;
            break;
            case 'Международный': switch($modificator) {
                case 1: $score = 15;
                break;
                case 0.5: $score = 10;
                break;
                case 0: $score = 8;
                break;
            };
            break;
        }
        Certificate::query()->where(['id' => $id])->update(['score' => $score]);
        return response(null, 204);
    }
}
