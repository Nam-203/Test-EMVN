import { DotsThree, Heart } from "@phosphor-icons/react";
import "./style.css";
import * as Tracks from "../../service/Tracks";
import { useQuery } from "@tanstack/react-query";
const AllSongs = ({dataSong}) => {
  return (
    <div className="h-[calc(100vh-400px)] overflow-y-auto pr-4">
      <div className="space-y-4">
        {dataSong?.map((song, index) => (
          <div
            key={song._id}
            className="flex items-center justify-between group hover:bg-white/10 p-2 rounded-md"
          >
            <div className="flex items-center gap-4 flex-1">
              <span className="text-gray-400 w-8">#{index + 1}</span>
              <img
                src={song.imageUrl || "/public/default.png"}
                alt={song.title}
                className="w-12 h-12 rounded"
              />
              <div className="flex flex-col">
                <span className="text-white">{song.title}</span>
                <span className="text-gray-400 text-sm">{song.artist}</span>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <span className="text-gray-400">{song.genre}</span>
              <span className="text-gray-400">{song.duration || "1:50"}</span>
              <Heart
                className="text-gray-400 hover:text-red-500 cursor-pointer"
                size={20}
              />
              <DotsThree
                size={20}
                className="text-gray-400 cursor-pointer"
                weight="bold"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Albums = () => {
  const fetchAllSongs = async () => {
    const res = await Tracks.getAllSongs();
    return res;
  };
  const querySongs = useQuery({
    queryKey: ["allSongs"],
    queryFn: fetchAllSongs,
  });
  const { isLoading, data: AllSongs } = querySongs;

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="h-[calc(100vh-400px)] overflow-y-auto pr-4">
      <div className="space-y-4">
        {AllSongs?.data?.map((song, index) => (
          <div
            key={song._id}
            className="flex items-center justify-between group hover:bg-white/10 p-2 rounded-md"
          >
            <div className="flex items-center gap-4 flex-1">
              <span className="text-gray-400 w-8">#{index + 1}</span>
              <img
                src={song.imageUrl || "/public/default.png"}
                alt={song.title}
                className="w-12 h-12 rounded"
              />
              <div className="flex flex-col">
                <span className="text-white">{song.title}</span>
                <span className="text-gray-400 text-sm">{song.artist}</span>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <span className="text-gray-400">{song.genre}</span>
              <span className="text-gray-400">{song.duration || "1:50"}</span>
              <Heart
                className="text-gray-400 hover:text-red-500 cursor-pointer"
                size={20}
              />
              <DotsThree
                size={20}
                className="text-gray-400 cursor-pointer"
                weight="bold"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { AllSongs, Albums };
