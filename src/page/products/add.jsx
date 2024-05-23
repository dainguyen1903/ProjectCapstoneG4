import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { categoryApi } from "../../api/category.api";
import { playerApi } from "../../api/player.api";
import { productApi } from "../../api/product.api";
import LoadingFull from "../../component/loading/loadingFull";
import {
  ERROR_KEY,
  handleError,
  objectCheckErrorInput,
  showMessErr,
  showMessErr400,
} from "../../ultis/helper";
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
  const [isCustom, setIsCustom] = useState(true);
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

  const [data, setData] = useState({
    productName: "",
    categoryId: "",
    price: "",
    discount: "",
    description: "",
  });

  const [err, setErr] = useState({
    productName: "",
    categoryId: "",
    price: "",
    discount: "",
    description: "",
  });

  const handleSetErr = (field, value) => {
    setErr((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const handleChange = (field, value, listRule, prefix = "") => {
    console.log(value);
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    const listErr = [];
    listRule.forEach((rule) => {
      const txtErr = objectCheckErrorInput[rule](value, prefix);
      if (txtErr) {
        listErr.push(txtErr);
      }
    });
    if (listErr.length === 0) {
      handleSetErr(field, "");
    } else {
      handleSetErr(field, listErr[0]);
    }
  };
  // Change Size
  const changeSize = (id, newValue, field = "size") => {
    const newListSize = [...listSize];
    const index = listSize.findIndex((i) => i.id === id);
    if (index >= 0) {
      newListSize[index][field] = newValue;
      setListSize(newListSize);
    }
  };
  const validate = () => {
    let newErr = { ...err };
    let isFlagErr = false;
    if (!data.productName) {
      isFlagErr = true;
      newErr = { ...newErr, productName: "Tên sản phẩm không được dể trống" };
    } else {
      newErr = { ...newErr, productName: "" };
    }
    if (!data.categoryId) {
      isFlagErr = true;
      newErr = { ...newErr, categoryId: "Loại sản phẩm không được dể trống" };
    } else {
      newErr = { ...newErr, categoryId: "" };
    }
    if (!data.price) {
      isFlagErr = true;
      newErr = { ...newErr, price: "Giá không được dể trống" };
    } else {
      newErr = { ...newErr, price: "" };
    }
    if (!data.discount) {
      isFlagErr = true;
      newErr = { ...newErr, discount: "Khuyến mãi  không được dể trống" };
    } else {
      newErr = { ...newErr, discount: "" };
    }
    if (!data.description) {
      isFlagErr = true;
      newErr = { ...newErr, description: "Mô tả sản phẩm  không được dể trống" };
    } else {
      newErr = { ...newErr, description: "" };
    }
    setErr(newErr);
    return !isFlagErr;
  };
  const isErr = Object.values(err).filter((i) => i)?.length > 0;

  // Confirm save
  const confirmSave = (value) => {
    if (isErr) {
      return;
    }
    if (!validate()) {
      return;
    }

    Modal.confirm({
      title: "Xác nhận",
      content: !id ? "Thêm sản phẩm" : "Cập nhật sản phẩm",
      onOk: async () => {
        try {
          const dataPosst = JSON.parse(JSON.stringify(data));
          let categoryName = "abc";
          const item = categories.find((i) => i.id === dataPosst.categoryId);
          if (item) {
            categoryName = item.name;
          }
          const listSizePost = Array.from(
            new Set(listSize.filter((i) => i.size))
          );
          dataPosst.categoryName = categoryName;
          dataPosst.isCustomise = isCustom;
          dataPosst.quantity = 100;
          dataPosst.productSizeList = listSize.map((i) => {
            delete i.id;
            return i;
          });
          dataPosst.imagesProductList = dataImage.map((i) => {
            const id = i.playerId;

            return {
              path: i.image,
            };
          });

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
            showMessErr400(res.data);
          }
        } catch (error) {
          if (error?.response?.status === 500) {
            message.error("Thất bại");
          } else handleError(error);
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
        ? res.data.data.imagesProductList?.map((i) => i.path)
        : [];
      setUrl(listImage);
      setIsCustom(data.isCustomise);
      setDataImage(
        data.imagesProductDtoList.map((i, index) => ({
          playerId: i.playerId,
          id: index,
          image: i.path || "",
        }))
      );
      setListSize(
        data.productSizeDtoList.map((i, index) => ({ ...i, id: index }))
      );
      // des
      const categoryId = data.category?.id;
      data.categoryId = categoryId;
     console.log(data)
      setData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);

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
  let columnImage = [
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
          Ảnh sản phẩm
        </>
      ),
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

  useEffect(() => {
    if (isCustom) {
      setInitDataImage(listPlayer);
    } else {
      setDataImage([]);
    }
  }, [isCustom]);
  console.log(listPlayer);

  const setInitDataImage = (list) => {
    const dataImage = list?.map((i, index) => ({
      id: index,
      image: "",
      playerId: i.id,
    }));
    setDataImage(dataImage);
  };

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
            <Form.Item name="productName">
              <Input
                value={data.productName}
                onChange={(e) =>
                  handleChange(
                    "productName",
                    e.target.value,
                    [ERROR_KEY.BLANK],
                    "Tên sản phẩm"
                  )
                }
                placeholder="Tên sản phẩm"
                className="Input"
              />
              <div className="txt-err">{err?.productName}</div>
            </Form.Item>
            <div className="inputLabel">Loại sản phẩm</div>
            <Form.Item name="categoryId">
              <Select
                style={{ marginTop: 10 }}
                placeholder="Loại sản phẩm"
                className="Select"
                value={data.categoryId}
                onChange={(v) => {
                  setData({ ...data, categoryId: v });
                  setErr({ ...err, categoryId: "" });
                }}
              >
                {categories?.map((i) => (
                  <Option value={i.id}>{i.name}</Option>
                ))}
              </Select>
              <div className="txt-err">{err?.categoryId}</div>
            </Form.Item>
            <div className="inputLabel">Giá</div>
            <Form.Item name="price">
              <Input
                value={data.price}
                onChange={(e) =>
                  handleChange(
                    "price",
                    e.target.value,
                    [ERROR_KEY.BLANK, ERROR_KEY.NUMER, ERROR_KEY.NUMBER_UNSIGN],
                    "Giá"
                  )
                }
                placeholder="Giá"
                className="Input"
              />
              <div className="txt-err">{err?.price}</div>
            </Form.Item>
            <div className="inputLabel">Khuyến mãi</div>

            <Form.Item
              name="discount"
              
            >
              <Input value={data.discount}
              onChange={(e) =>
                handleChange(
                  "discount",
                  e.target.value,
                  [
                    ERROR_KEY.BLANK,
                    ERROR_KEY.NUMER,
                    ERROR_KEY.NUMBER_UNSIGN,
                    ERROR_KEY.NUMBER_DISCOUNT,
                  ],
                  "Khuyến mãi"
                )
              } placeholder="Khuyến mãi" className="Input" />
              <div className="txt-err">{err?.discount}</div>
            </Form.Item>
            <div className="inputLabel">Mô tả</div>
            <Form.Item name="description">
              <Input
                value={data.description}
                onChange={(e) =>
                  handleChange(
                    "description",
                    e.target.value,
                    [ERROR_KEY.BLANK],
                    "Mô tả sản phẩm"
                  )
                }
                placeholder="Mô tả sản phẩm"
                className="Input"
              />
               <div className="txt-err">{err?.description}</div>
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

              {listSize?.map((item) => {
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
                        type="number"
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
