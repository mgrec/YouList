<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class PlayList extends Model
{
    protected $fillable = [
        'idVid', 'slug'
    ];

    
    public function AddPlayList($datas)
    {
        DB::table('playList')
            ->insert([
            [
                'id_vid' => $datas['idVid'],
                'slug' => $datas['slug']
            ]
        ]);
    }
    
    public function ReturnPlayList($datas)
    {
        $playList = DB::table('playList')
            ->select('*')
            ->where('id_doctor', $datas['slug'])
            ->get();
        
        return $playList;
    }
}
