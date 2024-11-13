import { Form, Button, Upload, notification } from "antd";
import ModalComponent from "../ModalComponent/Modalcomponent";
import InputComponent from "../InputComponent/InputComponent";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "../../utils";
import { useEffect, useState } from "react";
import { useMutationHook } from "../../hook/UseMutationHook";
import * as Playlist from "../../service/Playlist";
import * as TrackService from "../../service/Tracks";

const ModalUpdatePlaylist = ({ open, setOpenModal, idPlaylist }) => {
  const [form] = Form.useForm();
  const [statePlaylist, setStatePlaylist] = useState({
    title: "",
    albumCover: "",
    trackId: "",
  });
  const fetchGetDetailsTrack = async (idPlaylist) => {
    const res = await Playlist.getPlaylistById(idPlaylist);
    if (res?.data) {
      const playlistData = {
        title: res?.data?.title,
        albumCover: res?.data?.albumCover,
        trackId: res?.data?.tracks[0],
      };
      setStatePlaylist(playlistData);
      form.setFieldsValue(playlistData);
    }
  };

  useEffect(() => {
    if (idPlaylist && open) {
      fetchGetDetailsTrack(idPlaylist);
    }
  }, [idPlaylist, open]);

  const { data: allSongs } = useQuery({
    queryKey: ["allSongs"],
    queryFn: async () => {
      const res = await TrackService.getAllSongs();
      return res;
    },
  });

  const handleCancel = () => {
    form.resetFields();
    setOpenModal(false);
  };

  const handleOnchange = (e) => {
    setStatePlaylist({
      ...statePlaylist,
      [e.target.name]: e.target.value,
    });
  };

  const handleUploadImage = async ({ file }) => {
    try {
      const base64 = await getBase64(file);
      setStatePlaylist({
        ...statePlaylist,
        albumCover: base64,
      });
      form.setFieldsValue({
        albumCover: base64,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const mutation = useMutationHook((data) => {
    Playlist.updatePlaylist(idPlaylist, data);
  });

  const { data: playlists, refetch } = useQuery({
    queryKey: ["allPlaylist"],
    queryFn: async () => {
      const res = await Playlist.getAllPlaylist();
      return res.data;
    }
  });

  const onFinish = () => {
    const data = {
      title: statePlaylist.title,
      albumCover: statePlaylist.albumCover,
      tracks: [statePlaylist.trackId],
    };
    mutation.mutate(data, {
      onSuccess: () => {
        notification.success({
          message: "Success",
          description: "Playlist updated successfully",
        });
        handleCancel();
        setStatePlaylist({
          title: "",
          albumCover: "",
          trackId: "",
        });
      },
      onSettled: () => {
        refetch();
      },
      onError: () => {
        notification.error({
          message: "Error",
          description: "Failed to update playlist",
        });
      },
    });
  };

  return (
    <div>
      <ModalComponent
        forceRender
        title="Update Playlist"
        open={open}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="update_playlist"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          autoComplete="off"
          form={form}
          initialValues={statePlaylist}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input playlist name!" }]}
          >
            <InputComponent
              className="w-full"
              placeholder="Enter playlist title"
              value={statePlaylist.title}
              onChange={handleOnchange}
              name="title"
            />
          </Form.Item>

          <Form.Item
            label="Image"
            name="albumCover"
            rules={[
              {
                required: true,
                validator: (_, value) => {
                  if (!value && !statePlaylist.albumCover) {
                    return Promise.reject("Please upload an image!");
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <div>
              <Upload
                customRequest={handleUploadImage}
                showUploadList={false}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Change Image</Button>
              </Upload>
              {statePlaylist.albumCover && (
                <img
                  src={statePlaylist.albumCover}
                  alt="preview"
                  className="mt-2 w-20 h-20 object-cover rounded"
                />
              )}
            </div>
          </Form.Item>

          <Form.Item
            label="Song"
            name="trackId"
            rules={[{ required: true, message: "Please select a song!" }]}
          >
            <InputComponent
              type="select"
              placeholder="Search for a song"
              onChange={(value) =>
                setStatePlaylist({ ...statePlaylist, trackId: value })
              }
              options={allSongs?.data?.map((song) => ({
                value: song._id,
                label: song.title,
              }))}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </ModalComponent>
    </div>
  );
};

export default ModalUpdatePlaylist;
