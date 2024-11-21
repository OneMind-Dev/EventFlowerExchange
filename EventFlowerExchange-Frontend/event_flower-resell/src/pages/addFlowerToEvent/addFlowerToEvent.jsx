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
import uploadFile from "../../components/ultils/file";
import api from "../../components/config/axios";
import { useSelector } from "react-redux";
import Footer from "../../components/footer/footer";
import { useParams } from "react-router-dom";
import Header from "../../components/header/header";

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

  // Convert file to base64 format
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });


  const handleAddFlower = async (values) => {
    const { description, floPrice, quantity, img } = values;  // Extract values from form

    // Prepare the flower data
    const flowerData = {
      description: description,
      floPrice: floPrice,
      quantity: quantity,
      floId: selectedFlowerId,  // Assuming this is available elsewhere in your component
      eventId: parseInt(id, 10),  // Assuming 'id' is the event ID you want to associate the flower with
    };

    // Handle image upload if an image is selected
    if (fileList.length > 0) {
      const file = fileList[0];
      try {
        // Upload image and get the URL
        const url = await uploadFile(file.originFileObj);  // Assuming uploadFile is a function that handles the image upload
        flowerData.img = url;  // Add the uploaded image URL to the flower data
      } catch (error) {
        console.error("Image upload failed:", error);
        toast.error("Failed to upload image");
        return;  // Stop submission if the image upload fails
      }
    }

    console.log("Flower Data:", flowerData);  // Log the data for debugging

    try {
      setSubmitting(true);  // Show the loading indicator

      // Make the API request to add the flower to the event
      const response = await api.post("/AddFlowerToEvent", flowerData);
      console.log("Add Flower Response:", response.data);
      toast.success("Thêm hoa thành công!");  // Success message

      formAddFlower.resetFields();  // Reset form fields after submission
      fetchFlowers();  // Refresh the flower data if needed

    } catch (error) {
      console.error("Error adding flower:", error);
      toast.error(error.message || "Có lỗi xảy ra, vui lòng thử lại!");  // Error message
    } finally {
      setSubmitting(false);  // Hide the loading indicator after submission
    }
  };

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

                <p>Mô tả hoa</p>
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
                <p>Giá</p>
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
                <p>Số lượng hoa</p>
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
    <>
      <Header />
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
              label="Tên hoa"
              name="flowerName"
              rules={[
                {
                  required: true,
                  message: "Xin hãy nhập tên hoa",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Màu sắc"
              name="color"
              rules={[
                {
                  required: true,
                  message: "Xin hãy nhập màu hoa",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Nguồn gốc"
              name="origin"
              rules={[
                {
                  required: true,
                  message: "Xin hãy nhập nguồn gốc của hoa",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}

export default AddFlowerToEvent;
