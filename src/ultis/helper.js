import { Modal } from "antd";

export const showMessErr = (data) => {
  const mess = data.message || data.data ? data.data.message:"" || "Đã có lỗi xảy ra";
  Modal.error({
    title: "Lỗi",
    content: mess,
  });
};
