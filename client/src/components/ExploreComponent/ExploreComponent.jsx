import { useEffect, useState } from "react";
import {
    CaretLeft,
    CaretRight,
    SkipBack,
    SkipForward,
    Pause,
    Shuffle,
    Repeat,
    
  } from "@phosphor-icons/react"
  import { navigation } from "../../routes/datacontent";
  import *as Tracks from "../../service/Tracks";
import { Albums, AllSongs } from "../ComponentSong/ComponentSong";
const ExploreComponent = () => {
    const [activeTab, setActiveTab] = useState("All Songs");
    const [Song, setSongs] = useState([]);
    useEffect(()=>{
      const fetchAllSongs = async () => {
        const res = await Tracks.getAllSongs();
        setSongs(res.data);
      };
      fetchAllSongs();
    },[])
    const contendRender = ()=>{
      switch (activeTab) {
        case "All Songs":
          return < AllSongs dataSong={Song}/>
        case "Albums":
          return <Albums data={Song}/>;
      }
    }
  return (
    <div className=" w-11/12 bg-gradient-to-b from-zinc-800 to-black max-h-screen text-white p-8">
    <div className="flex gap-4 mb-6">
      <button className="p-2 bg-black/40 rounded-full">
        <CaretLeft size={20} />
      </button>
      <button className="p-2 bg-black/40 rounded-full">
        <CaretRight size={20} />
      </button>
    </div>

    <div className="mb-8">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
          <span className="text-xs">✓</span>
        </div>
        <span className="text-sm text-gray-300">Verified Artist</span>
      </div>
      <h1 className="text-7xl font-bold mb-4">Maharani</h1>
      <p className="text-gray-300">999,999 Monthly listeners</p>
    </div>

    <div className="flex items-center gap-4 mb-8">
      <button className="bg-green-500 text-black px-8 py-3 rounded-full font-semibold hover:scale-105 transition">
        Play
      </button>
      <button className="px-8 py-3 rounded-full font-semibold border border-gray-400 hover:border-white transition">
        unfollow
      </button>
    </div>

    <div className="flex gap-6 border-b border-gray-800 mb-6">
      {navigation.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`pb-2 transition-colors ${
            activeTab === tab
              ? 'text-white border-b-2 border-green-500'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
    {contendRender()}
    

    <div className="fixed bottom-0 left-0 right-0 bg-black p-4">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-6 mb-2">
          <Shuffle size={20} className="text-gray-400 hover:text-white" />
          <SkipBack size={20} className="text-gray-400 hover:text-white" />
          <button className="p-2 bg-white rounded-full">
            <Pause size={24} className="text-black" />
          </button>
          <SkipForward size={20} className="text-gray-400 hover:text-white" />
          <Repeat size={20} className="text-gray-400 hover:text-white" />
        </div>
        <div className="flex items-center gap-4 w-full max-w-2xl">
          <span className="text-xs text-gray-400">0:51</span>
          <div className="flex-1 h-1 bg-gray-600 rounded-full">
            <div className="w-1/3 h-full bg-white rounded-full"></div>
          </div>
          <span className="text-xs text-gray-400">1:41</span>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ExploreComponent
