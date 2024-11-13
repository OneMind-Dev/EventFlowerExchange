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
import { toast } from "react-toastify";
import { PlusOutlined } from "@ant-design/icons";
import uploadFile from "../../../components/ultils/file";
import api from "../../../components/config/axios";
import { useNavigate } from "react-router-dom";

function SellerManage() {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [form] = Form.useForm();
  const [events, setEvents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState(null);

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

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

  // Fetch categories and add the "Other" option
  const fetchCategories = async () => {
    try {
      const response = await api.get('/EventCate', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCategories([
        ...response.data.map(category => ({
          value: category.categoryId,
          label: category.name
        })),
        { value: "other", label: "Khác" } // Thêm tùy chọn "Khác"
      ]);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchEvent = async () => {
    try {
      const response = await api.get('/AllEvents', {
        headers: { Authorization: `Bearer ${token}` }, // Add the token here
        params: {
          categoryId: "",
          eventName: ""
        }
      });
      setEvents(response.data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
  };


  useEffect(() => {

    fetchCategories();
    fetchEvent();

  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "eventId",
      key: "eventId",
    },
    {
      title: "Hình Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => {
        return <Image src={image || "default-image.jpg"} alt="" width={100} />;
      },
    },
    {
      title: "Phân Loại",
      dataIndex: "categoryName", // Update to match API response structure
      key: "categoryName",
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
            <Button onClick={() => navigate(`/events/${eventId}`)}>
              Chi tiết
            </Button>
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

  // Handle event submission
  const handleSubmitEvent = async (event) => {
    event.userId = user.userId;
    console.log(event.userId);

    if (fileList.length > 0) {
      const file = fileList[0];
      const url = await uploadFile(file.originFileObj);
      event.image = url;
    }

    if (event.startDate) {
      event.startDate = event.startDate.toISOString();
    }
    if (event.endDate) {
      event.endDate = event.endDate.toISOString();
    }

    console.log("Event Data:", event);

    try {
      setSubmitting(true);

      const token = localStorage.getItem("token");

      // Check if the user selected "Other" and provided a new category name
      if (event.categoryId === "other" && newCategoryName) {
        const categoryResponse = await api.post(
          "/EventCate/create",
          { name: newCategoryName },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        event.categoryId = categoryResponse.data.categoryId; // Set new category ID
        console.log(categoryResponse); // Moved inside the if block
      }
      // Now create the event with the updated categoryId
      const response = await api.post("/CreateEvent", event, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Event creation response:", response);
      toast.success("Tạo sự kiện thành công!");
      setOpenModal(false);
      form.resetFields();
      fetchEvent(); // Refresh events list
    } catch (err) {
      console.error("Error creating event:", err);
      toast.error("Failed to create event");
    } finally {
      setSubmitting(false);
    }
  };



  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await api.delete(`deactive/${eventId}`);
      console.log(response.data);
      toast.success("Xóa sự kiện thành công");
      fetchEvent();
    } catch (err) {
      console.log(err);
      toast.error("Xóa sự kiện thất bại");
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
                <Image src={avatarUrl} alt="User Avatar" className="user_avatar" />
              ) : (
                <FaCircleUser className="user_icon" />
              )}

              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className="user_interact">
              <p className="privateInfor" onClick={() => navigate("/profile/userinfo")}>
                Hồ sơ cá nhân</p>
              <p onClick={() => navigate("/profile/changePassword")}>Thay đổi mật khẩu</p>
              <p>Đơn hàng</p>
              <h3 className="privateInfor">Quản lý sự kiện</h3>
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
            <Table columns={columns} dataSource={events} />
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
                  <Input
                    className="infor_container-input"
                    placeholder="Tên sự kiện"
                  />
                </Form.Item>

                <Form.Item
                  name="categoryId"
                  rules={[{ required: true, message: "Hãy chọn loại sự kiện." }]}
                >
                  <Select
                    className="infor_container-catex`gory"
                    allowClear
                    options={categories} // Đảm bảo categories có định dạng đúng
                    placeholder="Loại sự kiện"
                    value={categoryId} // Gán giá trị đã chọn
                    onChange={(value) => {
                      setCategoryId(value); // Lưu giá trị đã chọn vào state
                      setIsOtherSelected(value === "other"); // Kiểm tra nếu chọn "Khác"
                    }}
                  />
                </Form.Item>


                {isOtherSelected && (
                  <Form.Item
                    name="newCategoryName"
                    rules={[{ required: true, message: "Vui lòng nhập tên loại sự kiện." }]}
                  >
                    <Input
                      placeholder="Nhập tên loại sự kiện"
                      onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                  </Form.Item>
                )}

                <Form.Item
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập mô tả.",
                    },
                  ]}
                >
                  <Input
                    className="infor_container-input"
                    placeholder="Mô tả"
                  />
                </Form.Item>

                <Form.Item
                  name="startDate"
                  rules={[
                    { required: true, message: "Hãy chọn thời gian bắt đầu." },
                  ]}
                >
                  <DatePicker
                    className="infor_container-input"
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
                    className="infor_container-input"
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
