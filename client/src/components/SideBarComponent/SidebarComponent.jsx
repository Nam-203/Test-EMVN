import {
  House,
  MagnifyingGlass,
  Plus,
  Trash,
  Gear,
  Sparkle,
  Equalizer,
  PencilSimple,
} from "@phosphor-icons/react";
import { notification, Popover, Input } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Playlist from "../../service/Playlist";
import {  useQuery } from "@tanstack/react-query";
import ModalAddLibrary from "./ModalAddLibrary";
import ModalComponent from "../ModalComponent/Modalcomponent";
import { useMutationHook } from "../../hook/UseMutationHook";
import ModalUpdatePlaylist from "../ModalUpdatePlaylist/ModalUpdatePlaylist";
import { useDebounce } from "../../hook/UseDebouce";
import * as Track from "../../service/Tracks";
const SidebarComponent = () => {
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [id, setId] = useState("");
  const [idPlaylist, setIdPlaylist] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const searchDebounce = useDebounce(searchTerm, 300);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [limit, setLimit] = useState(3);

  const fetchAllPlaylist = async () => {
    const res = await Playlist.getAllPlaylist();
    return res.data;
  };
  const queryPlaylist = useQuery({
    queryKey: ["allPlaylist"],
    queryFn: fetchAllPlaylist,
  });

  const mutationDelete = useMutationHook((id) => Playlist.deletePlaylist(id));
  const { isSuccess, isError } = mutationDelete;
  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message: "Success",
        description: "Playlist deleted successfully",
      });
    } else if (isError) {
      notification.error({
        message: "Error",
        description: "Failed to delete playlist",
      });
    }
  }, [isSuccess, isError]);
  const fetchSearchTrack = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
   
    const res = await Track.getAllSongsDebounce(search, limit);
    return res.data;
  };
  const { data: track } = useQuery({
    queryKey: ["searchTrack", limit, searchDebounce],
    queryFn: fetchSearchTrack,
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: false
  });
  const { data: AllPlaylist } = queryPlaylist;
  const [openModal, setOpenModal] = useState(false);
  const navigation = useNavigate();
  const handleClickNavigate = (path) => {
    switch (path) {
      case "DashBoard":
        navigation("/dashboard");
        break;

      default:
        break;
    }
  };

  const handleDelete = () => {
    mutationDelete.mutate(id, {
      onSettled: () => {
        queryPlaylist.refetch();
      },
    });
    setIsModalOpenDelete(false);
  };
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };
  const handleUpdate = (id) => {
    setIdPlaylist(id);
    setIsModalOpenUpdate(true);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setShowSearchResults(!!value);
  };

  const content = (
    <div className="rounded-lg">
      <div
        className="py-2 pop-child text-base tracking-wide cursor-pointe"
        onClick={() => handleClickNavigate("DashBoard")}
      >
        Your DashBoard
      </div>
    </div>
  );

  return (
    <div className="w-64 h-screen bg-black text-gray-300 p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-white text-2xl font-bold">Musiko.io</h1>
      </div>

      <div className="space-y-6">
        <p className="text-sm text-gray-400">Menu</p>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 hover:text-white cursor-pointer">
            <House size={20} />
            <span>Home</span>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-4 hover:text-white">
              <MagnifyingGlass size={20} />
              <Input
                placeholder="Search playlists..."
                onChange={(e) => handleSearch(e.target.value)}
                className="bg-gray-800 border-none text-black w-full"
              />
            </div>
            {showSearchResults && searchTerm && (
              <div className="bg-gray-800 rounded p-2 mt-2">
                  {track?.length > 0 ? (
                  track.map((playlist) => (
                    <div
                      key={playlist._id}
                      className="py-1 px-2 hover:bg-gray-700 rounded cursor-pointer"
                    >
                      {playlist.title}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-400 text-sm">No results found</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 min-h-20">
        <div
          className="flex justify-between items-center mb-4"
          onClick={handleOpenModal}
        >
          <p className="text-sm text-gray-400">Library</p>
          <button className="text-gray-400 hover:text-white">
            <Plus size={20} />
          </button>
        </div>
        <div className="space-y-4">
          {AllPlaylist?.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between group"
            >
              <div className="flex items-center space-x-4 hover:text-white cursor-pointer">
                <Equalizer size={20} />
                <span>{item.title}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100"
                  onClick={() => handleUpdate(item._id)}
                >
                  <PencilSimple size={20} />
                </button>
                <button
                  className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100"
                  onClick={() => {
                    setId(item._id);
                    setIsModalOpenDelete(true);
                  }}
                >
                  <Trash size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 space-y-4 border-t border-gray-800 pt-4">
        <div className="flex items-center space-x-4 hover:text-white cursor-pointer">
          <Popover
            content={content}
            placement="bottom"
            trigger="click"
            className="flex items-center space-x-4 bg-black"
          >
            <Gear size={20} />
            <span>Settings</span>
          </Popover>
        </div>
        <div className="flex items-center space-x-4 text-yellow-500 hover:text-yellow-400 cursor-pointer">
          <Sparkle size={20} weight="fill" />
          <span>Go Premium</span>
        </div>
      </div>
      <ModalAddLibrary open={openModal} setOpenModal={setOpenModal} />
      <ModalUpdatePlaylist
        open={isModalOpenUpdate}
        setOpenModal={setIsModalOpenUpdate}
        idPlaylist={idPlaylist}
      />
      <ModalComponent
        title="Delete Playlist"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDelete}
      >
        <div>Bạn có chắc xóa sản phẩm này không?</div>
      </ModalComponent>
    </div>
  );
};

export default SidebarComponent;
