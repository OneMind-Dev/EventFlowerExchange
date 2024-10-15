import React, { useEffect, useState } from "react";
import Footer from "../../../components/footer/footer";
import "./sellerManage.css";
import {
  Button,
  Form,
  Popconfirm,
  DatePicker,
  Image,
  Input,
  Modal,
  Table,
  Upload,
  Select,
} from "antd";
import { FaCircleUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/features/userSlice";
import Header from "../../../components/header/header";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";
import { PlusOutlined } from "@ant-design/icons";
import uploadFile from "../../../components/ultils/file";
import api from "../../../components/config/axios";

function SellerManage() {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [form] = Form.useForm();
  const [students, setStudents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result); // Update avatarUrl with the new image
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  const fetchEvent = async () => {
    const response = await api.get("/AllEvents");

    console.log(response.data);
    setStudents(response.data);
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Hình Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => {
        return <Image src={image} alt="" width={100}></Image>;
      },
    },
    {
      title: "Phân Loại",
      dataIndex: "categoryId",
      key: "categoryId",
    },
    {
      title: "Tên Sự Kiện",
      dataIndex: "eventName",
      key: "eventName",
    },
    {
      title: "Hành Động",
      dataIndex: "eventId",
      key: "eventId",
      render: (eventId) => {
        return (
          <>
            <Popconfirm
              title="Xóa sự kiện"
              description="Bạn muốn xóa sự kiện này?"
              onConfirm={() => handleDeleteEvent(eventId)}
            >
              <Button type="primary" danger>
                Xóa
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

  const handleSubmitEvent = async (student) => {
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
      toast.success("Tạo sự kiện thành công!");
      setOpenModal(false);
      //clear du lieu cu
      form.resetFields();
      fetchEvent();
    } catch (err) {
      toast.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await api.delete(`DeleteEvent/${eventId}`);
      toast.success("Xóa thành công");
      fetchEvent();
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
        Tải Lên
      </div>
    </button>
  );

  return (
    <>
      <Header />
      <div className="wrapper">
        <div className="background">
          <div className="user_container">
            <div className="user_infor">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="User Avatar"
                  className="user_avatar"
                />
              ) : (
                <FaCircleUser className="user_icon" />
              )}
              <a className="username" onClick={triggerFileInput}>
                Thay đổi ảnh
              </a>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className="user_interact">
              <h3 className="privateInfor">Hồ sơ cá nhân</h3>
              <p>Thay đổi mật khẩu</p>
              <p>Đơn hàng</p>
              <Popconfirm
                onConfirm={() => dispatch(logout())}
                title="Bạn muốn đăng xuất ?"
              >
                <Button type="primary" danger>
                  ĐĂNG XUẤT
                </Button>
              </Popconfirm>
            </div>
          </div>
          <div className="infor_container">
            <h1>Quản Lý Sự Kiện</h1>
            <Button onClick={handleOpenModal}>Tạo Sự Kiện Mới</Button>
            <Table columns={columns} dataSource={students} />
            {/* {neu true => modal hien, false => an} */}
            <Modal
              confirmLoading={submitting}
              onOk={() => form.submit()}
              open={openModal}
              onCancel={handleCloseModal}
            >
              <p className="infor_container-header">Tạo Sự Kiện Mới</p>
              <Form onFinish={handleSubmitEvent} form={form}>
                {/* rule => dinh nghia validation => [] */}
                <Form.Item
                  name="eventName"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập tên sự kiện.",
                    },
                  ]}
                >
                  <Input placeholder="Tên sự kiện" />
                </Form.Item>

                <Form.Item
                  name="categoryId"
                  rules={[
                    {
                      required: true,
                      message: "Hãy chọn loại sự kiện.",
                    },
                  ]}
                >
                  <Select
                    className="infor_container-category"
                    allowClear
                    options={[
                      {
                        value: "Đám Cưới",
                        label: "Đám Cưới",
                      },
                      {
                        value: "Sinh Nhật",
                        label: "Sinh Nhật",
                      },
                      {
                        value: "Lễ Hội",
                        label: "Lễ Hội",
                      },
                      {
                        value: "Khác",
                        label: "Khác",
                      },
                    ]}
                    placeholder="Loại sự kiện"
                  />
                </Form.Item>

                <Form.Item
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập mô tả.",
                    },
                  ]}
                >
                  <Input placeholder="Mô tả" />
                </Form.Item>

                <Form.Item
                  name="startDate"
                  rules={[
                    { required: true, message: "Hãy chọn thời gian bắt đầu." },
                  ]}
                >
                  <DatePicker
                    showTime={{ format: "HH:mm" }}
                    format="YYYY-MM-DD HH:mm"
                    placeholder="Thời gian bắt đầu"
                  />
                </Form.Item>

                <Form.Item
                  name="endDate"
                  rules={[
                    { required: true, message: "Hãy chọn thời gian kết thúc." },
                  ]}
                >
                  <DatePicker
                    showTime={{ format: "HH:mm" }}
                    format="YYYY-MM-DD HH:mm"
                    placeholder="Thời gian kết thúc"
                  />
                </Form.Item>

                <Form.Item name="image">
                  <p>Thêm hình ảnh : </p>
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
        </div>
      </div>

      <Footer />
    </>
  );
}

export default SellerManage;
