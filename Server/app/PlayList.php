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
            ->where('name', $datas)
            ->get();

        return $UserID;
    }
    
    public function getAllPlayList($datas)
    {

        $UserID = $this->UserID($datas['name']);
        $playList = DB::table('playList')
            ->select('*')
            ->where('user_id', $UserID[0]->id)
            ->get();
        $playList->user_id = $UserID;

        return $playList;
    }


    public function AddPlayList($datas)
    {
        $IDU = uniqid();
        DB::table('playList')
            ->insert([
                [
                    'name' => $datas['name'],
                    'user_id' => $datas['user_id'],
                    'IDU' => $IDU
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
