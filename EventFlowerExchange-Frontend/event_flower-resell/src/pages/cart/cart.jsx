import { Button, Image, Table } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../components/config/axios";
import { toast } from "react-toastify";
import Header from "../../components/header/header";

function CartPage() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const data = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "image",
      //render: (image) => <Image width={200} src={image} />,
    },
    {
      title: "Tên",
      dataIndex: "name",
    },
    {
      title: "Mô Tả",
      dataIndex: "desciption",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      title: "Giá",
      dataIndex: "price",
    },
  ];

  return (
    <>
      <Header />
      <div className="wrapper">
        <Button>Clear all</Button>
        <Table
          rowKey="id"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />

        <Button>Buy</Button>
      </div>
    </>
  );
}

export default CartPage;
