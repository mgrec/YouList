<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class PlayList extends Model
{
    protected $fillable = [
        'idVid',
        'slug'
    ];
    
    public function UserID($datas)
    {
        $UserID = DB::table('users')
            ->select('id')
            ->where('name', $datas['name'])
            ->get();

        return $UserID;
    }


    public function AddPlayList($datas)
    {
        $UserID =  $this->UserID($datas['name']);
        
        DB::table('playList')
            ->insert([
                [
                    'date' => date("m.d.y"),
                    'user_id' => /*$UserID*/ 1
                ]
            ]);
    }

    public function AddPlayListItem($datas)
    {
        DB::table('playListItem')
            ->insert([
                [
                    'id_playlist' => $datas['id_playlist'],
                    'idVid' => $datas['idVid'],
                    'title' => $datas['title']
                ]
            ]);
    }

    public function ReturnPlayListItem($datas)
    {
        $playList = DB::table('playListItem')
            ->select('idVid', 'title')
            ->where('id_playlist', $datas['id_playlist'])
            ->get();

        return $playList;
    }
}
