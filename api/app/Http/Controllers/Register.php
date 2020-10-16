<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class Register extends Controller
{
    public function register(Request $request){
        $role = $request->get('role');
        if($role == 'student') {
            $validation = $this->validation($request->all(), [
                'school_number'=>'required',
                'first_name'=>'required',
                'last_name'=>'required',
                'email'=>'required|email|unique:student,email',
                'birth_date'=>'required|date',
                'class'=>'required',
                'password'=>'required'
            ]);
            if($validation->fails()) {
                return response([
                    'error' => [
                        'code' => 422,
                        'message' => 'Validation error',
                        'errors' => $validation->errors()
                    ]
                ], 422);
            }
            else {
                Student::query()->insert(['school_number'=>$request->get('school_number'),
                    'first_name'=>$request->get('first_name'),
                'last_name'=>$request->get('last_name'),
                'middle_name'=>$request->get('middle_name'),
                'email'=>$request->get('email'),
                'birth_date'=>$request->get('birth_date'),
                'class'=>$request->get('class'),
                'password'=>$request->get('password')]);
                return response(null, 204);
            }
        }
        elseif($role == 'teacher') {
            $validation = $this->validation($request->all(), [
                'school_number'=>'required',
                'first_name'=>'required',
                'last_name'=>'required',
                'email'=>'required|email|unique:teacher,email',
                'password'=>'required'
            ]);
            if($validation->fails()) {
                return response([
                    'error' => [
                        'code' => 422,
                        'message' => 'Validation error',
                        'errors' => $validation->errors()
                    ]
                ], 422);
            }
            else {
                Teacher::query()->insert(['school_number'=>$request->get('school_number'),
                    'first_name'=>$request->get('first_name'),
                    'last_name'=>$request->get('last_name'),
                    'middle_name'=>$request->get('middle_name'),
                    'email'=>$request->get('email'),
                    'position'=>$request->get('position'),
                    'password'=>$request->get('password')]);
                return response(null, 204);
            }
        }
    }
}
