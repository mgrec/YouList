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
    }
    
    public function addPlayList(Request $request)
    {
        $datas = $request->datas;
        $this->playlist->AddPlayList($datas);
    }
    
    public function returnPlayList(Request $request)
    {
        $datas = $request->datas;
        $playListDatas = $this->playlist->ReturnPlayList($datas);
        
        echo $playListDatas;
    }
}
