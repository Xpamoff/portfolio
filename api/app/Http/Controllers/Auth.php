<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class Auth extends Controller
{
    public function auth(Request $request){
        $role = $request->get('role');
        if($role == 'student') {
            $validation = $this->validation($request->all(), [
                'email'=>'required|email',
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
                $token = Hash::make(Str::random(32));
                $isAuthed = Student::query()->where('email', $request->get('email'))
                    ->where('password', $request->get('password'))->count();
                if(!$isAuthed) {
                    return response([
                        'error' => [
                            'code' => 401,
                            'message' => 'Unauthorized',
                            'login' => 'Вы ввели неправильный логин или пароль'
                        ]
                    ], 401);
                }
                else {
                    Student::query()->where('email', $request->get('email'))
                        ->where('password', $request->get('password'))
                        ->update(['token' => $token]);
                }
                return response([
                    'data' => [
                        'token' => $token
                    ]
                ], 200);
            }
        }
        elseif($role == 'teacher') {
            $validation = $this->validation($request->all(), [
                'email'=>'required|email',
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
                $token = Hash::make(Str::random(32));
                $isAuthed = Teacher::query()->where('email', $request->get('email'))
                    ->where('password', $request->get('password'));
                if(!$isAuthed) {
                    return response([
                        'error' => [
                            'code' => 401,
                            'message' => 'Unauthorized',
                            'login' => 'Вы ввели неправильный логин или пароль'
                        ]
                    ], 401);
                }
                else {
                    Teacher::query()->where('email', $request->get('email'))
                        ->where('password', $request->get('password'))
                        ->update(['token' => $token]);
                }
                return response([
                    'data' => [
                        'token' => $token
                    ]
                ], 200);
            }
        }
    }
}
