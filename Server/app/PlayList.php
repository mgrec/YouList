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

    public function GetCurrentIdVid($datas)
    {
        $CurrentID = DB::table('playList')
            ->select('last_idVid')
            ->where('IDU', $datas['IDU'])
            ->first();
        
        return $CurrentID;
    }

    public function ConnectPlayList($datas)
    {
        $PlayListID = DB::table('playList')
            ->select('id')
            ->where('IDU', $datas['IDU'])
            ->first();
        
        $AllItems = DB::table('playListItem')
            ->select('*')
            ->where('id_playlist', $PlayListID->id)
            ->get();
        
        return $AllItems;
    }
    
    public function GetStatusPlayList($datas)
    {
        $status = DB::table('playList')
            ->select('status')
            ->where('id', $datas['id_playlist'])
            ->first();
        
        return $status;
    }

    public function GetShareCode($datas)
    {
        $code = DB::table('playList')
            ->select('IDU')
            ->where('id', $datas['id_playlist'])
            ->first();

        return $code;
    }

    public function UpdateStatusPlayList($datas)
{
    DB::table('playList')
        ->select('status')
        ->where('id', $datas['id_playlist'])
        ->update([
            'status' => $datas['status'],
        ]);
}

    public function AddUser($datas)
    {
        DB::table('users')
            ->insert([
                [
                    'name' => $datas['name']
                ]
            ]);
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
        $UserID = $this->UserID($datas['name_user']);

        DB::table('playList')
            ->insert([
                [
                    'name' => $datas['name'],
                    'user_id' => $UserID[0]->id,
                    'status' => 0,
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
