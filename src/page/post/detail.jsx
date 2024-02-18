import React, { useState } from "react";
import { Form, Input, Button, DatePicker, Select, Modal } from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import { useParams } from "react-router";
const { Option } = Select;

const DetailNews = () => {

  return (
    <div>
        <h2 style={{
             fontSize:20
        }}>Bài viết chi tết</h2>
        <p><span style={{
            fontWeight:"bold",
            fontSize:18
        }}> Tiêu đề :</span> Tiêu đề bài viết</p>
        <p style={{
            fontWeight:"bold",
            fontSize:18
        }} >Mô tả : </p>
        <p>Mô tả bài viết....</p>
    </div>
  );
};

export default DetailNews;
