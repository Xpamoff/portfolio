<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/register', [\App\Http\Controllers\Register::class, 'register']);
Route::post('/auth', [\App\Http\Controllers\Auth::class, 'auth']);
Route::post('/exit', [\App\Http\Controllers\ExitFromOffce::class, 'exit'])->middleware('token');
Route::post('/getUserData', [\App\Http\Controllers\User::class, 'getData'])->middleware('token');
Route::post('/getTeachers', [\App\Http\Controllers\Applicaton::class, 'getTeachers'])->middleware('token');
Route::post('/sendRequest', [\App\Http\Controllers\Applicaton::class, 'send'])->middleware('token');
Route::post('/getRequests', [\App\Http\Controllers\Applicaton::class, 'getRequests'])->middleware('token');
Route::post('/acceptRequest', [\App\Http\Controllers\Applicaton::class, 'acceptRequest'])->middleware('token');
Route::post('/getStudents', [\App\Http\Controllers\Applicaton::class, 'getStudents'])->middleware('token');
Route::post('/uploadCertificate', [\App\Http\Controllers\Certificate1::class, 'upload'])->middleware('token');
Route::post('/getCertificates', [\App\Http\Controllers\Certificate1::class, 'getCertificates'])->middleware('token');
Route::post('/getTeacherCertificates', [\App\Http\Controllers\Certificate1::class, 'getTeacherCertificates'])->middleware('token');
Route::post('/approveCertificate', [\App\Http\Controllers\Certificate1::class, 'approveCertificate'])->middleware('token');
