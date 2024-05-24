import { Card, Input, Row, Button, Form, Col, Space, Table } from "antd";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../zustand/authStore";
import Title from "antd/es/skeleton/Title";
import DashBoardItem from "./DashboardItem";
import {
  dateFormat,
  formatPrice,
  handleError,
  showMessErr,
  showMessErr400,
} from "../../ultis/helper";
import { productApi } from "../../api/product.api";
import { useEffect, useState } from "react";
import {
  MoneyCollectOutlined,
  UserOutlined,
  SkinOutlined,
} from "@ant-design/icons";
import { DatePicker } from "antd";
import moment from "moment";

const Home = () => {
  moment.locale("vi"); // Set locale
  const currentYearMonth = moment().format("YYYY-MM");

  // Lấy ngày hiện tại
  var currentDate = new Date();

  // Lấy năm hiện tại
  var currentYear = currentDate.getFullYear();

  // Lấy tháng hiện tại (từ 0 đến 11)
  var currentMonth = currentDate.getMonth() + 1; // Phải cộng thêm 1 vì tháng bắt đầu từ 0

  const currenDate = dateFormat();

  const { user } = useAuthStore();
  const [dateSelect, setDateSelect] = useState();
  const [dateSelectString, setDateSelectString] = useState("");

  const [product, setproduct] = useState([]);
  const [buyer, setBuyer] = useState(0);
  const [countProduct, setCountProduct] = useState(0);
  const [doanhthu, setDoanhthu] = useState(0);
  const handleSearch = async (value) => {
    const res = await productApi.top5Prouct({
      productName: "",
    });
    if (res.data.status === 200 || res.data.status === 204) {
      setproduct(res?.data?.data?.slice(0, 5) || []);
    } else {
      setproduct([]);
      // showMessErr(res.data)
    }
  };
  useEffect(() => {
    handleSearch();
  }, []);

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "title",
    },
    {
      title: "Tên loại sản phẩm",
      dataIndex: "category_name",
      key: "title",
      render: (_, row) => {
        return <span>{row?.category?.name}</span>;
      },
    },

    {
      title: "Giá",
      dataIndex: "price",
      key: "title",
      render: (v) => <span>{v} VND</span>,
    },
    {
      title: "Khuyến mãi",
      dataIndex: "discount",
      key: "title",
      render: (v) => <span>{v} %</span>,
    },
  ];

  //
  const getBuyer1 = async (year, month) => {
    try {
      const res = await productApi.getBuyer({
        year,
        month,
      });
      if (res?.data?.status === 200 || res?.data?.status === 204) {
        setBuyer(res?.data?.data?.sum || 0);
      } else {
        // showMessErr400(res)
      }
    } catch (error) {
      // handleError(error)
    }
  };

  //
  const getDoanhthu1 = async (year, month) => {
    try {
      const res = await productApi.getDoanhthu({
        year,
        month,
      });
      if (res?.data?.status === 200 || res?.data?.status === 204) {
        setDoanhthu(res?.data?.data?.sum || 0);
      } else {
        // showMessErr400(res)
      }
    } catch (error) {
      // handleError(error)
    }
  };
  const getCountProduct = async (year, month) => {
    try {
      const res = await productApi.getQuantityProduct({
        year,
        month,
      });
      if (res?.data?.status === 200 || res?.data?.status === 204) {
        setCountProduct(res?.data?.data?.sum || 0);
      } else {
        // showMessErr400(res)
      }
    } catch (error) {
      // handleError(error)
    }
  };

  //
  const handleChangeSelectDate = (date, dateStr) => {
    setDateSelectString(dateStr);
    setDateSelect(date);
  };

  //
  const dateArr = dateSelectString?.split("-");
  let month, year;
  if (dateArr?.length === 2) {
    year = dateArr[0];
    month = dateArr[1];
  }
  useEffect(() => {
    if (!dateSelect || !dateSelectString) {
      getBuyer1(currentYear, currentMonth);
      getCountProduct(currentYear, currentMonth);
      getDoanhthu1(currentYear, currentMonth);
    } else {
      getBuyer1(year, month);
      getCountProduct(year, month);
      getDoanhthu1(year, month);
    }
  }, [dateSelect, dateSelectString]);
  return (
    <div>
      <div
        style={{
          background: "white",
          padding: 20,
          borderRadius: 5,
          marginBottom: 20,
        }}
      >
        <h3>Top 5 sản phẩm bán chạy</h3>
        <Table pagination={false} columns={columns} dataSource={product} />
      </div>
      <div
        style={{
          background: "white",
          padding: "20px 20px",
          borderRadius: 5,
        }}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <h3>Thống kê {month || currentMonth}  {"/"} {year || currentYear} </h3>
          </Col>
          <Col span={24}>
            <DatePicker
            inputReadOnly
              value={dateSelect}
              onChange={handleChangeSelectDate}
              style={{ width: 200 }}
              picker="month"
            />
          </Col>
          <Col span={8}>
            <DashBoardItem
              title={"Sản phẩm bán được"}
              content={countProduct}
              color={"green"}
              icon={
                <SkinOutlined
                  style={{
                    color: "gray",
                    fontSize: 20,
                    marginTop: 5,
                    marginLeft: 5,
                  }}
                />
              }
            />
          </Col>
          <Col span={8}>
            <DashBoardItem
              title={"Số lượng người mua"}
              content={buyer}
              color={"red"}
              icon={
                <UserOutlined
                  style={{
                    color: "gray",
                    fontSize: 20,
                    marginTop: 5,
                    marginLeft: 5,
                  }}
                />
              }
            />
          </Col>
          <Col span={8}>
            <DashBoardItem
              title={"Doanh thu"}
              content={formatPrice(doanhthu)}
              color={"rgb(31, 167, 167)"}
              icon={
                <MoneyCollectOutlined
                  style={{
                    color: "gray",
                    fontSize: 20,
                    marginTop: 5,
                    marginLeft: 5,
                  }}
                />
              }
            />
          </Col>
          MoneyCollectOutlined
        </Row>
      </div>
    </div>
  );
};
export default Home;
