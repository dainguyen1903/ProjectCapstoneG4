import { Button, Card, Checkbox, Form, Input, Modal, Select } from "antd";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { productApi } from "../../api/product.api";
import LoadingFull from "../../component/loading/loadingFull";
import useProductStore from "../../zustand/productStore";
import useUserStore from "../../zustand/userStore";
import { categoryApi } from "../../api/category.api";
import "./../login/login.css";
import { showMessErr } from "../../ultis/helper";
const { Option } = Select;
const AddProduct = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const isEditProfile = location.pathname.includes("profile");
  const { id } = useParams();
  const [url, setUrl] = useState([]);
  const [imageName, setImageName] = useState("");
  const fileRef = useRef();
  const updateUsers = useUserStore((state) => state.updateuser);
  const addUser = useUserStore((state) => state.adduser);
  const [loading, setLoading] = useState(false);
  const users = useUserStore((state) => state.users);
  const products = useProductStore((state) => state.products);
  let detail = products.find((i) => i.id == id) || {};
  const addProduct = useProductStore((state) => state.addProduct);
  const updateProduct = useProductStore((state) => state.updateProduct);
  const [isCustom,setIsCustom ] = useState(false)
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [txtErr, settxterr] = useState("");
  const [listSize,setListSize] = useState([{
    id:Math.random()*100,
    size:"",
  }]);

  // Change Size
  const changeSize = (id,newValue) => {
    const newListSize = [...listSize];
    const index = listSize.findIndex(i => i.id ===id);
    if(index >=0){
      newListSize[index].size = newValue;
      setListSize(newListSize)
    }
  }
  // Confirm save
  const confirmSave = (value) => {
    if (url.length === 0) {
      settxterr("Vui lòng chọn ảnh");
      return;
    } else {
      settxterr("");
    }

    Modal.confirm({
      title: "Xác nhận",
      content: !id ? "Thêm sản phẩm" : "Cập nhật sản phẩm",
      onOk: async () => {
        const dataPosst = JSON.parse(JSON.stringify(value));
        dataPosst.imagesProductList = url;
        const listSizePost = Array.from(new Set(listSize.filter(i=>i.size).map(i => i.size.trim())));
        dataPosst.size = listSizePost.join(";")
        dataPosst.isCustomise  = isCustom;
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
  const handleChangeFile = (event) => {
    const files = event.target.files;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();

      // Xử lý sự kiện khi FileReader hoàn thành đọc tệp
      reader.onload = function (event) {
        const base64 = event.target.result;
        setUrl((prevUrl) => [...prevUrl, base64]);
      };

      // Đọc tệp như là một chuỗi base64
      reader.readAsDataURL(file);
    });
  };

  const deleteImage = (index) => {
    setUrl([...url.slice(0, index), ...url.slice(index + 1)]);
  };
  const getDetail = async () => {
    setLoading(true);
    const res = await productApi.getDetailProduct(id);
    const data = res.data.data;
    const listImage = res.data.data.imagesProductList
      ? res.data.data.imagesProductList.map((i) => i.path)
      : [];
    setUrl(listImage);
    setIsCustom(data.isCustomise)
    setListSize(data.size.split(";").filter(i => i).map((i,index) => ({
      size:i,
      id:index
    })))
    const categoryName = data.categoryId?.name;
    data.categoryName = categoryName;

    form.setFieldsValue(data);
    setLoading(false);
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
  return (
    <Card style={{}}>
      <h2 style={{ marginBottom: 10 }}>
        {!id ? "Thêm sản phẩm" : "Cập nhật sản phẩm"}
      </h2>
      <Form
        form={form}
        wrapperCol={{ span: 10 }}
        onFinish={confirmSave}
        layout="vertical"
      >
        <Form.Item
          name="productName"
          rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
        >
          <Input placeholder="Tên sản phẩm" className="Input" />
        </Form.Item>
        {
          <Form.Item
            name="categoryName"
            rules={[
              { required: true, message: "Vui lòng chọn loại sản phẩm!" },
            ]}
          >
            <Select placeholder="Loại sản phẩm" className="Select">
              {categories.map((i) => (
                <Option value={i.name}>{i.name}</Option>
              ))}
            </Select>
          </Form.Item>
        }
        <Form.Item
          name="price"
          rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
        >
          <Input placeholder="Giá" className="Input" />
        </Form.Item>
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
        {/* <Form.Item
          rules={[{ required: true, message: "Vui lòng nhập kích thước!" }]}
          name="size"
        >
          <Input placeholder="Kích cỡ" className="Input" />
        </Form.Item> */}
        <Form.Item name="description">
          <Input placeholder="Mô tả sản phẩm" className="Input" />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
          name="quantity"
        >
          <Input placeholder="Số lượng" className="Input" />
        </Form.Item>
       <div style={{marginBottom:15,marginTop :0}}>
        <div style={{
          marginTop:5
        }} className="bold" >
          <span>Size</span>
          <Button onClick={() => {
            setListSize([...listSize,{
              id:Date.now(),
              size:""
            }])
          }} style={{marginLeft:10}}>Thêm size</Button>
        </div>
        
        {listSize.map(item => {
          return <div>
            <Input style={{
            width:300,
            marginTop:10
          }} value={item.size} onChange={(e) => changeSize(item.id,e.target.value)} />
          </div>
        })}
       </div>
       <Checkbox checked={isCustom} onChange={e => setIsCustom(e.target.checked)} >Cho phép tùy chỉnh sản phấm</Checkbox>

        <Form.Item name="image_url">
          <Button
            onClick={() => fileRef.current.click()}
            style={{
              marginBottom: 10,
              marginRight: 10,
              marginTop: 10,
            }}
          >
            Thêm Ảnh
          </Button>{" "}
          <div>
            {url.length > 0 && (
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                {url.map((item, index) => (
                  <div
                    style={{
                      position: "relative",
                      width: 100,
                    }}
                  >
                    <img
                      src={item}
                      style={{
                        width: "100%",
                        height: 100,
                        objectFit: "contain",
                      }}
                    />
                    <div
                      onClick={() => deleteImage(index)}
                      className="deleteIcon"
                    >
                      X
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div></div>
          <div
            className="flex-start"
            style={{
              alignItems: "center",
            }}
          ></div>
          <input
            style={{
              display: "none",
            }}
            ref={fileRef}
            onChange={handleChangeFile}
            placeholder="Ảnh"
            type="file"
            className="Input"
            multiple
          />
        </Form.Item>

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

      <LoadingFull show={loading} />
    </Card>
  );
};

export default AddProduct;
