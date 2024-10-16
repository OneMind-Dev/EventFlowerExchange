import {
  Button,
  DatePicker,
  Form,
  Image,
  Input,
  Modal,
  Popconfirm,
  Table,
  Upload,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PlusOutlined } from "@ant-design/icons";
import uploadFile from "../../components/ultils/file";
import api from "../../components/config/axios";
import { useSelector } from "react-redux";

function Test() {
  const [students, setStudents] = useState([]);
  const [openModal, setOpenModal] = useState(false); //mac dinh modal dong
  const [submitting, setSubmitting] = useState(false);
  const [form] = useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const user = useSelector((store) => store.user);

  const fetchStudent = async () => {
    // lay du lieu tu back-end

    // promise = function bat dong bo => can thoi gian de thuc hien
    // await: doi toi khi ma api tra ve ket qua
    const response = await api.get("/AllEvents");

    console.log(response.data);
    setStudents(response.data);
    // GET => lay du lieu
  };

  //[]: dependency array
  useEffect(() => {
    // hanh dong
    // chay 1 hanh dong j do
    // event
    // [] => chay khi load trang lan dau
    // [number] => chay moi khi ma number thay doi
    fetchStudent();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => {
        return <Image src={image} alt="" width={100}></Image>;
      },
    },
    {
      title: "Category ID",
      dataIndex: "categoryId",
      key: "categoryId",
    },
    {
      title: "Event Name",
      dataIndex: "eventName",
      key: "eventName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      dataIndex: "eventId",
      key: "eventId",
      render: (eventId) => {
        return (
          <>
            <Popconfirm
              title="Delete"
              description="Do you want to delete this event?"
              onConfirm={() => handleDeleteStudent(eventId)}
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmitStudent = async (student) => {
    // xu ly lay thong tin student trong form
    //post xuong API
    // console.log(student);
    student.userId = user.userId;

    if (fileList.length > 0) {
      const file = fileList[0];
      console.log(file);
      const url = await uploadFile(file.originFileObj);
      student.image = url;
    }

    // Chuyển đổi ngày giờ từ RangePicker thành định dạng ISO 8601
    if (student.startDate) {
      student.startDate = student.startDate.toISOString();
    }
    if (student.endDate) {
      student.endDate = student.endDate.toISOString();
    }

    //day data xuong cho BE
    try {
      setSubmitting(true); //bat dau load
      const response = await api.post("/CreateEvent", student);
      // => thanh cong
      toast.success("Successfully create new event");
      setOpenModal(false);
      //clear du lieu cu
      form.resetFields();
      fetchStudent();
    } catch (err) {
      toast.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteStudent = async (eventId) => {
    try {
      await api.delete(`DeleteEvent/${eventId}`);
      toast.success("Delete successfully");
      fetchStudent();
    } catch (ex) {
      toast.error("Failed to delete student");
    }
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  return (
    <div className="wrapper">
      <h1>Event Management</h1>
      <Button onClick={handleOpenModal}>Create new event</Button>
      <Table columns={columns} dataSource={students} />
      {/* {neu true => modal hien, false => an} */}
      <Modal
        confirmLoading={submitting}
        onOk={() => form.submit()}
        title="Create new event"
        open={openModal}
        onCancel={handleCloseModal}
      >
        <Form onFinish={handleSubmitStudent} form={form}>
          {/* rule => dinh nghia validation => [] */}
          <Form.Item
            label="Event name"
            name="eventName"
            rules={[
              {
                required: true,
                message: "Please input event's name",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Category"
            name="categoryId"
            rules={[
              {
                required: true,
                message: "Please input event's category",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input event's description",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[{ required: true, message: "Please select start date" }]}
          >
            <DatePicker
              showTime={{ format: "HH:mm" }}
              format="YYYY-MM-DD HH:mm"
            />
          </Form.Item>

          <Form.Item
            label="End Date"
            name="endDate"
            rules={[{ required: true, message: "Please select end date" }]}
          >
            <DatePicker
              showTime={{ format: "HH:mm" }}
              format="YYYY-MM-DD HH:mm"
            />
          </Form.Item>

          <Form.Item label="image" name="image">
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
}

export default Test;
