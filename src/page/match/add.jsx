import React, { useEffect, useState } from "react";
import { Form, Input, Button, DatePicker, Select, Modal, Card } from "antd";
import { useMatch, useMatches, useParams } from "react-router";
import moment from "moment";
import useMatchStore from "../../zustand/matchStore";
import LoadingFull from "../../component/loading/loadingFull";
const { Option } = Select;

const AddMatchForm = () => {
  const { id } = useParams();

  const addMatch = useMatchStore((state) => state.addMatch);
  const updateMatch = useMatchStore((state) => state.updateMatch);
  const [loading, setLoading] = useState(false);

  const matches = useMatchStore((state) => state.matches);
  let detail = matches.find((i) => i.id == id) || {};
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
    Modal.confirm({
      title: "Xác nhận",
      content: id ? "Thêm lịch thi đấu" : "Cập nhật lịch thi đấu",
      onOk: () => {
        const dataPosst = JSON.parse(JSON.stringify(values));
        const birdday = dataPosst.dateTime;
        dataPosst.dateTime = moment(birdday).format("YYYY-MM-DD HH:mm:ss");
        console.log(dataPosst);

        setTimeout(() => {
          if (id) {
            updateMatch(id, dataPosst);
          } else {
            addMatch(dataPosst);
          }
          Modal.success({
            title: "Thành công",
            content: !id ? "Thêm thành công" : "Cập nhật thành công",
          });
          if (!id) {
            form.resetFields();
          }
        }, 1000);
      },
    });
  };
  useEffect(() => {
    if (id) {
      setLoading(true);
      new Promise((resolve) => {
        const dataDetail = JSON.parse(JSON.stringify(detail));
        dataDetail.dateTime = moment(dataDetail.dateTime);
        setTimeout(() => {
          form.setFieldsValue(dataDetail);
          resolve();
        }, 1000);
      }).then(() => {
        setLoading(false);
      });
    }
  }, [id]);
  return (
   <Card>
     <Form
      form={form}
      name="addMatchForm"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
      onFinish={onFinish}
    >
      <h2 style={{ marginBottom: 10 }}>
        {!id ? "Thêm lịch thi đấu" : "Cập nhật lịch thi đấu"}
      </h2>
      <Form.Item
        name="tournamentName"
        rules={[{ required: true, message: "Vui lòng nhập tên giải đấu!" }]}
      >
        <Input placeholder="Tên Giải Đấu" className="Input" />
      </Form.Item>

      <Form.Item
        name="round"
        rules={[{ required: true, message: "Vui lòng nhập vòng đấu!" }]}
      >
        <Input placeholder="Vòng Đấu" className="Input" />
      </Form.Item>

      <Form.Item
        name="homeTeam"
        rules={[{ required: true, message: "Vui lòng nhập tên đội nhà!" }]}
      >
        <Input placeholder="Đội Nhà" className="Input" />
      </Form.Item>

      <Form.Item
        name="awayTeam"
        rules={[{ required: true, message: "Vui lòng nhập tên đội khách!" }]}
      >
        <Input placeholder="Đội Khách" className="Input" />
      </Form.Item>

      <Form.Item
        name="dateTime"
        rules={[
          { required: true, message: "Vui lòng chọn ngày và giờ thi đấu!" },
        ]}
      >
        <DatePicker
          showTime
          format="DD-MM-YYYY HH:mm:ss"
          placeholder="Ngày và Giờ"
          className="Input"
        />
      </Form.Item>

      <Form.Item
        name="stadium"
        rules={[{ required: true, message: "Vui lòng nhập tên sân vận động!" }]}
      >
        <Input placeholder="Sân Vận Động" className="Input" />
      </Form.Item>

      <Form.Item
        name="matchStatus"
        rules={[
          { required: true, message: "Vui lòng chọn tình trạng trận đấu!" },
        ]}
      >
        <Select placeholder="Tình Trạng Trận Đấu" className="Select">
          <Option value="0">Chưa Bắt Đầu</Option>
          <Option value="1">Đang Diễn Ra</Option>
          <Option value="2">Đã Kết Thúc</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="matchResult"
        dependencies={["matchStatus"]}
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (getFieldValue("matchStatus") === "đã kết thúc" && !value) {
                return Promise.reject(
                  new Error("Khi trận đấu đã kết thúc, vui lòng nhập kết quả!")
                );
              }
              return Promise.resolve();
            },
          }),
        ]}
      >
        <Input
          disabled={form.getFieldValue("matchStatus") != "2"}
          placeholder="Kết Quả Trận Đấu"
          className="Input"
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
          {!id ? "Tạo mới" : "Cập nhật"}
        </button>
      </Form.Item>
      <LoadingFull show={loading} />
    </Form>
   </Card>
  );
};

export default AddMatchForm;
