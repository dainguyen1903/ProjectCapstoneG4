import { Card, Input, Row, Button, Form, Col, Space, Table } from "antd";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../zustand/authStore";
import Title from "antd/es/skeleton/Title";
import DashBoardItem from "./DashboardItem";
import { formatPrice, handleError, showMessErr } from "../../ultis/helper";
import { productApi } from "../../api/product.api";
import { useEffect, useState } from "react";
import {MoneyCollectOutlined,UserOutlined,SkinOutlined } from "@ant-design/icons";

const Home = () => {
    const {user} = useAuthStore()
    const [product, setproduct] = useState([]);
    const [buyer,setBuyer] = useState(0);
    const [countProduct,setCountProduct] = useState(0);
    const [doanhthu,setDoanhthu] = useState(0);
    const handleSearch = async(value) => {
     const res  = await productApi.top5Prouct({
      productName:""
     });
     if(res.data.status ===200 || res.data.status ===204){
      setproduct(res?.data?.data?.slice(0,5) || []);
     }
     else{
      setproduct([]);
      showMessErr(res.data)
     }
    };
    useEffect(() => {
      handleSearch();
    },[])
  
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
        render:(_,row)=>{
          return <span>{row?.category?.name}</span>
        }
       
      },
      
      {
        title: "Giá",
        dataIndex: "price",
        key: "title",
        render:(v) => <span>{v} VND</span>
      },
      {
        title: "Khuyến mãi",
        dataIndex: "discount",
        key: "title",
        render:(v) => <span>{v} %</span>
      },
  
    ];

    // 
    const getBuyer1 = async() => {
      try {
        const res = await productApi.getBuyer({
          year:2024,
          month:5
        })
      } catch (error) {
        handleError(error)
      }
    }
    useEffect(() => {
      getBuyer1()
    },[])
    // 
    const getDoanhthu1 = async() => {
      try {
        const res = await productApi.getDoanhthu({
          year:2024,
          month:5
        })
      } catch (error) {
        handleError(error)
      }
    }
    useEffect(() => {
      getDoanhthu1()
    },[])
    const getCountProduct = async() => {
      try {
        const res = await productApi.getQuantityProduct({
          year:2024,
          month:5
        })
      } catch (error) {
        handleError(error)
      }
    }
    useEffect(() => {
      getCountProduct()
    },[])
  return (
   <div > 
    <div style={{
      background:"white",
      padding:20,
      borderRadius:5,
      marginBottom:20
    }}>
      <h3>Top 5 sản phẩm bán chạy</h3>
      <Table
        pagination={false}
        columns={columns}
        dataSource={product}
      />
    </div>
    <div style={{
      background:"white",
      padding:"20px 20px",
      borderRadius:5
    }}>
    <Row gutter={[16,16]}>
   <Col span={24}>
   <h3>Thống kê tháng này</h3></Col>
      <Col span={8}>
         <DashBoardItem title={"Sản phẩm bán được"} content={100} color={"green"} icon={<SkinOutlined style={{
            color: "gray",
            fontSize: 20,
            marginTop:5,
            marginLeft:5
          }} />} />
      </Col>
      <Col span={8}>
      <DashBoardItem title={"Số lượng người mua"} content={30} color={"red"} icon={<UserOutlined style={{
            color: "gray",
            fontSize: 20,
            marginTop:5,
            marginLeft:5
          }} />}/>
      </Col>
      <Col span={8}>
      <DashBoardItem title={"Doanh thu"} content={formatPrice(30000000)} color={"rgb(31, 167, 167)"} icon={<MoneyCollectOutlined style={{
            color: "gray",
            fontSize: 20,
            marginTop:5,
            marginLeft:5
          }}/>} />
      </Col>MoneyCollectOutlined
    </Row>
    </div>
   </div>
  );
};
export default Home;
