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
    
    public function addPlayList(Request $request)
    {
        $datas = $request->datas;
        $this->playlist->AddPlayList($datas);
    }

    public function addPlayListItem(Request $request)
    {
        $datas = $request->datas;
        $this->playlist->AddPlayListItem($datas);
    }
    
    public function returnPlayList(Request $request)
    {
        $datas['id_playlist'] = $request->id_playlist;
        
        $playListDatas = $this->playlist->ReturnPlayListItem($datas);
        
        echo $playListDatas;
    }
}
