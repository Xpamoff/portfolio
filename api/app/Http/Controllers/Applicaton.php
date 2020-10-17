<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Http\Request;
use App\Models\Certificate;

class Applicaton extends Controller
{
    public function getTeachers(Request $request) {
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

    public function getStudents(Request $request) {
        $token = $request->bearerToken();
        $data = Teacher::query()->where(['token' => $token])->select('school_number')->get();
        $students = Student::query()->where(['school_number' => $data[0]['school_number']]);
        if ($students->count()) {
            return response([
                'data' => $students->get()
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
        $token = $request->bearerToken();
        $data = Student::query()->where(['token' => $token])->get();
        $data = $data[0];
        \App\Models\Request::query()->insert([
            'teacher_id' => $request->get('teacher_id'),
            'student_id' => $data['id'],
            'student_first_name' => $data['first_name'],
            'student_last_name' => $data['last_name'],
            'student_middle_name' => $data['middle_name'],
            'student_class' => $data['class']
        ]);
        return response(null, 204);
    }

    public function getRequests(Request $request) {
        $token = $request->bearerToken();
        $data = Teacher::query()->where(['token' => $token])->get();
        $data = $data[0];
        $requests = \App\Models\Request::query()->where(['teacher_id' => $data['id']]);
        if ($requests->count()) {
            return response([
                'data' => $requests->get()
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

    public function acceptRequest(Request $request) {
        $id = $request->get('id');
        $data = \App\Models\Request::query()->where(['id' => $id])->get();
        $data = $data[0];
        $studentId = $data['student_id'];
        $teacherId = $data['teacher_id'];
        Student::query()->where(['id' => $studentId])->update(['teacher_id' => $teacherId]);
        Certificate::query()->where(['student_id' => $studentId])->update(['teacher_id' => $teacherId]);
        \App\Models\Request::query()->where(['id' => $id])->delete();
        response(null, 204);
    }

}
