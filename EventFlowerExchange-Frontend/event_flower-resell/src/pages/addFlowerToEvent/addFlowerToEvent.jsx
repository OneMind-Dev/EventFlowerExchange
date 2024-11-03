import {
  Button,
  Form,
  Input,
  Modal,
  Table,
  Popconfirm,
  Upload,
  Image,
  InputNumber,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import api from "../../components/config/axios";
import { useSelector } from "react-redux";
import Footer from "../../components/footer/footer";
import { useParams } from "react-router-dom";

function AddFlowerToEvent() {
  const [students, setStudents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModal1, setOpenModal1] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [selectedFlowerId, setSelectedFlowerId] = useState(null);

  const [formCreateFlower] = useForm();
  const [formAddFlower] = useForm();

  const { id } = useParams();

  const user = useSelector((store) => store.user);

  const fetchStudent = async () => {
    const response = await api.get("/Getflowers");

    console.log(response.data);
    setStudents(response.data);
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const handleAddFlower = async (event) => {
    event.eventId = parseInt(id, 10);
    event.flowerId = selectedFlowerId;

    try {
      setSubmitting(true); //bat dau load
      const response = await api.post("/AddFlowerToEvent", event);
      console.log(response.data);
      toast.success("Thêm hoa thành công!");
      setOpenModal(false);
      formAddFlower.resetFields();
      fetchStudent();
    } catch (err) {
      toast.error(err);
    } finally {
      setSubmitting(false);
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

  const handleOpenModal = (flowerId) => {
    setSelectedFlowerId(flowerId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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
  const columns = [
    {
      title: "ID",
      dataIndex: "flowerId",
      key: "flowerId",
    },
    {
      title: "Tên Hoa",
      dataIndex: "flowerName",
      key: "flowerName",
    },
    {
      title: "Màu Sắc",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Nguồn Gốc",
      dataIndex: "origin",
      key: "origin",
    },
    {
      title: "Action",
      dataIndex: "flowerId",
      key: "flowerId",
      render: (flowerId) => {
        return (
          <>
            <Button onClick={() => handleOpenModal(flowerId)} type="primary">
              Thêm
            </Button>
            <Modal
              confirmLoading={submitting}
              onOk={() => formAddFlower.submit()}
              open={openModal}
              onCancel={handleCloseModal}
            >
              <p className="infor_container-header">Thêm Hoa Vào Sự Kiện</p>
              <Form onFinish={handleAddFlower} form={formAddFlower}>
                {/* rule => dinh nghia validation => [] */}
                <Form.Item
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập mô tả cho hoa.",
                    },
                  ]}
                >
                  <Input
                    className="infor_container-input"
                    placeholder="Mô tả"
                  />
                </Form.Item>

                <Form.Item
                  name="floPrice"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập giá bán của hoa.",
                    },
                  ]}
                >
                  <InputNumber
                    suffix="VND"
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    style={{
                      width: "100%",
                    }}
                    placeholder="Giá bán"
                  />
                </Form.Item>

                <Form.Item
                  name="quantity"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập số lượng hoa.",
                    },
                  ]}
                >
                  <InputNumber min={1} placeholder="Số lượng" />
                </Form.Item>

                <Form.Item name="image">
                  <p>Thêm hình ảnh :</p>
                  <Upload
                    action="https://6725f1d9c39fedae05b65f25.mockapi.io/api/upload" // MockAPI URL
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
          </>
        );
      },
    },
  ];

  const handleOpenModal1 = () => {
    setOpenModal1(true);
  };

  const handleCloseModal1 = () => {
    setOpenModal1(false);
  };

  const handleSubmitStudent = async (student) => {
    student.userId = user.userId;

    try {
      setSubmitting(true); //bat dau load
      const response = await api.post("/CreateFlower", student);
      console.log(response.data);
      toast.success("Successfully create new flower");
      setOpenModal(false);
      formCreateFlower.resetFields();
      fetchStudent();
    } catch (err) {
      toast.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="wrapper">
      <h1>Flower Management</h1>
      <Button onClick={handleCloseModal1}>Create new flower</Button>
      <Table columns={columns} dataSource={students} />
      {/* {neu true => modal hien, false => an} */}
      <Modal
        confirmLoading={submitting}
        onOk={() => formCreateFlower.submit()}
        title="Create new flower"
        open={openModal1}
        onCancel={handleCloseModal1}
      >
        <Form onFinish={handleSubmitStudent} form={formCreateFlower}>
          {/* rule => dinh nghia validation => [] */}
          <Form.Item
            label="Flower name"
            name="flowerName"
            rules={[
              {
                required: true,
                message: "Please input flower's name",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Color"
            name="color"
            rules={[
              {
                required: true,
                message: "Please input flower's color",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Origin"
            name="origin"
            rules={[
              {
                required: true,
                message: "Please input flower's origin",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AddFlowerToEvent;
