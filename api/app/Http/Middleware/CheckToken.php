<?php

namespace App\Http\Middleware;

use App\Models\Student;
use App\Models\Teacher;
use Closure;
use Illuminate\Http\Request;

class CheckToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $token = $request->bearerToken();
        $isToken = Student::query()->where('token', $token)->get();
        $isToken1 = Teacher::query()->where('token', $token)->get();
        if($isToken->count() || $isToken1->count()) {
            return $next($request);
        }
        else {
            return response([
                'error'=> [
                    'code'=> 401,
                    'message'=> 'Unauthorized'
                ]
            ], 401);
        }
    }
}
