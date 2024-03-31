import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { categoryApi } from "../../api/category.api";
import { playerApi } from "../../api/player.api";
import { productApi } from "../../api/product.api";
import LoadingFull from "../../component/loading/loadingFull";
import { showMessErr } from "../../ultis/helper";
import useProductStore from "../../zustand/productStore";
import "./../login/login.css";

const { Option } = Select;
const AddProduct = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const isEditProfile = location.pathname.includes("profile");
  const { id } = useParams();
  const [url, setUrl] = useState([]);
  const [imageName, setImageName] = useState("");
  const [loading, setLoading] = useState(false);
  const products = useProductStore((state) => state.products);
  const [isCustom, setIsCustom] = useState(false);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [txtErr, settxterr] = useState("");
  const [listPlayer, setListPlayer] = useState([]);
  const [dataImage, setDataImage] = useState([]);
  const [listSize, setListSize] = useState([
    {
      id: Math.random() * 100,
      size: "",
      quantity: "",
    },
  ]);

  // Change Size
  const changeSize = (id, newValue, field = "size") => {
    const newListSize = [...listSize];
    const index = listSize.findIndex((i) => i.id === id);
    if (index >= 0) {
      newListSize[index][field] = newValue;
      setListSize(newListSize);
    }
  };
  // Confirm save
  const confirmSave = (value) => {
    // if (url.length === 0) {
    //   settxterr("Vui lòng chọn ảnh");
    //   return;
    // } else {
    //   settxterr("");
    // }

    Modal.confirm({
      title: "Xác nhận",
      content: !id ? "Thêm sản phẩm" : "Cập nhật sản phẩm",
      onOk: async () => {
        const dataPosst = JSON.parse(JSON.stringify(value));
        dataPosst.imagesProductList = dataImage.map(
          (i) => i.image + "*" + i.playerId
        );
        const listSizePost = Array.from(
          new Set(listSize.filter((i) => i.size))
        );
        let sizeFk = "";
        dataPosst.size = listSizePost.forEach((item, index) => {
          let sizeItem = item.size + "-" + item.quantity;
          if (index !== listSizePost.length - 1) {
            sizeItem += ";";
          }
          sizeFk = sizeFk + sizeItem;
        });
        dataPosst.isCustomise = isCustom;
        dataPosst.size = sizeFk;
        dataPosst.description =  dataPosst.description + "*" +sizeFk
        dataPosst.quantity=100;
        const res = !id
          ? await productApi.createrProduct(dataPosst)
          : await productApi.updateProduct(id, dataPosst);
        if (res.data.status === 200 || res.data.status === 204) {
          Modal.success({
            title: "Thành công",
            content: !id ? "Thêm thành công" : "Cập nhật thành công",
          });
          navigate(-1);
        } else {
          showMessErr(res.data);
        }
      },
    });
  };
  const handleChangeFile = (id) => (event) => {
    const files = event.target.files;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();

      // Xử lý sự kiện khi FileReader hoàn thành đọc tệp
      reader.onload = function (event) {
        const base64 = event.target.result;
        const index = dataImage.findIndex((i) => i.id === id);
        if (index >= 0) {
          const newDataImage = [...dataImage];
          newDataImage[index].image = base64;
          setDataImage(newDataImage);
        }
      };

      // Đọc tệp như là một chuỗi base64
      reader.readAsDataURL(file);
    });
  };

  const getDetail = async () => {
    try {
      setLoading(true);
    const res = await productApi.getDetailProduct(id);
    const data = res.data.data;
    const listImage = res.data.data.imagesProductList
      ? res.data.data.imagesProductList.map((i) => i.path)
      : [];
    setUrl(listImage);
    setIsCustom(data.isCustomise);
    const imagesProductList = Array.from(new Set(data.imagesProductList.map(i => i.path)));
    let dataImage = [];
    imagesProductList.forEach((item,index) => {
     
      const arrImage = item.split("*");
      dataImage.push({
        id:index,
        image:arrImage[0],
        playerId:Number(arrImage[1])
      })
    })
   
    setDataImage(dataImage)
    // des
    const arrDes = data.description.split("*");
    data.description = arrDes[0];
    const listSize = arrDes[1];
    const arrSize = listSize.split(";");
    const sizes = [];
    arrSize.forEach((item,index) => {
    
      const arr = item.split("-");
      sizes.push({
        id:index,
        size:arr[0],
        quantity:arr[1]
      })
      
    })
    setListSize(sizes)
    
    const categoryName = data.categoryId?.name;
    data.categoryName = categoryName;

    form.setFieldsValue(data);
    setLoading(false);
    } catch (error) {
      console.log(error)

      setLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      getDetail();
    }
  }, [id]);

  // get list category
  const getListCategory = async () => {
    const res = await categoryApi.getListCategory();
    const data = res.data.data;
    setCategories(data);
  };
  useEffect(() => {
    getListCategory();
  }, []);

  // column image
  const columnImage = [
    {
      title: (
        <>
          {" "}
          <Button
            onClick={() =>
              setDataImage([
                ...dataImage,
                {
                  id: Date.now(),
                  image: "",
                  playerId: "",
                },
              ])
            }
            size="small"
            style={{
              marginRight: 20,
            }}
          >
            <PlusOutlined />
          </Button>
          Tên cầu thủ và số áo
        </>
      ),
      dataIndex: "playerName",
      align: "start",
      render: (value, row) => {
        return (
          <Select
            onChange={(v) => {
              const index = dataImage.findIndex((i) => i.id === row.id);
              if (index >= 0) {
                const newDataImage = [...dataImage];
                dataImage[index].playerId = v;
                setDataImage(newDataImage);
              }
            }}
            value={row.playerId}
            style={{ width: "100%" }}
          >
            {listPlayer.map((i) => (
              <Option
                disabled={dataImage.map((i) => i.playerId).includes(i.id)}
                value={i.id}
              >
                {i.numberPlayer + "." + i.name}
              </Option>
            ))}
          </Select>
        );
      },
    },
    {
      title: "Ảnh sản phẩm",
      dataIndex: "image",
      align: "center",
      render: (value, row) => {
        return (
          <>
            <input
              id={row.id}
              type="file"
              style={{
                display: "none",
              }}
              onChange={handleChangeFile(row.id)}
            />
            <Avatar
              onClick={() => {
                const element = document.getElementById(row.id);
                if (element) {
                  element.click();
                }
              }}
              style={{
                cursor: "pointer",
              }}
              size={"large"}
              src={value}
            />
          </>
        );
      },
    },

    {
      title: "Xóa",
      dataIndex: "delete",
      align: "center",
      render: (_, row) => {
        return (
          <DeleteOutlined
            onClick={() => {
              setDataImage(dataImage.filter((i) => i.id !== row.id));
            }}
          />
        );
      },
    },
  ];

  // list player
  const getListPlayer = async () => {
    const res = await playerApi.searchPlayer({ query: "" });
    console.log(res);
    const status = res.data.status;
    if (status === 200 || status === 204) {
      setListPlayer(res.data.data || []);
    }
  };
  useEffect(() => {
    getListPlayer();
  }, []);
  return (
    <Card style={{}}>
      <h2 style={{ marginBottom: 10 }}>
        {!id ? "Thêm sản phẩm" : "Cập nhật sản phẩm"}
      </h2>
      <Row gutter={[64, 64]}>
        <Col span={10}>
          <Form
            form={form}
            wrapperCol={{ span: 24 }}
            onFinish={confirmSave}
            layout="vertical"
          >
            <div className="inputLabel">Tên sản phẩm</div>
            <Form.Item
              name="productName"
              rules={[
                { required: true, message: "Vui lòng nhập tên sản phẩm!" },
              ]}
            >
              
              <Input placeholder="Tên sản phẩm" className="Input" />
            </Form.Item>
            <div className="inputLabel">Loại sản phẩm</div>
              <Form.Item
                name="categoryName"
                rules={[
                  { required: true, message: "Vui lòng chọn loại sản phẩm!" },
                ]}
              >
               
                <Select
                  style={{ marginTop: 10 }}
                  placeholder="Loại sản phẩm"
                  className="Select"
                >
                  {categories.map((i) => (
                    <Option value={i.name}>{i.name}</Option>
                  ))}
                </Select>
              </Form.Item>
              <div className="inputLabel">Giá</div>
            <Form.Item
              name="price"
              rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
            >
           
              <Input placeholder="Giá" className="Input" />
            </Form.Item>
            <div className="inputLabel">Khuyến mãi</div>

            <Form.Item
              name="discount"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số phần trăm khuyến mãi!",
                },
              ]}
            >
            
              <Input placeholder="Khuyến mãi" className="Input" />
            </Form.Item>
            <div className="inputLabel">Mô tả</div>
            <Form.Item name="description">
              

              <Input placeholder="Mô tả sản phẩm" className="Input" />
            </Form.Item>

            <div style={{ marginBottom: 15, marginTop: 0 }}>
              <div
                style={{
                  marginTop: 5,
                }}
                className="bold"
              >
                <span>Size</span>
                <Button
                  onClick={() => {
                    setListSize([
                      ...listSize,
                      {
                        id: Date.now(),
                        size: "",
                      },
                    ]);
                  }}
                  style={{ marginLeft: 10 }}
                >
                  + Thêm size
                </Button>
              </div>

              {listSize.map((item) => {
                return (
                  <div
                    style={{
                      marginTop: 10,
                    }}
                    className="flex-start"
                  >
                    <div>
                      <div style={{ marginBottom: -10 }}>Kích thước</div>
                      <Input
                        style={{
                          width: 200,
                          marginTop: 10,
                          marginRight: 10,
                        }}
                        value={item.size}
                        onChange={(e) => changeSize(item.id, e.target.value)}
                      />
                    </div>
                    <div>
                      <div style={{ marginBottom: -10 }}>Số lượng</div>
                      <Input
                        style={{
                          width: 200,
                          marginTop: 10,
                          marginRight: 10,
                        }}
                        value={item.quantity}
                        onChange={(e) =>
                          changeSize(item.id, e.target.value, "quantity")
                        }
                      />
                    </div>
                    <DeleteOutlined
                      onClick={() => {
                        setListSize(listSize.filter((i) => i.id !== item.id));
                      }}
                      style={{ marginBottom: -20, cursor: "pointer" }}
                    />
                  </div>
                );
              })}
            </div>
            <Form.Item>
              <button
                style={{
                  marginTop: 15,
                }}
                className="Button"
                htmlType="submit"
                type="primary"
              >
                {id ? "Cập nhật" : "Tạo mới"}
              </button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={14}>
          <Table
            pagination={false}
            columns={columnImage}
            dataSource={dataImage}
          />
        </Col>
      </Row>

      <LoadingFull show={loading} />
    </Card>
  );
};

export default AddProduct;
