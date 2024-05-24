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
  formatPrice,
  handleError,
  objectCheckErrorInput,
  showMessErr,
  showMessErr400,
} from "../../ultis/helper";
import useProductStore from "../../zustand/productStore";
import "./../login/login.css";

const { Option } = Select;
const DetailProduct = () => {
  const [detail, setDetai] = useState({});
  const { id } = useParams();
  const getDetailProduct = async () => {
    try {
      const res = await productApi.getDetailProduct(id);
      if (res?.data?.status === 200 || res?.data?.status === 204) {
        setDetai(res?.data?.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getDetailProduct();
  });
  console.log(detail);
  const list = [
    {
      title: "Tên sản phẩm",
      value: detail?.productName,
    },
    {
      title: "Danh mục phẩm",
      value: detail?.category?.name,
    },
    {
      title: "Giá",
      value: formatPrice(detail?.price || 0),
    },
    {
      title: "Khuyến mãi",
      value: detail?.discount + " %",
    },
    {
      title: "Mô tả sản phẩm",
      value: detail?.description,
    },
  ];
  return (
    <div style={{ background: "white", color: "black",padding:40 }}>
      <Row gutter={[16,16]}>
        <Col span={8}>
          <img
            src={
              (detail?.imagesProductDtoList &&
                detail?.imagesProductDtoList?.length) > 0
                ? detail?.imagesProductDtoList[0]?.path
                : ""
            }
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </Col>
        <Col span={16}>
          {list.map((i) => (
            <p>
              <span
                style={{
                  display: "inline-block",
                  fontWeight: "bold",
                  width: 150,
                }}
              >
                {i.title + " : "}
              </span>
              <span>{" " + i.value}</span>
            </p>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default DetailProduct;
