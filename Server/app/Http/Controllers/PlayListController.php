<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\PlayList;

class PlayListController extends Controller
{
    protected $playlist;
    
    public function __construct(PlayList $playlist)
    {
        $this->playlist = $playlist;
        header("Access-Control-Allow-Origin: *");
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
        $datas['user_id'] = $request->user_id;
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
