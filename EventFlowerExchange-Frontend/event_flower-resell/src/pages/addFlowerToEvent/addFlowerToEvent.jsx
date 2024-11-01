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
  const [flowers, setFlowers] = useState([]);
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

  const fetchFlowers = async () => {
    const response = await api.get("/Getflowers");

    console.log("fetchflower: ", response.data);
    setFlowers(response.data);
  };

  const token = localStorage.getItem("token");
  console.log("user token: ", token);

  useEffect(() => {
    fetchFlowers();
  }, []);

  const handleAddFlower = async (values) => {
    // Extract the necessary fields from the form values
    const { description, floPrice, quantity, img } = values;

    // Prepare the data for the API request
    const flowerData = {
      description: description,
      floPrice: floPrice,
      img: img ? img[0].response.url : '', // Adjust according to your upload response
      quantity: quantity,
      floId: selectedFlowerId,
      eventId: parseInt(id, 10),
    };

    try {
      // Show loading indicator or disable the form temporarily
      setSubmitting(true);

      // Make the API request to add the flower to the event
      const response = await api.post('/AddFlowerToEvent', flowerData);

      // Handle successful response
      console.log(response.data);
      toast.success('Thêm hoa thành công!');
      formAddFlower.resetFields(); // Reset the form after submission

      // Optionally, refresh data or perform further actions
      fetchFlowers(); // Assuming this function fetches the updated flower data

    } catch (error) {
      // Handle any errors that occur during the request
      toast.error(error.message || 'Có lỗi xảy ra, vui lòng thử lại!');
    } finally {
      // Reset submitting state regardless of the outcome
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

                <Form.Item name="img">
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
          </>
        );
      },
    },
  ];

  const handleCloseModal1 = () => {
    setOpenModal1(false);
  };

  const handleSubmitFlower = async (flower) => {
    // Ensure `flower` object follows the specified format
    flower = {
      flowerName: flower.flowerName,
      userId: user.userId,
      origin: flower.origin,
      color: flower.color
    };

    console.log("flower:", flower);

    try {
      setSubmitting(true); // start loading indicator

      // Send the formatted flower object in the request body
      const response = await api.post("/CreateFlower", flower, {
        headers: {
          Authorization: `Bearer ${token}`, // Replace `token` with your actual token variable
        }
      });

      console.log("handleSubmitFlower Response data:", response.data);
      toast.success("Successfully created new flower");
      setOpenModal(false);
      formCreateFlower.resetFields();
      fetchFlowers();
    } catch (err) {
      toast.error(err.message || "Failed to create flower");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="wrapper">
      <h1>Flower Management</h1>
      <Button onClick={() => setOpenModal1(true)}>Create new flower</Button>
      <Table columns={columns} dataSource={flowers} />
      {/* {neu true => modal hien, false => an} */}
      <Modal
        confirmLoading={submitting}
        onOk={() => formCreateFlower.submit()}
        title="Create new flower"
        open={openModal1}
        onCancel={handleCloseModal1}
      >
        <Form onFinish={handleSubmitFlower} form={formCreateFlower}>
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
