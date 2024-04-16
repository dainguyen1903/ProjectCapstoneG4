import { Avatar, Button } from "antd";
import React from "react";
const AddImage = ({ click = () => {}, url, txt = "Thêm ảnh" }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Avatar
        style={{
          marginBottom: 20,
        }}
        size={120}
        src={url}
      />
      <Button onClick={() => click()}>{txt}</Button>
    </div>
  );
};

export default AddImage;
