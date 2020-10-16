<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    protected $table = 'teacher';
    protected $fillable = [
        'school_number', 'first_name', 'last_name', 'middle_name', 'email', 'password', 'token', 'position'
    ];
    public $timestamps = false;
}
