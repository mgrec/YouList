<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\PlayList;


//sudo php artisan serve --host 192.168.0.18 --port 80

class PlayListController extends Controller
{
    protected $playlist;
    
    
    public function __construct(PlayList $playlist)
    {
        $this->playlist = $playlist;
    }

    public function getStatusPlayList(Request $request)
    {
        $datas['id_playlist'] = $request->id_playlist;
        $status = $this->playlist->GetStatusPlayList($datas);
        echo $status->status;
    }

    public function connectPlayList(Request $request)
    {
        $datas['IDU'] = $request->IDU;
        $playlist = $this->playlist->ConnectPlayList($datas);
        echo $playlist;
    }

    public function changeStatusPlayList(Request $request)
    {
        $datas['status'] = $request->status;
        $datas['id_playlist'] = $request->id_playlist;
        $this->playlist->UpdateStatusPlayList($datas);
    }

    public function addUser(Request $request)
    {
        $datas['name'] = $request->name;
        $this->playlist->AddUser($datas);
    }
    
    public function getAllPlayList(Request $request)
    {
        $datas['name'] = $request->name;
        $playlist = $this->playlist->getAllPlayList($datas);
        
        echo $playlist;
    }
    
    public function addPlayList(Request $request)
    {
        $datas['name'] = $request->name;
        $datas['name_user'] = $request->name_user;
        $this->playlist->AddPlayList($datas);
    }

    public function addPlayListItem(Request $request)
    {
        $datas = $request->datas;
        $datas['id_playlist'] = $request->id_playlist;
        $datas['idVid'] = $request->idVid;
        $datas['title'] = $request->title;
        $this->playlist->AddPlayListItem($datas);
    }
    
    public function returnPlayList(Request $request)
    {
        $datas['id_playlist'] = $request->id_playlist;
        $playListDatas = $this->playlist->ReturnPlayListItem($datas);
        
        echo $playListDatas;
    }
}
