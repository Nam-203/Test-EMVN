import { Button, Form, notification, Upload } from "antd";
import InputComponent from "../InputComponent/InputComponent";
import { useEffect, useState } from "react";
import * as TrackService from "../../service/Tracks.js";
import {  useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import ModalComponent from "../ModalComponent/Modalcomponent";
import TableComponent from "../TableComponent/TableComponent";
import { useMutationHook } from "../../hook/UseMutationHook";
import { getBase64 } from "../../utils.js";

const DashBoardTrack = () => {
  const [rowSelected, setRowSelected] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);

  const [stateTrackDetails, setStateTrackDetails] = useState({
    title: "",
    artist: "",
    genre: "", 
    duration: "",
    audioFile: "",
    image: "",
  });

  const [form] = Form.useForm();



  const mutationDeleted = useMutationHook((data) => {
    const { id } = data;
    const res = TrackService.deleteTrack(id);
    return res;
  });
  const { isSuccess, isError } = mutationDeleted;
  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message: "Success",
        description: "Track deleted successfully",
      });
    } else if (isError) {
      notification.error({
        message: "Error",
        description: "Failed to delete track",
      });
    }
  }, [isSuccess, isError]);

  const fetchGetDetailsTrack = async (rowSelected) => {
    const res = await TrackService.getDetailsTrack(rowSelected);
    if (res?.data) {
      setStateTrackDetails({
        title: res?.data?.title,
        artist: res?.data?.artist,
        genre: res?.data?.genre,
        duration: res?.data?.duration,
        audioFile: res?.data?.audioFile,
        iame: "",
      });
    }
  };

  useEffect(() => {
    form.setFieldsValue(stateTrackDetails);
  }, [form, stateTrackDetails]);

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      (true);
      fetchGetDetailsTrack(rowSelected);
    }
  }, [rowSelected, isOpenDrawer]);

  const handleDetailsTrack = () => {
    setIsOpenDrawer(true);
  };



 
  const queryClient = useQueryClient();
  const fetchTracks = async () => {
    const res = await TrackService.getAllSongs();
    return res;
  };
  const { data: tracks,isLoading } = useQuery({ queryKey: ["track"], queryFn: fetchTracks});

  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined
          className="actionBtn deleteBtn"
          onClick={() => setIsModalOpenDelete(true)}
        />
        <EditOutlined
          className="actionBtn editBtn"
          onClick={handleDetailsTrack}
        />
      </div>
    );
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.length - b.title.length,
    },
    {
      title: "Artist", 
      dataIndex: "artist",
      sorter: (a, b) => a.artist.length - b.artist.length,
    },
    {
      title: "Genre",
      dataIndex: "genre",
    },
    {
      title: "Duration",
      dataIndex: "duration", 
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];

  const dataTable =
    tracks?.data?.length > 0 &&
    tracks?.data?.map((track) => {
      return {
        ...track,
        key: track._id,
      };
    });

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateTrackDetails({
      title: "",
      artist: "",
      genre: "",
      duration: "",
      audioFile: "",
      image: "",
    });
    form.resetFields();
  };

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleDeleteTrack = () => {
    mutationDeleted.mutate(
      { id: rowSelected },
      {
        onSettled: () => {
          queryClient.invalidateQueries(["tracks"]);
        },
      }
    );
  };

  const handleOnchangeDetails = (e) => {
    setStateTrackDetails({
      ...stateTrackDetails,
      [e.target.name]: e.target.value,
    });
  };
  const onUpdateTrack = () => {
    mutationUpdate.mutate(
      { id: rowSelected,...stateTrackDetails },
      {
        onSettled: () => {
          queryClient.invalidateQueries(["tracks"]);
        },
      }
    );
  };
  const mutationUpdate = useMutationHook((data) => {
    const { id, ...rests } = data;
    const res = TrackService.updateTrack(id, { ...rests });
    return res;
  });
  const {isSuccess: isSuccessUpdate, isError: isErrorUpdate} = mutationUpdate;
  useEffect(() => {
    if (isSuccessUpdate) {
      notification.success({
        message: "Success",
        description: "Track updated successfully",
      });
      setIsModalOpenDelete(false);
    } else if (isErrorUpdate) {
      notification.error({
        message: "Error",
        description: "Failed to update track",
      });
    }
  }, [isSuccessUpdate, isErrorUpdate]);
  const mutationCreate = useMutationHook((data) => {
    const res = TrackService.createTrack(data);
    return res;
  });
  const { isSuccess: isSuccessCreate, isError: isErrorCreate } = mutationCreate;
  useEffect(() => {
    if (isSuccessCreate) {
      notification.success({
        message: "Success", 
        description: "Track created successfully",
      });
    } else if (isErrorCreate) {
      notification.error({
        message: "Error",
        description: "Failed to create track",
      });
    }
  }, [isSuccessCreate, isErrorCreate]);
  return (
    <div>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
        backgroundColor: "white",
        marginBottom: "-20px"
      }}>
        <div style={{ fontWeight: "bold", fontSize: "20px" }}>
          TRACK MANAGEMENT
        </div>
        <Button type="primary" onClick={() => setIsModalOpenCreate(true)}>
          Create Track
        </Button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <TableComponent
          columns={columns}
          isLoading={isLoading}
          data={dataTable}
          onRow={(record) => ({
            onClick: () => setRowSelected(record._id)
          })}
        />
      </div>

      <ModalComponent
        title="TRACK DETAILS"
        isOpen={isOpenDrawer}
        onCancel={handleCloseDrawer}
        width="30%"
        footer={null}
      >
        <Form
          name="basic"
          onFinish={onUpdateTrack}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input track title!" }]}
          >
            <InputComponent
              value={stateTrackDetails.title}
              onChange={handleOnchangeDetails}
              name="title"
            />
          </Form.Item>

          <Form.Item
            label="Artist"
            name="artist"
            rules={[{ required: true, message: "Please input artist name!" }]}
          >
            <InputComponent
              value={stateTrackDetails.artist}
              onChange={handleOnchangeDetails}
              name="artist"
            />
          </Form.Item>

          <Form.Item
            label="Genre"
            name="genre"
            rules={[{ required: true, message: "Please input genre!" }]}
          >
            <InputComponent
              value={stateTrackDetails.genre}
              onChange={handleOnchangeDetails}
              name="genre"
            />
          </Form.Item>

          <Form.Item
            label="Duration"
            name="duration"
            rules={[{ required: true, message: "Please input duration!" }]}
          >
            <InputComponent
              value={stateTrackDetails.duration}
              onChange={handleOnchangeDetails}
              name="duration"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 19, span: 16 }}>
            <Button type="primary" htmlType="submit"onClick={onUpdateTrack}>
              Update
            </Button>
          </Form.Item>
        </Form>
      </ModalComponent>

      <ModalComponent
        title="Delete Track"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteTrack}
      >
        <div>Are you sure you want to delete this track?</div>
      </ModalComponent>

      <ModalComponent
        title="Create Track"
        open={isModalOpenCreate} 
        onCancel={() => {
          setIsModalOpenCreate(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form
          form={form}
          name="create-track"
          onFinish={async(values) => {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('artist', values.artist);
            formData.append('genre', values.genre);
            formData.append('duration', values.duration);
            formData.append('releaseYear', values.releaseYear); 
            if (values.audioFile?.file) {
              formData.append('audioFile', values.audioFile.file);
            }
            if (values.image?.file) {
                const base64Image = await getBase64(values.image.file);
                formData.append('image', base64Image);
            }
            mutationCreate.mutate(formData, {
              onSuccess: () => {
                notification.success({
                  message: 'Success',
                  description: 'Track created successfully'
                });
                setIsModalOpenCreate(false);
                form.resetFields();
                queryClient.invalidateQueries(["tracks"]);
              },
              onError: (error) => {
                notification.error({
                  message: 'Error',
                  description: error.message || 'Failed to create track'
                });
              }
            });
          }}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input title!" }]}
          >
            <InputComponent />
          </Form.Item>

          <Form.Item
            label="Artist"
            name="artist"
            rules={[{ required: true, message: "Please input artist name!" }]}
          >
            <InputComponent />
          </Form.Item>

          <Form.Item
            label="Genre"
            name="genre"
            rules={[{ required: true, message: "Please input genre!" }]}
          >
            <InputComponent />
          </Form.Item>

          <Form.Item
            label="Duration"
            name="duration"
            rules={[{ required: true, message: "Please input duration!" }]}
          >
            <InputComponent type="number" />
          </Form.Item>

          <Form.Item
            label="Release Year"
            name="releaseYear"
            rules={[{ required: true, message: "Please input release year!" }]}
          >
            <InputComponent type="number" />
          </Form.Item>

          <Form.Item
            label="Audio File"
            name="audioFile"
            rules={[{ required: true, message: "Please upload audio file!" }]}
          >
        
            <Upload maxCount={1} beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Upload Audio File</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
            rules={[{ required: true, message: "Please upload image!" }]}
          >
        
            <Upload maxCount={1} beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 19, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </ModalComponent>
    </div>
  );
};

export default DashBoardTrack;
