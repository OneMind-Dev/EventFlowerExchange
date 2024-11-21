import { Button, Form, Image, Input, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./sellerRegister.css";
import { useState } from "react";
import AuthenTemplate from "../../components/authen-template/authen-template";
import FormItem from "antd/es/form/FormItem";
import { useDispatch, useSelector } from "react-redux";
import api from "../../components/config/axios";
import { toast } from "react-toastify";
import { login } from "../../redux/features/userSlice";
import uploadFile from "../../components/ultils/file";
import { useNavigate } from "react-router-dom";

function SellerRegister() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSellerRegister = async (values) => {
    values.role = 'SELLER';

    // Handle image upload
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj;
      try {
        const base64Image = await getBase64(file);
        const uploadResponse = await api.post('/upload', { image: base64Image }); // Upload image to backend
        values.image = uploadResponse.data.url; // Attach uploaded image URL to form values
      } catch (error) {
        console.error('Image upload failed:', error);
        toast.error('Failed to upload image');
        return; // Stop submission if image upload fails
      }
    }

    try {
      const response = await api.post(`users/registerRole/${user.userId}`, values);
      toast.success('Đăng ký chờ được phê duyệt');
      dispatch(login(response.data));
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('Đăng ký thất bại');
    }
  };

  // Convert file to base64 format
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
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Tải Lên</div>
    </div>
  );


  return (
    <>
      <AuthenTemplate>
        <Form
          labelCol={{
            span: 24,
          }}
          onFinish={handleSellerRegister}
        >
          <h2>Trở thành Người bán</h2>
          <FormItem
            className="input-box"
            name="citizenId"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số CCCD.",
              },
            ]}
          >
            <Input className="input" type="text" placeholder="Số CCCD" />
          </FormItem>

          <Form.Item name="image">
            <p className="add-img">Thêm hình ảnh:</p>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={(file) => {
                const reader = new FileReader();
                reader.onload = () => {
                  const base64Image = reader.result;
                  sessionStorage.setItem('uploadeEventdImage', base64Image); // Store image in session
                };
                reader.readAsDataURL(file);
                return false; // Prevent automatic upload
              }}
            >
              {fileList.length >= 2 ? null : uploadButton}
            </Upload>
          </Form.Item>

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

          <Button htmlType="submit" className="register-login__btn">
            ĐĂNG KÝ
          </Button>
        </Form>
      </AuthenTemplate>
    </>
  );
}

export default SellerRegister;
