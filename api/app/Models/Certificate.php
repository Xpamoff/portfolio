<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    use HasFactory;

    protected $table = 'certificate';
    protected $fillable = [
        'event', 'level', 'place', 'student_id', 'img', 'teacher_id', 'student_first_name', 'student_last_name', 'score'
    ];
    public $timestamps = false;
}
