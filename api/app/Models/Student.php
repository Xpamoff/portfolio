<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'student';
    protected $fillable = [
        'school_number', 'first_name', 'last_name', 'middle_name', 'email', 'birth_date', 'class', 'teacher_id', 'password', 'token'
    ];
    public $timestamps = false;
}

