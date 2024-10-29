import { Button, Form, Input, Modal, Table, Popconfirm } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import api from "../../components/config/axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Test() {
  const [students, setStudents] = useState([]);
  const [openModal, setOpenModal] = useState(false); //mac dinh modal dong
  const [submitting, setSubmitting] = useState(false);
  const [form] = useForm();

  const user = useSelector((store) => store.user);

  const { id } = useParams();

  const fetchStudent = async () => {
    const response = await api.get("/Getflowers");

    console.log(response.data);
    setStudents(response.data);
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const handleDeleteEvent = async (flowerId) => {
    try {
      const response = await api.delete(`DeleteFlower/${flowerId}`);
      console.log(response.data);
      toast.success("Xóa hoa thành công");
      fetchStudent();
    } catch (err) {
      console.log(err);
      toast.error("Xóa hoa thất bại");
    }
  };

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
            <Popconfirm
              title="Delete"
              description="Do you want to delete this event?"
              onConfirm={() => handleDeleteEvent(flowerId)}
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

  const handleSubmitStudent = async (student) => {
    student.userId = user.userId;

    try {
      setSubmitting(true); //bat dau load
      const response = await api.post("/CreateFlower", student);
      console.log(response.data);
      toast.success("Successfully create new flower");
      setOpenModal(false);
      form.resetFields();
      fetchStudent();
    } catch (err) {
      toast.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteStudent = async (flowerId) => {
    try {
      await api.delete(`DeleteFlower/${flowerId}`);
      toast.success("Delete successfully");
      fetchStudent();
    } catch (ex) {
      toast.error("Failed to delete flower");
    }
  };

  return (
    <div className="wrapper">
      <h1>Flower Management</h1>
      <Button onClick={handleOpenModal}>Create new flower</Button>
      <Table columns={columns} dataSource={students} />
      {/* {neu true => modal hien, false => an} */}
      <Modal
        confirmLoading={submitting}
        onOk={() => form.submit()}
        title="Create new flower"
        open={openModal}
        onCancel={handleCloseModal}
      >
        <Form onFinish={handleSubmitStudent} form={form}>
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

export default Test;
