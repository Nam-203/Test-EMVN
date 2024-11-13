import { Form, Button, Upload, Select, notification } from "antd";
import ModalComponent from "../ModalComponent/Modalcomponent";
import InputComponent from "../InputComponent/InputComponent";
import { useQuery } from "@tanstack/react-query";
import { UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "../../utils";
import { useEffect, useState } from "react";
import { useMutationHook } from "../../hook/UseMutationHook";
import * as Playlist from "../../service/Playlist";

const ModalAddLibrary = ({ open, setOpenModal }) => {
  const [form] = Form.useForm();
  const [stateLibrary, setStateLibrary] = useState({
    title: "",
    albumCover: "",
    trackId: "",
  });

  const { data: allSongs } = useQuery({
    queryKey: ["allSongs"],
  });

  const handleCancel = () => {
    form.resetFields();
    setOpenModal(false);

  };

  const handleOnchange = (e) => {
    setStateLibrary({
      ...stateLibrary,
      [e.target.name]: e.target.value,
    });
  };

  const handleUploadImage = async ({ file }) => {
    try {
      const base64 = await getBase64(file);
      setStateLibrary({
        ...stateLibrary,
        albumCover: base64,
      });
      form.setFieldsValue({
        albumCover: base64,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const dataPlaylist = useQuery({
    queryKey: ["allPlaylist"],
  });

  const mutation = useMutationHook((data) => Playlist.createPlaylist(data));
  const { isSuccess, isError } = mutation;
  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message: "Success",
        description: "Playlist created successfully",
      });
    } else if (isError) {
      notification.error({
        message: "Error",
        description: "Failed to create playlist",
      });
    }
  }, [isSuccess, isError]);

  const onFinish = () => {
    const data = {
      title: stateLibrary.title,
      albumCover: stateLibrary.albumCover,
      tracks: stateLibrary.trackId,
    };
    mutation.mutate(data, {
      onSettled: () => {
        dataPlaylist.refetch();
      },
    });
    handleCancel();
  };

  return (
    <div>
      <ModalComponent
        forceRender
        title="Create Library"
        open={open}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input library name!" }]}
          >
            <InputComponent
              className="w-full"
              placeholder="Enter library title"
              value={stateLibrary.title}
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
                  if (!value && !stateLibrary.albumCover) {
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
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>
              {stateLibrary.albumCover && (
                <img
                  src={stateLibrary.albumCover}
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
            <Select
              showSearch
              placeholder="Search for a song"
              optionFilterProp="children"
              onChange={(value) =>
                setStateLibrary({ ...stateLibrary, trackId: value })
              }
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={allSongs?.data?.map((song) => ({
                value: song._id,
                label: song.title,
              }))}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </ModalComponent>
    </div>
  );
};

export default ModalAddLibrary;
