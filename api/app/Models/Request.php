<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Request extends Model
{
    use HasFactory;

    protected $table = 'request';
    protected $fillable = [
        'teacher_id', 'student_id', 'student_first_name', 'student_last_name', 'student_middle_name', 'student_class'
    ];
    public $timestamps = false;
}
